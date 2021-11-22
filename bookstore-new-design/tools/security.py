import jwt
import json
import datetime
import bcrypt
from flask import g, jsonify, request
from tools.logging import logger
from functools import wraps


def get_secrets(secret_key: str) -> str:
    '''Share secrets from the secret file, given a secret key'''

    logger.debug(f"Getting secrets with key -> {secret_key}")
    secret_file_location = "./secrets.json"
    secrets = None

    # Read the secret json file
    with open(secret_file_location) as secret_file:
        secrets = json.load(secret_file).get(secret_key)

        # Ensures the secret was found in the secret file                                              
        if secrets == None:
            raise Exception("{} not found in {}. Check SecretKeeper.get()".format(secret_key, secret_file_location))

    # Closes secret file so nobody can steal our little secrets 
    secret_file.close()

    return secrets;


def token_required(function):
    '''Verifies Token'''
    
    @wraps(function)
    def _verify(*args, **kwargs):
        logger.debug("Received a secure call, verifying token.")

        # Error messages
        not_logged_in_msg = jsonify({"status": 401, "message": "Please log in or create an account first."})
        session_expired_msg = jsonify({"status": 401, "message": "Session expired, please log in again."})
        something_went_wrong_msg = jsonify({"status": 500, "message": "Oups! something went wrong on the server while making a secure call. Please report this."})
        
        try:
            token_data = token_decoder(request.json.get("access_token"))
            g.token_data = token_data
            return function(*args, **kwargs)
        
        except jwt.ExpiredSignatureError:
            logger.debug("Expired JWT.")
            return session_expired_msg
        
        except jwt.InvalidTokenError:
            logger.debug("Invalid Token.")
            return not_logged_in_msg

        except Exception as e:
            logger.debug("Something went wrong, did not fulfil the request.")
            return something_went_wrong_msg

    return _verify


def token_encoder(data: dict) -> str:
    '''Uses jwt to encode the data into a token'''
    
    logger.debug("Creating new JWT.")

    # Set token expiration time
    data['exp'] = datetime.datetime.utcnow() + datetime.timedelta(days=0, minutes=30)
    data['iat'] = datetime.datetime.utcnow()

    # Get JWT Secrets
    secrets = get_secrets("jwt_secrets")
    return jwt.encode(data, secrets.get("key"), algorithm=secrets.get("algorithm"))


def token_decoder(token: str) -> dict:
    '''Uses jwt to decode token'''

    logger.debug("Trying to decode JWT.")
    decoded = None

    # Get JWT Secrets
    secrets = get_secrets("jwt_secrets")
    
    try:
        decoded = jwt.decode(token, secrets.get("key"), algorithms=secrets.get("algorithm"))
    except:
        logger.debug("Failed to decode the JWT token, it looks like the issue is internal.")
        return {}
        
    return decoded
 

def hash_password(password: str) -> str:
    '''Uses bcrypt to hash password'''

    logger.debug("Hashing password.")
    salt = bcrypt.gensalt(rounds=10)
    return bcrypt.hashpw(bytes(password, 'utf-8'), salt)
     

def check_password(password: str, hashed_password) -> bool:
    '''Uses bcrypt to check password'''

    logger.debug("Validating password.")
    hashed_password = hashed_password.encode("utf-8")        
    return bcrypt.checkpw(bytes(password, 'utf-8'), hashed_password)


