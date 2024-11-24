import yaml
import ssl
import os
import io

from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from pymongo.collection import Collection

# Load environment variables from .env.yaml file
yaml_path = os.path.join(
    os.path.dirname(__file__),
    '.env.yaml'
)
with io.open(
    file=yaml_path,
    mode='r',
    encoding='utf-8'
) as fs:
    config = yaml.safe_load(fs)

jwt_secret = config['jwt_secret_key']

# MongoDB connection setup  
# mongo_uri = f"mongodb+srv://{config['mongodb_login']['username']}:{config['mongodb_login']['password']}@kenzocluster.8ycqo.mongodb.net/?retryWrites=true&w=majority&appName=KenzoCluster"

mongo_uri = f"mongodb://{config['mongodb_login']['username']}:{config['mongodb_login']['password']}@kenzocluster-shard-00-00.8ycqo.mongodb.net:27017,kenzocluster-shard-00-01.8ycqo.mongodb.net:27017,kenzocluster-shard-00-02.8ycqo.mongodb.net:27017/?ssl=true&replicaSet=atlas-v5otec-shard-0&authSource=admin&retryWrites=true&w=majority&appName=KenzoCluster"

# client = MongoClient(mongo_uri, server_api=ServerApi('1'))
client = MongoClient(
    mongo_uri,
    tls=True,
    # tlsInsecure=True,
    ssl_cert_reqs=ssl.CERT_NONE,
    serverSelectionTimeoutMS=10000
)
db = client["kenzo_db"]

# Collections
manga_collection: Collection = db["manga"]
chapter_collection: Collection = db["chapters"]
user_collection: Collection = db["users"]
