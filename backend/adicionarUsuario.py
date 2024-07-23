from pymongo import MongoClient
from werkzeug.security import generate_password_hash

client = MongoClient('mongodb://localhost:27017/')
db = client.carteirinhas
users_collection = db.users

# Exemplo de registro
user = {
  "matricula": "3470630",
  "username": "chumb",
  "password": generate_password_hash("12345"),  # Hash da senha
  "nome": "Lucas",
  "cargo": "Estagiário",
  "data_entrada": "2024-01-15",
  "isActive": True
}

# Inserir o registro no banco de dados
users_collection.insert_one(user)
print("Usuário inserido com sucesso!")