from flask import (
    Blueprint,
    request,
    jsonify
)
from typing import (
    List,
    Dict,
    Any
)
from bson import ObjectId
from models import Chapter
from datetime import datetime
from pymongo.collection import Collection



class ChapterRoutes:
    
    def __init__(
        self,
        chapter_collection: Collection,
        manga_collection: Collection
    ) -> None:
        
        self.chapter_collection = chapter_collection
        self.manga_collection = manga_collection
        self.blueprint = Blueprint('chapter_routes', __name__)
        self.register_routes()
    
    def register_routes(self) -> None:
        
        self.blueprint.route('', methods=['POST'])(self.create_chapter)
        self.blueprint.route('/<id>', methods=['GET'])(self.get_chapter)
        self.blueprint.route('/chapters/<manga_id>', methods=['GET'])(self.get_chapters_for_manga)
        self.blueprint.route('/<id>', methods=['PUT'])(self.update_chapter)
        self.blueprint.route('/<id>', methods=['DELETE'])(self.delete_chapter)
    
    def create_chapter(self) -> Any:
        
        data = request.json
        
        try:
            chapter = Chapter(**data)
        except TypeError:
            return jsonify({
                "error": "Invalid data provided"
            }), 400
        
        result = self.chapter_collection.insert_one(chapter.to_dict())
        created_chapter = self.chapter_collection.find_one({"_id": result.inserted_id})
        
        self.manga_collection.update_one(
            {"_id": ObjectId(data['manga_id'])},
            {"$push": {"chapters": str(result.inserted_id)}}
        )
        
        self.manga_collection.update_one(
            {"_id": ObjectId(data['manga_id'])},
            {"$set": {"last_modified": datetime.utcnow()}}
        )
        
        return jsonify({
            "message": "success",
            "data": Chapter.from_dict(created_chapter).to_dict()
        })

    def get_chapter(self, id) -> Any:
        
        chapter = self.chapter_collection.find_one({"_id": ObjectId(id)})
        if chapter:
            chapter['_id'] = str(chapter['_id'])
            return jsonify({
                "message": "success",
                "data": Chapter.from_dict(chapter).to_dict()
            })
        else:
            return jsonify({
                "error": "Chapter not found"
            }), 404

    def get_chapters_for_manga(self, manga_id) -> Any:
        
        chapters = list(self.chapter_collection.find({"manga_id": manga_id}))
        if chapters:
        
            for chapter in chapters:
                chapter['_id'] = str(chapter['_id'])
            return jsonify({
                "message": "success",
                "data": chapters
            }), 200

        else:
            
            return jsonify({
                "error": "Manga Not found"
            }), 404
    
    def update_chapter(self, id) -> Any:
        
        try:
            
            data = request.json
            chapter = self.chapter_collection.find_one({"_id": ObjectId(id)})
            if not chapter:
                return jsonify({
                    "error": "Chapter not found"
                }), 404
            
            update_data = {}
            for k, v in data.items():
                if k != 'id' and hasattr(Chapter.from_dict(chapter), k):
                    update_data[k] = v
            
            result = self.chapter_collection.update_one(
                {"_id": ObjectId(id)},
                {"$set": update_data}
            )
            
            if result.modified_count == 0:
                return jsonify({
                    "error": "No changes made"
                }), 200
            
            updated_chapter = self.chapter_collection.find_one({"_id": ObjectId(id)})
            updated_chapter['_id'] = str(updated_chapter['_id'])
            
            return jsonify({
                "message": "success",
                "data": updated_chapter
            })
        
        except Exception as e:
            
            return jsonify({
                "error": "Internal Server Error"
            }), 500
    
    def delete_chapter(self, id) -> Any:
        
        chapter = self.chapter_collection.find_one({"_id": ObjectId(id)})
        if not chapter:
            return jsonify({
                "error": "Chapter not found"
            }), 404
        
        result = self.chapter_collection.delete_one({"_id": ObjectId(id)})
        
        if result.deleted_count == 1:
            
            self.manga_collection.update_one(
                {"_id": ObjectId(chapter['manga_id'])},
                {"$pull": {"chapters": str(id)}}
            )
        
            return jsonify({
                "message": "success"
            })
        
        else:
            
            return jsonify({
                "message": "Chapter isn\'t in the manga's chapters list"
            }), 200
