from security import Secretary
from flask import jsonify

class UserController:
    
    __queries = None
    __secretary = None
    
    def __init__(self, queries):
        self.__queries = queries        
        self.__secretary = Secretary()
        
    def login(self, username, password):
        user_model = self.__queries.get_user_by_username(username)
        
        # The User was found in the database
        if(not user_model):
            response = {
                "status": 401,
                "access_token": None,
                "message": "This user does not exist."
            }

            return jsonify(response)
        
        # Wrong Password
        if(not self.__secretary.check_password(password=password, hashed_password=user_model.get_password())):
           response = {
	       "status": 403,
               "access_token": None,
               "message": "Wrong password."
           }

           return jsonify(response)
           
        # User data
        user = {
            "id": user_model.get_id(),
            "first_name": user_model.get_first_name(),
            "last_name": user_model.get_last_name()
        }

        # Response
        response = {
            "status": 200,
            "access_token": self.__secretary.encode(user),
            "message": "success"
        }

        return jsonify(response)
           
    def signup(self, first_name, last_name, username, password):
        
        user_model = self.__queries.get_user_by_username(username)

        # User already exist
        if(user_model):
           response = {
               "status": 403,
               "message": "Username already taken, please try another username"
           }
           return jsonify(response)

        success = self.__queries.insert_user(fname=first_name, lname=last_name, username=username, password=self.__secretary.hash_password(password))
        if(success):
           response = {
               "status": 200,
               "message": "Thanks for creating an account with us, {}.".format(first_name)
           }
           return jsonify(response)

        response = {
	    "status": 200,
            "message": "Oups!, something went wrong."
        }

        return jsonify(response)
        
    def isLoggedIn(self, access_token):
        data = self.__secretary.decode(access_token)
        found = self.__queries.get_user_by_id(data.get("id"))
        
        if(found):
            return True

        return False
           
    def isNotLoggedIn(self):
        return jsonify({"status": 401, "message": "Please log in or create an account first."})
           
           
           
           
           
            
               
