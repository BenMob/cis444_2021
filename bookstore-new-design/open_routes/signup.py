from flask import g, request, jsonify
from controllers.UserController import UserController
from tools.logging import logger

def handle_request():
    logger.debug("Request was directed to /signup endpoint. Beginning handling the request.")
    controller = UserController(g.queries)
    first_name = request.json.get("first_name")
    last_name = request.json.get("last_name")
    username = request.json.get("username")
    password = request.json.get("password")
    response = controller.signup(
        first_name,
        last_name,
        username,
        password
    )
    logger.debug("Finished handling /signup request.")

    return jsonify(response)
