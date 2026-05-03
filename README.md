KrishiSeva 🌾 — AI-Powered Crop Recommendation Platform
An intelligent full-stack web platform that helps farmers and agricultural planners make data-driven crop selection decisions. Built with a Next.js 14 TypeScript frontend and a Python ML backend serving a trained Random Forest classifier, KrishiSeva predicts the most suitable crop based on soil composition and climate parameters.


✨ Key Features

AI Crop Recommendation — Enter soil and climate data; the Random Forest model predicts the optimal crop with high accuracy
Authenticated Dashboard — Secure Login and Signup with route-level middleware protection via Next.js
Prediction History — Every recommendation is logged and accessible from the user's history page
Analytics — Visual breakdown of past predictions and usage patterns
Document Upload — Upload soil reports or agricultural documents directly through the platform
Recommendations Feed — Personalised crop suggestions based on user's historical inputs
Responsive UI — Clean, mobile-friendly interface built with Tailwind CSS


🛠️ Tech Stack
Layer                         Technology
FrontendFramework            Next.js 14 (App Router)
Language                     TypeScript
Styling                      Tailwind CSS
ML Backend                   Python
ML Model                     Random Forest Classifier (Scikit-learn)
Model Format                 Pickle (.pkl)
Database                     MySQL
Auth & Routing               Next.js Middleware
Package                      Managerpnpm

🤖 Machine Learning Model
The crop recommendation engine is powered by a Random Forest Classifier trained on agricultural data.
Input parameters:

Nitrogen (N), Phosphorus (P), Potassium (K) content in soil
Temperature (°C)
Humidity (%)
pH value of soil
Rainfall (mm)

Model pipeline:

Raw dataset loaded from Crop_recommendation.csv
Features and labels extracted, labels encoded via labels.pkl
Random Forest model trained using Scikit-learn
Trained model serialised to RandomForest.pkl
main.py loads the model and serves predictions via API endpoint
Next.js frontend sends input data and displays the predicted crop


📁 Project Structure
v0-krishiseva-ai-platform/
├── app/
│   ├── dashboard/
│   │   ├── analytics/        # Usage analytics and charts
│   │   ├── history/          # Prediction history log
│   │   ├── recommendations/  # Personalised crop recommendations
│   │   └── upload/           # Document upload feature
│   ├── login/                # Login page
│   └── signup/               # Registration page
├── backend/
│   ├── main.py               # Python API — loads model, serves predictions
│   ├── train_model.py        # Model training script
│   ├── RandomForest.pkl      # Trained Random Forest model
│   ├── labels.pkl            # Label encoder for crop classes
│   ├── Crop_recommendation.csv  # Training dataset
│   └── requirements.txt      # Python dependencies
├── components/
│   ├── dashboard/            # Dashboard UI components
│   └── landing/              # Landing page components (hero, header, footer, about)
├── hooks/                    # Custom React hooks
├── lib/                      # Utility functions and helpers
├── public/                   # Static assets
├── styles/                   # Global styles
├── middleware.ts              # Next.js route protection middleware
├── next.config.mjs           # Next.js configuration
├── tailwind.config.ts        # Tailwind CSS configuration
└── tsconfig.json             # TypeScript configuration

⚙️ Getting Started
Prerequisites

Node.js v18+
Python 3.9+
MySQL
pnpm (npm install -g pnpm)


1. Clone the Repository
bashgit clone https://github.com/Swayumbansal25/KrishiSeva-AI-Platform.git
cd KrishiSeva-AI-Platform

2. Set Up the Python ML Backend
bashcd backend
pip install -r requirements.txt
To retrain the model (optional — pre-trained .pkl files are included):
bashpython train_model.py
Start the backend API:
bashpython main.py
The ML API will run at http://localhost:5000 (or whichever port is configured in main.py).

3. Set Up the Next.js Frontend
Navigate back to the root directory:
bashcd ..
pnpm install
Create a .env.local file in the root:
envDATABASE_URL=your_mysql_connection_string
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
ML_API_URL=http://localhost:5000
Start the development server:
bashpnpm dev
Visit http://localhost:3000 in your browser.

4. Set Up the Database
Create a MySQL database and run the schema setup (add your schema file or migration commands here).

🔐 Authentication & Route Protection
KrishiSeva uses Next.js Middleware (middleware.ts) for route-level authentication:

Unauthenticated users attempting to access any /dashboard/* route are automatically redirected to /login
Protection is enforced at the routing layer — before any page or component renders
Session management is handled server-side for security


📊 How the Recommendation Works
User fills input form (N, P, K, Temp, Humidity, pH, Rainfall)
        ↓
Next.js frontend sends POST request to Python backend
        ↓
main.py receives parameters → loads RandomForest.pkl
        ↓
Model predicts crop class → label decoded via labels.pkl
        ↓
Prediction returned to frontend → displayed to user
        ↓
Result saved to MySQL → appears in History dashboard

🙋‍♂️ Author
Swayum Bansal

GitHub: @Swayumbansal25
LinkedIn: swayum-bansal-2aa254377
Email: bansalswayum@gmail.com