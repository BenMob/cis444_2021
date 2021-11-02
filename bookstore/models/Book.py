class Book:
    __id = None
    __title = None
    __authors = None
    __price = None
    __cover = None

    def __init__(self, id, title, authors, cover, price):
        self.__id = id
        self.__title = title
        self.__authors = authors
        self.__price = price
        self.__cover = cover

    def get_id(self):
        return self.__id

    def get_title(self):
        return self.__title

    def get_authors(self):
        return self.__authors

    def get_cover(self):
        return self.__cover

    def get_price(self):
        return self.__price

    

    
