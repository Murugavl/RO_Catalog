# RO Product Catalog

A comprehensive product catalog system tailored for RO (Reverse Osmosis) water purifiers. The application provides an elegant customer-facing frontend to browse and compare RO models, alongside a secure administrative backend to manage the product inventory.

## 🚀 Tech Stack

### Frontend
* **Framework:** React 18, Vite
* **Styling:** Tailwind CSS
* **Routing:** React Router DOM
* **Deployment:** Nginx (via Docker)

### Backend
* **Framework:** Python, Flask
* **Database:** MongoDB (using PyMongo)
* **Authentication:** Flask-JWT-Extended
* **Media Storage:** Cloudinary (for model images)
* **CORS:** Flask-CORS

## ✨ Features

### Customer View
* **Product Catalog:** View all available RO models with an intuitive UI.
* **Responsive Design:** Fully responsive layout across desktop and mobile devices.
* **Product Comparison:** Select multiple products to compare their specifications side-by-side.

### Admin Panel
* **Secure Login:** JWT-based authentication for administrative access.
* **Product Management:** Full CRUD (Create, Read, Update, Delete) capabilities for RO models.
* **Image Uploads:** Seamlessly upload model images, hosted on Cloudinary.
* **Automatic Formatting:** Handles price, numeric formatting, and image management directly from the dashboard.

## 🛠️ Project Structure

```text
c:\RO_Catalog\
├── backend/               # Flask API backend
│   ├── app.py             # Main application entry point
│   ├── requirements.txt   # Python dependencies
│   ├── Dockerfile         # Backend Docker configuration
│   └── .env               # Backend environment variables
├── frontend/              # React frontend
│   ├── src/               # React components and views
│   ├── package.json       # Node dependencies
│   ├── Dockerfile         # Frontend Docker configuration
│   └── nginx.conf         # Nginx server configuration
└── docker-compose.yml     # Docker compose setup
```
## 📥 Clone the Repository

    git clone https://github.com/Murugavl/RO_Catalog.git
    cd RO_Catalog
    
## ⚙️ Environment Variables Setup

Before running the application, provide the required environment variables.

### Backend (`backend/.env`)
Create a `.env` file in the `backend` directory:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_secure_jwt_secret
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_admin_password
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Frontend (`frontend/.env`)
Create a `.env` file in the `frontend` directory:
```env
VITE_API_URL=http://localhost:5000/api
```

## 🏃‍♂️ Running the Application

### Option 1: Using Docker (Recommended)
You can build and run both frontend and backend using Docker Compose.

1. Ensure the `.env` files are configured in both `backend` and `frontend` directories.
2. Run the application:
```bash
docker-compose up -d --build
```
* The frontend will be available at `http://localhost:5173`
* The API will be available at `http://localhost:5000/api`

### Option 2: Local Development

**1. Start Backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate      # On Windows: .\venv\Scripts\activate
pip install -r requirements.txt
flask run                     # or python app.py
```

**2. Start Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## 📝 License

### This Project is under [MIT License](LICENSE)
