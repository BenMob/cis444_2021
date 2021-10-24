import psycopg2
from .SecretKeeper import SecretKeeper

class DatabaseConn:
    '''Singleton Class To Manage Database Connection'''
    __instance = None
    __connection = None
    
    @staticmethod
    def getInstance():
        '''Static Access Method'''
        if DatabaseConn.__instance == None:
            DatabaseConn()
        return DatabaseConn.__instance
    
    
    def __init__(self):
        '''Virtually private constructor'''
        if DatabaseConn.__instance == None:
            try:
                # Get database credentials
                db_secrets = SecretKeeper.get("db_secrets")

                # Connect to database
                self.__connect(db_secrets)

                # Create singleton instance
                DatabaseConn.__instance = self
            except Exception as exception:
                print("Error: {}".format(exception))            

    def __connect(self, db_secrets):
        '''Connects to the database using given credentials'''
        print(db_secrets)
        print(SecretKeeper.get("jwt_secrets"))
