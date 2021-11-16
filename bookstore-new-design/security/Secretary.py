import jwt
import bcrypt
from .SecretKeeper import SecretKeeper

class Secretary:

    __jwt_key = None
    __jwt_algorithm = None
    
    def __init__(self):
        '''Uses jwt and bcrypt to ecode and decode data as well as checking peoiple's passwords'''

        jwt_secrets = SecretKeeper.get_from_local("jwt_secrets")
        self.__jwt_key = jwt_secrets.get("key")
        self.__jwt_algorithm = jwt_secrets.get("algorithm")

    def encode(self, data: dict) -> str:
        '''Uses jwt to encode the data into a token'''

        return jwt.encode(data, self.__jwt_key, algorithm=self.__jwt_algorithm)

    def decode(self, token: str) -> dict:
        '''Uses jwt to decode token'''
        decoded = None
        try:
            decoded = jwt.decode(token, self.__jwt_key, algorithms=[self.__jwt_algorithm])
        except:
            return {}
        
        return decoded

    def hash_password(self, password: str) -> str:
        '''Uses bcrypt to hash password'''
    
        salt = bcrypt.gensalt(rounds=10)
        return bcrypt.hashpw(bytes(password, 'utf-8'), salt)
     

    def check_password(self, password: str, hashed_password) -> bool:
        '''Uses bcrypt to check password'''

        hashed_password = hashed_password.encode("utf-8")        
        return bcrypt.checkpw(bytes(password, 'utf-8'), hashed_password)
    
    
