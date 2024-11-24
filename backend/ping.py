import io
import datetime
import traceback

from getpass import getpass
from urllib.parse import quote_plus
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

# TODO: add rich support !

current_time = datetime.datetime.now()

from resources import client

def test_connection() -> bool:

    # Send a ping to confirm a successful connection
    try:
        
        client.admin.command('ping')
        print(" * You successfully connected to MongoDB!")
        
        return True
    
    except Exception as e:
        
        logFileName = current_time.strftime("mongodb_connection_logs.%Y-%m-%d.%H:%M:%S.txt")
        with io.open(file=logFileName, mode='w', encoding='utf-8') as fs:
            
            fs.write(f"Exception occurred: {type(e).__name__}\n")
            fs.write(f"Arguments: {e.args}\n")
            fs.write(f"Exception message: {str(e)}\n")
            fs.write("\n\n ---------- Stack Trace ----------\n")
            traceback.print_exc(file=fs)
        
        print("\n - Failed to ping your deployment")
        print(" - Please make sure you\'re credentials are correct")
        print(" - Logs are saved to", logFileName)
        
        return False
