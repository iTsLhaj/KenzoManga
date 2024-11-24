from dataclasses import dataclass, field
from typing import (
    List,
    Optional,
    Any,
    Dict
)
from bson import ObjectId
from datetime import datetime



@dataclass
class User:
    
    username: str
    email: str
    password_hash: str
    favorites: List[str] = field(default_factory=list)
    created_at: datetime = field(default_factory=datetime.utcnow)
    id: Optional[str] = None

    def to_dict(self) -> Dict[str, Any]:
        
        result = {
            "username": self.username,
            "email": self.email,
            "password_hash": self.password_hash,
            "favorites": self.favorites,
            "created_at": self.created_at
        }
        
        # if self.id:
        result["_id"] = ObjectId(self.id).__str__()
        return result
        
    @classmethod
    def from_dict(cls, data: Dict[str, Any]):
        
        if "_id" in data:
            data["_id"] = str(data["_id"])
            del data["_id"]
        return cls(**data)
    