from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
import qrcode
import io
from flask_cors import CORS
from bson import ObjectId
from pymongo import MongoClient

app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://localhost:27017/carteirinhas'
app.config['SECRET_KEY'] = 'seu-segredo'
mongo = PyMongo(app)
CORS(app)

# Registro de usuário
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    matricula = data.get('matricula')
    username = data.get('username')
    password = data.get('password')
    
    user = mongo.db.users.find_one({"matricula": matricula})
    if user:
        mongo.db.users.update_one(
            {"matricula": matricula},
            {"$set": {
                "username": username,
                "password": generate_password_hash(password)
            }}
        )
        return jsonify({'message': 'Registro atualizado com sucesso'})
    else:
        new_user = {
            "matricula": matricula,
            "username": username,
            "password": generate_password_hash(password),
            "nome": data.get('nome'),
            "cargo": data.get('cargo'),
            "data_entrada": data.get('data_entrada'),
            "isActive": data.get('isActive', True)
        }
        mongo.db.users.insert_one(new_user)
        return jsonify({'message': 'Usuário registrado com sucesso'}), 201

# Login de usuário
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    user = mongo.db.users.find_one({"username": username})
    if user and check_password_hash(user['password'], password):
        token = jwt.encode(
            {'username': username, 'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=1)},
            app.config['SECRET_KEY'],
            algorithm='HS256'
        )
        return jsonify({'access_token': token})
    return jsonify({'error': 'Credenciais inválidas'}), 401

# Buscar usuário por matrícula
@app.route('/fetchUser', methods=['POST'])
def fetch_user():
    data = request.json
    matricula = data.get('matricula')
    # print(f"Recebido matricula: {matricula}")
    # print(f"Dados recebidos: {data}")
    user = mongo.db.users.find_one({"matricula": matricula})
    if user:
        # print(f"Usuário encontrado: {user}")
        return jsonify({
            'nome': user.get('nome'),
            'matricula': user.get('matricula'),
            'cargo': user.get('cargo'),
            'dataEntrada': user.get('data_entrada'),
            'isActive': user.get('isActive')
        })
    else:
        print("Usuário não encontrado")
        return jsonify({'error': 'Usuário não encontrado'}), 404

# Gerar QR Code
@app.route('/generate', methods=['POST'])
def generate_qr_code():
    data = request.json
    matricula = data.get('matricula')
    # print(f"Gerando QR Code para matricula: {matricula}")
    token = jwt.encode(
        {'matricula': matricula, 'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=1)},
        app.config['SECRET_KEY'],
        algorithm='HS256'
    )
    img = qrcode.make(token)
    buf = io.BytesIO()
    img.save(buf)
    buf.seek(0)
    return jsonify({"tokenJWT": token})

# Verificar QR Code
@app.route('/verify', methods=['POST'])
def verify_qr_code():
    token = request.json.get('token')
    try:
        decoded = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        matricula = decoded['matricula']
        user = mongo.db.users.find_one({"matricula": matricula})
        if user:
            is_active = user.get('isActive', False)
            return jsonify({
                'status': 'active' if is_active else 'inactive',
                'nome': user.get('nome'),
                'matricula': user.get('matricula'),
                'cargo': user.get('cargo'),
                'dataEntrada': user.get('data_entrada')
            })
        else:
            return jsonify({'status': 'not found'}), 404
    except jwt.ExpiredSignatureError:
        return jsonify({'status': 'expired'}), 400
    except jwt.InvalidTokenError:
        return jsonify({'status': 'invalid'}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)
