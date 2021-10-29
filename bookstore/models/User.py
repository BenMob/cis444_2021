class User:
    __id = None
    __first_name = None
    __last_name = None
    __username = None
    __password = None # Hashed Version
    __created_at = None

    def __init__(self, id, fname, lname, username, password, created_at):
        self.__id = id
        self.__first_name = fname
        self.__last_name = last_name
        self.__username = username
        self.__password = password
        self.__created_at = created_at

    def get_id(self):
        return self.__id

    def get_first_name(self):
        return self.__first_name

    def get_last_name(self):
        return self.__last_name

    def get_username(self):
        return self.__username

    def get_password(self):
        return self.__password

    def get_created_at(self):
        return self.__created_at
        
    
    
