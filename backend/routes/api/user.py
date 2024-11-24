import jwt

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
from pymongo.collection import Collection
from models import User
from werkzeug.security import (
    check_password_hash,
    generate_password_hash
)
from functools import wraps
from datetime import datetime, timedelta
from bson.objectid import ObjectId



class UserRoutes:
    
    def __init__(
        self,
        collection: Collection,
        manga_collection: Collection,
        jwt_secret_key: str,
        jwt_algorithm: str = "HS256"
    ) -> None:
        
        self.secret = jwt_secret_key
        self.algorithm = jwt_algorithm
        self.collection = collection
        self.manga_collection = manga_collection
        self.blueprint = Blueprint('user_routes', __name__)
        self.register_routes()
        
    def register_routes(self) -> None:
        
        self.blueprint.route('/register', methods=['POST'])(
            self.user_register)
        self.blueprint.route('/login', methods=['POST'])(
            self.user_login)
        self.blueprint.route('/profile', methods=['GET'])(
            self.token_required(self.get_profile))
        self.blueprint.route('/profile', methods=['PUT'])(
            self.token_required(self.update_profile))
        self.blueprint.route('/favorites', methods=['GET'])(
            self.token_required(self.get_favorites))
        self.blueprint.route('/favorites', methods=['POST'])(
            self.token_required(self.add_favorite))
        self.blueprint.route('/favorites/<manga_id>', methods=['DELETE'])(
            self.token_required(self.remove_favorite))
    
    def token_required(self, f):
        
        @wraps(f)
        def decorated(*args, **kwds):
            token = request.headers.get('Authorization')
            if not token:
                return jsonify({"error": "Unauthorized, token is missing"}), 401
            try:
                
                data = jwt.decode(
                    token,
                    self.secret,
                    algorithms=self.algorithm
                )
                current_user = self.collection.find_one({"_id": data["user_id"]})
                if not current_user:
                    return jsonify({"error": "Invalid token"}), 401
            
            except:
                return jsonify({"error": "Invalid token"}), 401
            
            return f(current_user, *args, **kwds)
        
        return decorated 
    
    def user_register(self) -> Any:
        
        data = request.json
        if not data or not data.get('username') or not data.get('password') or not data.get('email'):
            return jsonify({"error": "bad request"}), 400
        
        if self.collection.find_one({'username': data['username']}):
            return jsonify({"error": "Username already exists"}), 409
        
        if self.collection.find_one({'email': data['email']}):
            return jsonify({"error": "Email already exists"}), 409
        
        new_user: User = User(
            username=data['username'],
            email=data['email'],
            password_hash=generate_password_hash(data['password'])
        )
        
        result = self.collection.insert_one(new_user.to_dict())
        created_user = self.collection.find_one({'_id': result.inserted_id})
        
        if result.inserted_id:
            
            return jsonify({
                "message": "success",
                "data": User.from_dict(created_user).to_dict()
            }), 201
        
        else:
            
            return jsonify({"error": "failed"}), 500
    
    def user_login(self) -> Any:
        
        data = request.json
        if not data or not data.get('username') or not data.get('password'):
            return jsonify({"error": "bad request"}), 400
        
        user = self.collection.find_one({
            'username': data['username']
        })
        if not user:
            return jsonify({"error": "User not found"}), 404

        if check_password_hash(
            user['password_hash'],
            data['password']
        ):
            token = jwt.encode({
                'user_id': str(user['_id']),
                'username': user['username'],
                'exp': datetime.utcnow() + timedelta(hours=24)
            }, self.secret, algorithm=self.algorithm)
            
            return jsonify({
                "message": "success",
                "token": token
            }), 200
        
        else: return jsonify({
            "error": "Invalid credentials"
        }), 401

    def get_profile(self, current_user) -> Any:
        
        user_data = {
            "username": current_user["username"],
            "email": current_user["email"],
            "created_at": current_user["created_at"],
            "favorites": current_user["favorites"]
        }
        return jsonify(user_data), 200
    
    def update_profile(self, current_user) -> Any:
        
        data = request.json
        if not data:
            return jsonify({"error": "bad request"}), 400
        
        update_fields = {}
        if "email" in data:
            if self.collection.find_one({'email': data['email']}):
                return jsonify({"error": "Email already exists"}), 409
            update_fields["email"] = data["email"]
        
        if "password" in data:
            update_fields["password"] = generate_password_hash(data["password"])
        
        if "username" in data:
            if self.collection.find_one({'username': data['username']}):
                return jsonify({"error": "Username already exists"}), 409
            update_fields["username"] = data["username"]
        
        if not update_fields:
            return jsonify({"error": "No changes made, Empty"}), 200
        
        result = self.collection.update_one(
            {"_id": current_user["_id"]},
            {"$set": update_fields}
        )
        
        if result.modified_count == 0:
            return jsonify({"message": "No changes made, UnModified"}), 200
        
        updated = self.collection.find_one({"_id": current_user["_id"]})
        updated["_id"] = str(updated["_id"])
        
        return jsonify({
            "message": "success",
            "data": updated
        }), 200
    
    def get_favorites(self, current_user) -> Any:
        
        try:
            
            user = self.collection.find_one({"_id": current_user["_id"]})
            
            if not user:
                return jsonify({"error": "User not found"}), 404
            
            favorites = user.get("favorites", [])
            
            return jsonify({
                "message": "success",
                "data": favorites
            }), 200
        
        except Exception as e:
            
            return jsonify({"error": str(e)}), 500
    
    def add_favorite(self, current_user) -> Any:
        
        data = request.json
        if not data or not data.get('manga_id'):
            return jsonify({"error": "bad request"}), 400
        
        manga_id = data['manga_id']
        
        try:
            
            manga_collection = self.manga_collection
            manga = manga_collection.find_one({"_id": ObjectId(manga_id)})
            if not manga:
                return jsonify({"error": "Manga not found"}), 404
            
            user = self.collection.find_one({"_id": current_user["_id"]})
            if manga_id in user.get("favorites", []):
                return jsonify({"message": "Manga already in favorites"}), 200

            result = self.collection.update_one(
                {"_id": current_user["_id"]},
                {"$push": {"favorites": manga_id}}
            )
            
            if result.modified_count == 0:
                return jsonify({"message": "No changes made"}), 200
            else:
                
                user = self.collection.find_one({"_id": current_user["_id"]})
                favorites = user.get("favorites", [])
                return jsonify({
                    "message": "success",
                    "data": favorites
                }), 200
        
        except Exception as e:
            
            return jsonify({"error": "Internal server error"}), 500

    def remove_favorite(self, current_user, manga_id) -> Any:
        
        try:
            
            user = self.collection.find_one({"_id": current_user["_id"]})
            if not user:
                return jsonify({"error": "User not found"}), 404
            
            if manga_id not in user.get("favorites", []):
                return jsonify({"message": "Manga not in favorites"}), 404

            result = self.collection.update_one(
                {"_id": current_user["_id"]},
                {"$pull": {"favorites": manga_id}}
            )
            
            if result.modified_count == 0:
                return jsonify({"message": "No changes made"}), 200
            else:
                updated_user = self.collection.find_one({"_id": current_user["_id"]})
                favorites = updated_user.get("favorites", [])
                return jsonify({
                    "message": "success",
                    "data": favorites
                }), 200
            
        except Exception as e:
            return jsonify({"error": "Internal server error"}), 500
