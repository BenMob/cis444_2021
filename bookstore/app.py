from flask import Flask

app = Flask(__name__)

@app.route("/")
@app.route("/store", methods=["GET"])
def store():
    return "store"

@app.route("/home", methods=["GET"])
def home():
    return "home"
    
@app.route("/login", methods=["GET", "POST"])
def login():
    return "login"
    
@app.route("/signup", methods=["GET", "POST"])
@app.route("/register", methods=["GET", "POST"])
def signup():
    return "signup"