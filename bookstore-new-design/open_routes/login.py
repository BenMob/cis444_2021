from flask import g, request
from controllers.UserController import UserController
from tools.logging import logger 

def handle_request():
    logger.debug("Handling login request")
    controller = UserController(g.queries)
    username = request.json.get('username')
    password = request.json.get('password')
    return controller.login(username, password)
    
    
