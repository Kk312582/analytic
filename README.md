# ForecastAI 🚀

ForecastAI is an intelligent, deeply personalized AI-powered web application that acts as your personal data analyst. It transforms raw public datasets (CSV, Excel) into dynamic, interactive dashboards, generates predictive forecasts with confidence scores, and provides actionable business insights—all driven autonomously by AI.

Designed with a premium glassmorphic UI, ForecastAI learns your preferences and remembers your past analyses to provide smarter, context-aware insights every time you use it.

## 🌟 Core Features

- **AI Decides Everything**: Upload a dataset, and the AI (powered by Gemini) autonomously detects the schema and selects the best forecasting models, KPIs, and chart types.
- **Smart Dynamic Dashboards**: Dashboards aren't hardcoded. The UI layout snaps together dynamically using React and Plotly based on the AI's JSON output.
- **Explainable AI Forecasting**: Utilizes **Prophet** (time-series) and **Scikit-learn** (regression) to generate predictions alongside a *Confidence Score* and a plain-English explanation of why the model was chosen.
- **Deep RAG Memory (ChromaDB)**: The AI doesn't just remember your favorite theme; it remembers your *past analyses*, allowing it to accurately compare Month-over-Month or Year-over-Year trends.
- **Floating AI Forecast Coach**: A chat interface that not only answers questions but prescribes actionable recommendations based on the forecast. It can even control the UI (e.g., "Switch to dark mode", "Change to grid layout").
- **Guest Mode & Auth**: Fully secure JWT-based authentication system with a frictionless 2-session Guest limit for immediate onboarding.

## 🎯 Problem Statement Alignment
This project was built to directly solve the hackathon challenge of creating an **Intelligent Personalized Forecast Dashboard**.
Please see the full [PROBLEM_STATEMENT.md](./PROBLEM_STATEMENT.md) for a detailed breakdown of how our AI orchestration, predictive modeling, RAG memory, and dynamic UI hit every metric of the core challenge.

## 🛠 Tech Stack

### Backend
- **Python & FastAPI**: High-performance API framework.
- **SQLite & SQLAlchemy**: Relational database for User data and Preferences.
- **ChromaDB**: Local vector database for Retrieval-Augmented Generation (RAG) memory.
- **Pandas, Prophet, Scikit-learn**: Data parsing and forecasting engines.
- **Google Gemini API**: Advanced LLM for UI orchestration and conversational insights.

### Frontend
- **React (TypeScript) & Vite**: Blazing fast SPA development.
- **Tailwind CSS v4 & Framer Motion**: Beautiful glassmorphism design and smooth animations.
- **Zustand**: Global state management to allow the AI Chat to mutate UI states.
- **Plotly.js**: Highly interactive and responsive data visualization.

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v18+)
- Python (v3.10+)
- Gemini API Key

### 1. Clone the repository
```bash
git clone https://github.com/YOUR-USERNAME/forecast-ai.git
cd forecast-ai
```

### 2. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
pip install -r requirements.txt # Or install dependencies manually as outlined in the project
```

**Set Environment Variables**:
Create a `.env` file in the `backend/` directory:
```env
GEMINI_API_KEY="your_google_gemini_api_key_here"
SECRET_KEY="your_secure_jwt_secret"
```

**Run the Backend Server**:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```
The FastAPI documentation will be available at `http://localhost:8000/docs`.

### 3. Frontend Setup
Open a new terminal window:
```bash
cd frontend
npm install
npm run dev
```
The React frontend will be available at `http://localhost:5173`.

## 🧠 How it Works (The Architecture)

1. **Ingestion**: User uploads a CSV. Pandas parses the first 100 rows to extract the schema.
2. **Orchestration**: The schema (and past context from ChromaDB) is sent to Gemini. Gemini returns a structured JSON blueprint dictating the optimal layout, KPIs, and charts.
3. **Forecasting**: The Backend runs the dataset through Prophet/Scikit-learn, generating predictions, intervals, and confidence scores.
4. **Rendering**: The React frontend ingests the JSON schema and dynamically mounts the corresponding Plotly components.
5. **Interaction**: The user interacts with the Floating Assistant, which uses Zustand to mutate global states and alter the dashboard visually on-the-fly.

---
*Built for the ultimate Hackathon experience.* 🏆
