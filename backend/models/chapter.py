from dataclasses import dataclass, field
from typing import (
    List,
    Optional,
    Any,
    Dict
)
from datetime import datetime
from bson import ObjectId



@dataclass
class Chapter:
    
    manga_id: str
    chapter_number: int
    title: str
    pages: List[str]
    upload_date: datetime = field(default_factory=datetime.utcnow)
    id: Optional[str] = None

    def to_dict(self) -> Dict[str, Any]:
        
        result = {
            "manga_id": self.manga_id,
            "chapter_number": self.chapter_number,
            "title": self.title,
            "pages": self.pages,
            "upload_date": self.upload_date
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
