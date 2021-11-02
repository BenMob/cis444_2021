from flask import jsonify

class BookController:

    __queries = None

    def __init__(self, queries):
        self.__queries = queries

    def get_all(self):
        book_models = self.__queries.get_all_books()
        books  = []
        for book in book_models:
            books.append({
                "id" : book.get_id(),
                "title" : book.get_title(),
                "authors" : book.get_authors(),
                "cover" : book.get_cover(),
                "price" : float(book.get_price())
            })
        
        return jsonify(status=200, books=books, message="success")  
