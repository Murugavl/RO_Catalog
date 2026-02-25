import os
from datetime import datetime, timezone
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from flask_pymongo import PyMongo
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from dotenv import load_dotenv
from bson.objectid import ObjectId
import cloudinary
import cloudinary.uploader
import cloudinary.api
import certifi

load_dotenv()

app = Flask(__name__)
# Enable CORS for frontend
CORS(app)

# Configuration
# Ensure the DB name is included in the URI for Flask-PyMongo
mongo_uri = os.getenv("MONGODB_URI")
if mongo_uri is None:
    raise ValueError("MONGODB_URI must be set in .env")

app.config["MONGO_URI"] = mongo_uri
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY", "fallback-secret")
app.config["MAX_CONTENT_LENGTH"] = 16 * 1024 * 1024  # 16 MB max

cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET")
)

mongo = PyMongo(app, tlsCAFile=certifi.where())
jwt = JWTManager(app)

# Test connection
import sys
try:
    if mongo.cx:
        mongo.cx.admin.command('ping')
        print("Connected to MongoDB Atlas successfully!")
except Exception as e:
    print(f"Failed to connect to MongoDB Atlas: {e}")
    sys.exit(1)

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'webp'}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def dump_model(model):
    """Helper to serialize MongoDB document."""
    model["id"] = str(model.pop("_id", ""))
    if "createdAt" in model and isinstance(model["createdAt"], datetime):
        model["createdAt"] = model["createdAt"].isoformat()
    return model

@app.route('/api/admin/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    if username == 'admin' and password == 'secure123':
        token = create_access_token(identity=username)
        return jsonify({'token': token}), 200
    return jsonify({'error': 'Invalid credentials'}), 401

@app.route('/api/admin/models', methods=['POST'])
@jwt_required()
def add_model():
    if 'image' not in request.files:
        return jsonify({"error": "No image part"}), 400
    
    file = request.files['image']
    if file.filename == '':
        return jsonify({"error": "No selected image"}), 400
        
    if not allowed_file(file.filename):
        return jsonify({"error": "Invalid file type. Allowed: jpg, png, webp"}), 400

    data = request.form
    name = data.get("name")
    price = data.get("price")
    
    if not name or not price:
        return jsonify({"error": "Name and price are required"}), 400
        
    try:
        price = float(price)
    except ValueError:
        return jsonify({"error": "Price must be a valid number"}), 400

    try:
        upload_result = cloudinary.uploader.upload(file)
        image_url = upload_result["secure_url"]
        cloudinary_id = upload_result["public_id"]
    except Exception as e:
        return jsonify({"error": f"Image upload failed: {str(e)}"}), 500

    # Construct Document
    model_doc = {
        "name": name,
        "brand": data.get("brand", ""),
        "price": price,
        "imageUrl": image_url,
        "cloudinaryId": cloudinary_id,
        "technologyType": data.get("technologyType", ""),
        "capacity": data.get("capacity", ""),
        "warranty": data.get("warranty", ""),
        "purificationStages": data.get("purificationStages", ""),
        "energyConsumption": data.get("energyConsumption", ""),
        "colorVariant": data.get("colorVariant", ""),
        "weight": data.get("weight", ""),
        "createdAt": datetime.now(timezone.utc)
    }

    result = mongo.db.models.insert_one(model_doc)
    model_doc["_id"] = result.inserted_id
    
    return jsonify({
        "message": "Model added successfully",
        "model": dump_model(model_doc)
    }), 201

@app.route('/api/admin/models', methods=['GET'])
@jwt_required()
def get_admin_models():
    models = list(mongo.db.models.find().sort("createdAt", -1))
    return jsonify({"models": [dump_model(m) for m in models]}), 200

@app.route('/api/admin/models/<id>', methods=['DELETE'])
@jwt_required()
def delete_model(id):
    try:
        obj_id = ObjectId(id)
    except:
        return jsonify({"error": "Invalid ID format"}), 400
        
    model = mongo.db.models.find_one({"_id": obj_id})
    if not model:
        return jsonify({"error": "Model not found"}), 404
        
    cloudinary_id = model.get("cloudinaryId")
    if cloudinary_id:
        try:
            cloudinary.uploader.destroy(cloudinary_id)
        except Exception as e:
            print(f"Failed to delete image from Cloudinary: {e}")
            
    mongo.db.models.delete_one({"_id": obj_id})
    return jsonify({"message": "Model deleted successfully"}), 200

@app.route('/api/admin/models/<id>', methods=['PUT'])
@jwt_required()
def edit_model(id):
    try:
        obj_id = ObjectId(id)
    except:
        return jsonify({"error": "Invalid ID format"}), 400
        
    model = mongo.db.models.find_one({"_id": obj_id})
    if not model:
        return jsonify({"error": "Model not found"}), 404
        
    data = request.form
    name = data.get("name")
    price = data.get("price")
    
    if not name or not price:
        return jsonify({"error": "Name and price are required"}), 400
        
    try:
        price = float(price)
    except ValueError:
        return jsonify({"error": "Price must be a valid number"}), 400
        
    update_fields = {
        "name": name,
        "brand": data.get("brand", ""),
        "price": price,
        "technologyType": data.get("technologyType", ""),
        "capacity": data.get("capacity", ""),
        "warranty": data.get("warranty", ""),
        "purificationStages": data.get("purificationStages", ""),
        "energyConsumption": data.get("energyConsumption", ""),
        "colorVariant": data.get("colorVariant", ""),
        "weight": data.get("weight", "")
    }

    if 'image' in request.files and request.files['image'].filename != '':
        file = request.files['image']
        if not allowed_file(file.filename):
            return jsonify({"error": "Invalid file type. Allowed: jpg, png, webp"}), 400
            
        try:
            upload_result = cloudinary.uploader.upload(file)
            update_fields["imageUrl"] = upload_result["secure_url"]
            update_fields["cloudinaryId"] = upload_result["public_id"]
            
            if model.get("cloudinaryId"):
                try:
                    cloudinary.uploader.destroy(model.get("cloudinaryId"))
                except Exception as e:
                    print(f"Old image delete failed: {e}")
        except Exception as e:
            return jsonify({"error": f"Image upload failed: {str(e)}"}), 500

    mongo.db.models.update_one({"_id": obj_id}, {"$set": update_fields})
    updated_model = mongo.db.models.find_one({"_id": obj_id})
    return jsonify({
        "message": "Model updated successfully",
        "model": dump_model(updated_model)
    }), 200

@app.route('/api/models', methods=['GET'])
def get_public_models():
    models = list(mongo.db.models.find().sort("createdAt", -1))
    return jsonify({"models": [dump_model(m) for m in models]}), 200



if __name__ == '__main__':
    app.run(debug=True, port=5000)
