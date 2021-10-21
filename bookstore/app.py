from flask import Flask, render_template, jsonify, request
import jwt

app = Flask(__name__, template_folder="templates")

secret = "hjbsdfhbvfdsaoibvdfsiobvfds"


@app.route("/login", methods=["GET", "POST"])
def login():
    print(request.method)
    if request.method == 'POST':
        jwt_str = jwt.encode({"username": "benjamin"}, secret, algorithm="HS256")
        return jsonify({"jwt": jwt_str})
    else:
        return render_template("login.html", page_name="Login")
            


@app.route("/")
@app.route("/store", methods=["GET"])
def store():
    return "store"

@app.route("/home", methods=["GET"])
def home():
    return "home"
    
@app.route("/signup", methods=["GET", "POST"])
@app.route("/register", methods=["GET", "POST"])
def signup():
    return "signup"
    
@app.errorhandler(404)
def not_found():
    return "404 not found"
    
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=80)