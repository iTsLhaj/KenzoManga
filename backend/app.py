from ping import test_connection

from flask import Flask
from flask_cors import CORS
from resources import (
    manga_collection,
    chapter_collection,
    user_collection,
    jwt_secret
)
from routes.api.manga import MangaRoutes
from routes.api.chapter import ChapterRoutes
from routes.api.user import UserRoutes



app = Flask(__name__)
CORS(app)


# Routes
manga_routes = MangaRoutes(collection=manga_collection)
chapter_routes = ChapterRoutes(
    chapter_collection=chapter_collection,
    manga_collection=manga_collection
)
user_routes = UserRoutes(
    collection=user_collection,
    manga_collection=manga_collection,
    jwt_secret_key=jwt_secret
)

# Register blueprints
app.register_blueprint(
    blueprint=manga_routes.blueprint,
    url_prefix='/api/manga'
)
app.register_blueprint(
    blueprint=chapter_routes.blueprint,
    url_prefix='/api/chapter'
)
app.register_blueprint(
    blueprint=user_routes.blueprint,
    url_prefix='/api/user'
)

if __name__ == '__main__':
    
    if test_connection():

        app.run(
            debug=True,
            port=1337
        )
