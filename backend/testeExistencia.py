from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017/')
db = client.carteirinhas
users_collection = db.users

user = users_collection.find_one({"matricula": "3470630"})
if user:
    print("Usuário encontrado:", user)
else:
    print("Usuário não encontrado")
