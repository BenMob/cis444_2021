from flask import g, jsonify
from tools.logging import logger
from tools.security import token_encoder
from controllers.BookController import BookController

def handle_request():
    logger.debug("Request was directed to /books endpoint. Handling the request.")
    controller = BookController(g.queries)                     # Creates a BookController Object
    response = controller.get_all()                            # Queries all books from db
    response["access_token"] = token_encoder(g.token_data)     # Gets a renewned JWT
    logger.debug("Finished handling /books request.")
    
    return jsonify(response)                                   # Returns json reponse
