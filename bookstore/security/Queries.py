from models.User import User
from models.Book import Book
import time

class Queries:

    __db_conn = None

    def __init__(self, conn):
        self.__db_conn = conn

    def get_all_books(self):
        books = []
        cursor = self.__db_conn.cursor()
        cursor.execute("SELECT * FROM books;")
        for book_row in cursor.fetchall():
            book = Book(id=book_row[0], title=book_row[1], authors=book_row[2], price=book_row[3], cover=book_row[4])
            books.append(book)

        return books

    def get_user_by_username(self, username):
        if(not username):
            return None
        
        cursor = self.__db_conn.cursor()
        cursor.execute("SELECT * FROM users WHERE username = '{}';".format(username))
        user_row = cursor.fetchone()
        if(user_row):
            return User(id=user_row[0], fname=user_row[1], lname=user_row[2], username=user_row[3], password=user_row[4], created_at=user_row[5])
        return None

    def get_user_by_id(self, id):
        if(not id):
            return None

        cursor = self.__db_conn.cursor()
        cursor.execute("SELECT * FROM users WHERE id = '{}';".format(id))
        user_row = cursor.fetchone()
        if(user_row):
            return User(id=user_row[0], fname=user_row[1], lname=user_row[2], username=user_row[3], password=user_row[4], created_at=user_row[5])
        return None
    
    def insert_user(self, fname, lname, username, password):
        timestamp = int(time.time())
        cursor = self.__db_conn.cursor()
        password = password.decode("utf-8")

        cursor.execute("INSERT INTO users(first_name, last_name, username, password, timestamp) VALUES('{}', '{}', '{}', '{}', '{}');".format(fname, lname, username, password, timestamp))
        self.__db_conn.commit()
        
        return True;

    def insert_transaction(self, item_id, buyer_id):
        pass

    def get_transactionsByUser(self):
        pass

    

    
