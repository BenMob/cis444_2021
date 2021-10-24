import psycopg2
import json

class DatabaseConn:
    '''Singleton Class To Manage Database Connection'''
    __instance = None
    __connection = None
    __secret_file_location = "./secrets.json"
    
    @staticmethod
    def getInstance():
        print("Ran Get Instance")
        '''Static Access Method'''
        if DatabaseConn.__instance == None:
            DatabaseConn()
        return DatabaseConn.__instance
    
    
    def __init__(self):
        print("Rant __init__")
        '''Virtually private constructor'''
        if DatabaseConn.__instance == None:
            try:
                # Get database credentials
                db_credentials = self.__get_credentials(db_credentials_key="db_credentials")

                # Connect to database
                self.__connect(db_credentials)

                # Create singleton instance
                DatabaseConn.__instance = self
            except Exception as exception:
                print(exception)            

                
    def __get_credentials(self, db_credentials_key):
        '''Gets database credentials from secret file'''
        db_credentials = None
        
        # Read the secret json file to grab db credentials
        with open(self.__secret_file_location) as secret_file:
            db_credentials = json.load(secret_file).get(db_credentials_key)
                
            # Ensures db_credentials were found in the secret file                                                    
            if db_credentials == None:
                raise Exception("{} not found in {}".format(db_credentials_key, self.__secret_file_path))
                
        # Closes secret file                                                                                      
        secret_file.close()

        return db_credentials;

    
    def __connect(self, db_credentials):
        '''Connects to the database using given credentials'''
        print(db_credentials)