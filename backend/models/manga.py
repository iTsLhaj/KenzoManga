from dataclasses import dataclass, field
from typing import (
    List,
    Dict,
    Any,
    Optional
)
from datetime import datetime
from bson import ObjectId



@dataclass
class Manga:
    
    title: str
    author: str
    description: str
    genres: List[str]
    cover_image_url: str
    status: str
    chapters: List[str] = field(default_factory=list)
    last_modified: datetime = field(default_factory=datetime.utcnow)
    id: Optional[str] = None

    def to_dict(self) -> Dict[str, Any]:
        
        result = {
            "title": self.title,
            "author": self.author,
            "description": self.description,
            "genres": self.genres,
            "cover_image_url": self.cover_image_url,
            "status": self.status,
            "chapters": self.chapters,
            "last_modified": self.last_modified
        }
        
        if self.id:
            result["_id"] = ObjectId(self.id).__str__()
        return result

    @classmethod
    def from_dict(cls, data: Dict[str, Any]):
        
        if '_id' in data:
            data['id'] = str(data['_id'])
            del data['_id']
        return cls(**data)
