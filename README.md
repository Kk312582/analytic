# ForecastAI 🚀

ForecastAI is an intelligent, deeply personalized AI-powered web application that acts as your personal data analyst. It transforms raw public datasets (CSV, Excel) into dynamic, interactive dashboards, generates predictive forecasts with confidence scores, and provides actionable business insights—all driven autonomously by AI.

Designed with a premium glassmorphic UI, ForecastAI learns your preferences and remembers your past analyses to provide smarter, context-aware insights every time you use it.

## 🎯 Problem Statement Alignment
This project directly solves the hackathon challenge by building an **Intelligent Personalized Forecast Dashboard**. We have architected the solution to map 1:1 with the evaluation criteria:

### 1. Let the AI Choose EVERYTHING (Explainability & Automation)
- **Dynamic Selection**: Instead of hardcoding visualizers, our AI pipeline automatically detects dataset schemas (e.g., Daily Weather, Financial Sales) and **autonomously decides** the:
  - ✓ Best forecast model (Prophet for time-series with seasonality, Scikit-learn for regressions)
  - ✓ Best dashboard layout & KPIs
  - ✓ Best charts (Line charts, Heatmaps, Scatter plots)
  - ✓ Best report style & export formats (PDF, CSV)
- **Judges Love Explainability**: Every AI decision is accompanied by a transparent "Reason" (e.g., *"Selected Prophet because the dataset is time-series with seasonality"*), ensuring users trust the automated process.

### 2. Advanced Predictive Modeling with Confidence Scores
- **Beyond Simple Predictions**: We don't just say `Sales next month = 15,000`. Our ML pipeline outputs a strict **Prediction**, alongside a robust statistical **Confidence Score** (e.g., `92%`), and a **Reason** explaining the variance and underlying trends.

### 3. Retrieval-Augmented Generation (RAG) Memory
- **Persistent Context**: Right now, most AIs only remember basic preferences. We integrated a vector database (ChromaDB) to provide true RAG memory.
- **Smart Comparisons**: The AI remembers *previous analyses*. Example interaction:
  - *User:* "Compare this month's sales with last month."
  - *AI:* "Last month, your analysis showed a 15% increase. Compared to that, this month's growth is 9%."
  This makes the Forecast Coach feel exponentially smarter and highly personalized.

### 4. Modular Database Architecture
- **Built for the Hackathon**: For rapid prototyping during the challenge, we are utilizing **SQLite** as it is lightweight and more than sufficient for the MVP.
- **Future-Proof**: The code is designed using abstract layers (SQLAlchemy ORM) so the database layer can be instantly swapped to **PostgreSQL** in production without rewriting the business logic. We purposely skipped PostgreSQL initially to avoid wasting time on migrations during the timed challenge.

---

## ✨ Features
- **Smart File Uploader**: Drag and drop CSV/Excel datasets for instant AI schema detection.
- **Dynamic Dashboard**: Auto-generated Plotly charts and KPIs tailored entirely by the AI based on the data context.
- **Floating AI Forecast Coach**: A conversational RAG-powered agent that can prescribe actionable insights and control the UI (e.g., "Switch to grid layout").
- **Guest Mode & Auth**: Fully secure JWT-based authentication system for seamless onboarding.

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
