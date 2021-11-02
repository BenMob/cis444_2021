from flask import Flask, Blueprint ,render_template, jsonify, request
from security import Database, Queries
from controllers import UserController, BookController, TransactionController

# Sets up app and db
app = Flask(__name__, template_folder="templates")
db_conn = Database.get_connection()
queries = Queries(db_conn)
user_controller = UserController(queries)
book_controller = BookController(queries)
#transaction_controller = TransactionController(queries)

@app.route("/")
def index(methods=["GET"]):
    return render_template("index.html")

@app.route("/login", methods=["POST"])
def login():
    username = request.json.get('username')
    password = request.json.get('password')
    return user_controller.login(username, password)

@app.route("/signup", methods=["POST"])
def signup():
    first_name = request.json.get("first_name")
    last_name = request.json.get("last_name")
    username = request.json.get("username")
    password = request.json.get("password")
    
    return user_controller.signup(
        first_name,
        last_name,
        username,
        password
    )
    
@app.route("/books", methods=["POST"])
def books():
    if(user_controller.isLoggedIn(request.json["access_token"])):
        return book_controller.get_all()
    return user_controller.notLoggedIn();
    
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=80)
