from flask import Flask, jsonify, send_from_directory, g
from persistance import Database, Queries
from tools.logging import logger
from tools.security import token_required
import traceback
import os

# Sets up app and db
app = Flask(__name__, static_folder="../frontend/build")
db_conn = Database.get_connection()            # Connects to the database 
open_api_route = "/open_api/<route_name>"      # Route format for open api
secure_api_route = "/secure_api/<route_name>"  # Route format for secure api 
error_message = "Oups! something went wrong."  # Error message


# Environment initializer
def init_new_env():
    '''Intializes a new global environment'''
    
    if 'queries' not in g:
        g.queries = Queries(db_conn)

@app.route('/', defaults={'path': ''})
@app.route("/<path:path>")
def serve(path):
    '''Renders index.html from static'''
    
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

@app.route(open_api_route, methods=["POST"])
def open_api(route_name):
    '''Directs Open API Calls'''
    logger.debug("Received an open Request.")

    # Initializes new environment
    init_new_env()
    response = None

    try:
        # Process the request
        package = __import__(f"open_routes.{route_name}")
        handler = getattr(package, route_name)
        response = handler.handle_request()
        
    except Exception as error:
        # Something went wrong 
        log = str(Exception) + "\n"
        log += str(error) + "\n"
        log += traceback.format_exc()
        logger.error(log)
        response = jsonify({"status": 500, "data": error_message})

    # Return the response
    return response


@app.route(secure_api_route, methods=["POST"])
@token_required
def secure_api(route_name):
    '''Directs Secure API Calls'''
    logger.debug("Received a secure request.")

    # Initializes new environment                                                                                                                                     
    init_new_env()
    response = None

    try:
        # Process the request                                                                                                                                          
        package = __import__(f"secure_routes.{route_name}")
        handler = getattr(package, route_name)
        response = handler.handle_request()

    except Exception as error:
        # Something went wrong                                                                                                                                         
        log = str(Exception) + "\n"
        log += str(error) + "\n"
        log += traceback.format_exc()
        logger.error(log)
        reponse = jsonify({"status": 500, "data": error_message})

    # Return the response                                                                                                                                             
    return response
    
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=80)
