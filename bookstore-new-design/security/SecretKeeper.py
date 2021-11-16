import json

class SecretKeeper:
    __secret_file_location = "./secrets.json"
    
    @staticmethod
    def get_from_local(secret_key: str) -> str:
        '''Share secrets from the secret file, given a secret key'''

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
        
    @staticmethod
    def get_from_cloud(secret_key: str) -> str:
        '''Gets secret from the cloud, given a secret key'''
        pass
