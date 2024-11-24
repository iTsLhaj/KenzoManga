from flask import (
    Blueprint,
    request,
    jsonify
)
from bson import ObjectId
from models import Manga
from pymongo.collection import Collection
from typing import (
    List,
    Dict,
    Any
)



class MangaRoutes:
    
    def __init__(self, collection: Collection) -> None:
        
        self.manga_collection = collection
        self.blueprint = Blueprint('manga_routes', __name__)
        self.register_routes()
        
    def register_routes(self) -> None:
        
        self.blueprint.route('', methods=['POST'])(self.create_manga)
        self.blueprint.route('/<id>', methods=['GET'])(self.get_manga)
        self.blueprint.route('', methods=['GET'])(self.get_all_manga)
        self.blueprint.route('/<id>', methods=['PUT'])(self.update_manga)
        self.blueprint.route('/<id>', methods=['DELETE'])(self.delete_manga)
        self.blueprint.route('/search', methods=['GET'])(self.search_manga)
    
    def create_manga(self) -> Any:
        
        data = request.json
        manga: Manga = Manga(**data)
        result = self.manga_collection.insert_one(manga.to_dict())
        created_manga = self.manga_collection.find_one({"_id": result.inserted_id})
        
        return jsonify({
            "message": "success",
            "data": Manga.from_dict(created_manga).to_dict()
        }), 201
    
    def get_manga(self, id) -> Any:
        
        manga = self.manga_collection.find_one({"_id": ObjectId(id)})
        if manga:
            manga['_id'] = str(manga["_id"])
            return jsonify({
                "message": "success",
                "data": manga
            }), 200
        return jsonify({"error": "Manga not found"}), 404
    
    def get_all_manga(self) -> Any:
        
        page: int = int(request.args.get('page', 1))
        per_page: int = int(request.args.get('per_page', 10))
        
        skip = (page - 1) * per_page
        manga_list = list(self.manga_collection.find().skip(skip).limit(per_page))
        
        for manga in manga_list:
            manga['_id'] = str(manga["_id"])
        
        total_mangas = self.manga_collection.count_documents({})
        total_pages = (total_mangas + per_page - 1) // per_page
        
        response = {
            "message": "success",
            "data": manga_list,
            "page": page,
            "per_page": per_page,
            "total_mangas": total_mangas,
            "total_pages": total_pages
        }
        
        return jsonify(response), 200
    
    def update_manga(self, id) -> Any:
        
        try:
        
            data = request.json
            manga = self.manga_collection.find_one({"_id": ObjectId(id)})
            
            if not manga:
                return jsonify({"error": "Manga not found"}), 404
            
            update_data = {}
            for k, v in data.items():
                if hasattr(Manga.from_dict(manga), k) and k != 'id':
                    update_data[k] = v
            
            # update!
            result = self.manga_collection.update_one(
                {"title": manga["title"]},
                {"$set": update_data}
            )
            
            if result.modified_count == 0:
                return jsonify({"message": "No changes made"}), 200
            
            updated = self.manga_collection.find_one({"_id": ObjectId(id)})
            updated["_id"] = str(updated["_id"])
            
            return jsonify({
                "message": "success",
                "data": updated
            }), 200
            
        except Exception as e:
            return jsonify({"error": "Internal server error"}), 500
    
    def delete_manga(self, id) -> Any:
        
        try:
        
            manga = self.manga_collection.find_one({"_id": ObjectId(id)})

            if not manga:
                return jsonify({"error": "Manga not found"}), 404
        
            result = self.manga_collection.delete_one({"_id": ObjectId(id)})
            
            if result.deleted_count == 1:
                return jsonify({
                    "message": "success"
                }), 200
            else:
                return jsonify({"message": "failed"}), 404
        
        except Exception as e:
            return jsonify({"error": "Internal server error"}), 500

    def search_manga(self) -> None:
        
        try:
            
            title = request.args.get('title')
            author = request.args.get('author')
            genre = request.args.get('genre')
            status = request.args.get('status')
            
            query = {}
            if title:
                query['title'] = {'$regex': f'^{title}', '$options': 'i'}
            if author:
                query['author'] = {'$regex': f'^{author}', '$options': 'i'}
            if genre:
                query['genres'] = {'$in': [genre]}
            if status:
                query['status'] = status
            
            # Pagination
            page = int(request.args.get('page', 1))
            per_page = int(request.args.get('per_page', 10))
            
            skip = (page - 1) * per_page

            manga_list = list(self.collection.find(query).skip(skip).limit(per_page))
            
            for manga in manga_list:
                manga['_id'] = str(manga["_id"])
            
            total_mangas = self.collection.count_documents(query)
            total_pages = (total_mangas + per_page - 1) // per_page
            
            return jsonify({
                "message": "success",
                "data": manga_list,
                "page": page,
                "per_page": per_page,
                "total_mangas": total_mangas,
                "total_pages": total_pages
            }), 200

        except Exception as e:
            return jsonify({"error": "Internal server error"}), 500