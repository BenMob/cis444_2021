from flask import g, request, jsonify
from controllers.UserController import UserController
from tools.logging import logger 

def handle_request():
    logger.debug("Request was directed to /login endpoint. Beginning handling the request.")
    controller = UserController(g.queries)
    username = request.json.get('username')
    password = request.json.get('password')
    response = controller.login(username, password)
    logger.debug("Finished handling /login request.")
    return jsonify(response)
    
