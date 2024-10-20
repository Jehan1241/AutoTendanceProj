import sqlite3
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


def get_db_connection():
    conn = sqlite3.connect('autoTendanceDB.db')
    conn.row_factory = sqlite3.Row  # This allows us to access columns by name
    return conn

@app.route('/login', methods=['GET'])
def login():
    username = request.args.get('username')
    password = request.args.get('password')

    print(f"Username: {username}, Password: {password}")

    conn = get_db_connection()
    user = conn.execute('SELECT id FROM credentials WHERE username = ? AND password = ?', (username, password)).fetchone()
    
    conn.close()

    if user:
        user_id = user['id']  # Get the user ID
        print(user_id)
        return jsonify({"message": "Login successful", "user_id": user_id}), 200
    else:
        return jsonify({"message": "invalid"}), 200

@app.route('/getBasicInfo', methods=['GET'])
def getBasicInfo():
    rollno = request.args.get('rollno')
    print(f"rollno: {rollno}")

    conn = get_db_connection()
    info = conn.execute('SELECT * FROM StudentInfo WHERE RollNo = ?', (rollno)).fetchone()
    
    conn.close()

    if info:
        name = info['Name']
        branch = info['Branch']
        year = info['Year']
        return jsonify({"name": name, "branch": branch, "year": year}), 200
    else:
        return jsonify({"message": "invalid"}), 200


if __name__ == "__main__":
    app.run(debug=True)