class Transaction():

    __id = None
    __item_id = None
    __buyer_id = None
    __timestamp = None

    def __init__(self, id, item_id, buyer_id, timestamp):
        self.__id = id
        self.__item_id = item_id
        self.__buyer_id = buyer_id
        self.__timestamp = timestamp

    def get_id(self):
        return self.__id

    def get_item_id(self):
        return self.__item_id

    def get_buyer_id(self):
        return self.__buyer_id

    def get_timestamp(self):
        return self.__timestamp
