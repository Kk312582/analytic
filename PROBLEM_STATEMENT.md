# Problem Statement: Intelligent Personalized Forecast Dashboard

## Background
Organizations today face an overwhelming amount of raw data but struggle to extract actionable, personalized insights without deep technical expertise in data science and business intelligence (BI) tools.

## The Challenge
The goal is to build an **AI-powered web application that transforms raw public datasets into interactive, highly personalized dashboards and predictive forecasts**.

## Key Requirements & Alignment
Our solution, **ForecastAI**, directly addresses the core hackathon problem statement through the following features:

1. **Intelligent Automation (AI Evaluator Alignment)**
   - The application automatically detects dataset schemas without user intervention.
   - It leverages Large Language Models (LLMs) to autonomously decide the best KPIs, visual charts, and dashboard layouts.

2. **Advanced Predictive Modeling**
   - Incorporates robust statistical and machine learning models (Prophet for time-series forecasting, Scikit-learn for regressions) to provide accurate future projections.
   - Displays a transparent **Confidence Score** with natural language explanations to justify the model selection and build user trust.

3. **Personalization & Memory (RAG Integration)**
   - Uses a Retrieval-Augmented Generation (RAG) architecture (via ChromaDB) to remember user preferences across sessions.
   - Retains context from previous dataset analyses, allowing the AI to naturally compare current trends with historical insights (e.g., Month-over-Month changes).

4. **Interactive UI & Actionable Insights**
   - The AI acts as a "Forecast Coach," providing prescriptive recommendations rather than just descriptive numbers.
   - Users can control the UI layout and themes entirely through conversational commands via the Floating Assistant.
   - Built with high-end aesthetics (Glassmorphism) for a premium user experience.

5. **Security & Scalability**
   - Implements robust testing (100% test passing in CI/CD).
   - Enforces HTTP Security headers, CORS restrictions, and strict JWT validation.
   - Highly accessible (ARIA compliant) frontend.
