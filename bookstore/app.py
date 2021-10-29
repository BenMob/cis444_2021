import jwt
import json
from flask import Flask, render_template, jsonify, request
from security import DatabaseConn, Secretary

app = Flask(__name__, template_folder="templates")
db_conn1 = DatabaseConn.getInstance()
secretary = Secretary()

data = {
    "username": "Benjamin",
    "pass": "password"
}

print("Encoding {}".format(str(data)))
token = secretary.encode(data)
print("Token: {}".format(token))

print("\nDecoding the token")
decoded = secretary.decode(token)
print("Decoded: {}".format(decoded))


print("Hashing password")
hashed = secretary.hash_password(data.get("pass"))
print("Hashed password: {}".format(hashed))
print("\nChecking password")
print(secretary.check_password(data.get("pass"), hashed))

secrets = None
with open("secrets.json") as file:
    secrets = json.load(file)
file.close()

@app.route("/login", methods=["GET", "POST"])
def login():
    
    if request.method == 'POST':
        jwt_str = jwt.encode({"username": "benjamin"}, secrets.get('jwt_key'), algorithm="HS256")
        return jsonify({"jwt": jwt_str})
    else:
        return render_template("login.html", page_name="Login")

@app.route("/expose", methods=["POST"])
def expose():
    token = request.args.get("jwt")
    return jsonify(jwt.decode(token, secrets.get('jwt_key'), algorithms="HS256"))




'''
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
'''
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=80)
