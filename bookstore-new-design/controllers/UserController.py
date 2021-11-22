from tools.security import token_encoder, token_decoder, check_password, hash_password
from tools.logging import logger

class UserController:
    
    __queries = None
    
    def __init__(self, queries):
        self.__queries = queries        
        
    def login(self, username, password):
        logger.debug("Trying to log a user in.")
        user_model = self.__queries.get_user_by_username(username)

        # The User was found in the database
        if(not user_model):
            logger.debug("The user was not found.")
            response = {
                "status": 401,
                "access_token": None,
                "message": "This user does not exist."
            }

            return response

        logger.debug("User was found in the database.")
        # Wrong Password
        if(not check_password(password=password, hashed_password=user_model.get_password())):
            logger.debug("The password provided is incorrect.")
            response = {
	       "status": 403,
               "access_token": None,
               "message": "Wrong password."
            }
            return response

        logger.debug("The password provided is correct.")
        
        # User data
        user = {
            "id": user_model.get_id(),
            "first_name": user_model.get_first_name(),
            "last_name": user_model.get_last_name()
        }
        
        # Response
        response = {
            "status": 200,
            "access_token": token_encoder(user),
            "message": "success"
        }

        logger.debug("This user is authentic, giving them the newly created token.")
        return response
           
    def signup(self, first_name, last_name, username, password):
        '''Signup a user'''
        
        logger.debug("Trying to register a new user.")
        user_model = self.__queries.get_user_by_username(username)

        # User already exist
        if(user_model):
           logger.debug("Username already taken")
           response = {
               "status": 403,
               "message": "Username already taken, please try another username."
           }
           return response
        logger.debug("The username provided is available.")
       
        success = self.__queries.insert_user(fname=first_name, lname=last_name, username=username, password=hash_password(password))

        # Account was created successfully
        if(success):
           logger.debug("Successfully registered a new user.")
           response = {
               "status": 200,
               "message": "Thanks for creating an account with us, {}.".format(first_name)
           }
           return response

        logger.debug("Something went wrong while trying to register the user.")
        # Something went wrong and we could not create an account
        response = {
	    "status": 403,
            "message": "Oups! something went wrong, we couldn't create an account for you."
        }

        return response

           
           
           
            
               
