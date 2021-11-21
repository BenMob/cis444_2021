from flask import g, request
from controllers.UserController import UserController
from tools.logging import logger

def handle_request():
    logger.debug("Handling signup request")
    controller = UserController(g.queries)
    first_name = request.json.get("first_name")
    last_name = request.json.get("last_name")
    username = request.json.get("username")
    password = request.json.get("password")
    return controller.signup(
        first_name,
        last_name,
        username,
        password
    )
