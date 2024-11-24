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
from pymongo.collection import Collection



class MiscRoutes:
    
    def __init__(
        self,
        collections: Dict[str, Collection]
    ) -> None:
        
        self.collections = collections
        self.blueprint = Blueprint('misc_routes', __name__)
        self.register_routes()
    
    def register_routes(self) -> None: pass
