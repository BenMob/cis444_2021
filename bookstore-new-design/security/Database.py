import psycopg2
from .SecretKeeper import SecretKeeper

class Database:
    '''Singleton Class To Manage Database Connection'''

    __connection = None
    
    @staticmethod
    def get_connection():
        '''Static Access Method'''
        if Database.__connection == None:
            Database()
        return Database.__connection    
    
    def __init__(self):
        '''Virtually private constructor'''
        if Database.__connection == None:
            try:
                # Get database credentials
                db_secrets = SecretKeeper.get("db_secrets")

                # Connect to database
                self.__connect(db_secrets)

            except Exception as exception:
                print("Error: {}".format(exception))            

    def __connect(self, db_secrets):
        '''Connects to the database using given credentials'''

        # Establish connection to db
        Database.__connection = psycopg2.connect(host=db_secrets.get("host"),
                                             dbname=db_secrets.get("dbname"),
                                             user=db_secrets.get("user"),
                                             password=db_secrets.get("password"))
        
        # Checks if connection was established successfully
        if(self.__connection == None):
            raise Exception("Failed to establish connection to database!")
        else:
            print(" * Connection to database was established successfully!")
