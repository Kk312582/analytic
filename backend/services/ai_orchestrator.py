import json
import google.generativeai as genai
from core.config import settings

if settings.GEMINI_API_KEY:
    genai.configure(api_key=settings.GEMINI_API_KEY)

def generate_dashboard_schema(schema_info: dict, past_analyses_context: str = "") -> dict:
    """
    Uses Gemini to analyze the dataset schema and generate a JSON definition for the dashboard layout, KPIs, and charts.
    """
    if not settings.GEMINI_API_KEY:
        # Fallback schema for testing without API key
        return {
            "layout": "grid",
            "theme": "dark",
            "kpis": [{"title": "Total Rows", "value": schema_info.get("row_count", 0)}],
            "charts": [
                {"type": "bar", "title": "Sample Bar Chart", "x_axis": schema_info.get("columns", ["X"])[0], "y_axis": schema_info.get("columns", ["Y"])[-1]}
            ]
        }

    prompt = f"""
    You are an expert Data Analyst and UI Architect. 
    Analyze the following dataset schema and past context to design the perfect dashboard layout.
    
    Dataset Schema: {json.dumps(schema_info)}
    Past User Context (RAG): {past_analyses_context}
    
    Respond ONLY with a valid JSON object matching this structure:
    {{
        "layout": "grid|flex|masonry",
        "theme": "dark|light",
        "kpis": [
            {{"title": "KPI Name", "metric_formula": "description of how to calculate"}}
        ],
        "charts": [
            {{"type": "line|bar|pie|heatmap", "title": "Chart Title", "x_axis": "column_name", "y_axis": "column_name", "reason": "Why this chart fits"}}
        ],
        "recommended_model": "Prophet|RandomForest|LinearRegression",
        "model_reason": "Why this model fits best"
    }}
    """
    
    model = genai.GenerativeModel('gemini-1.5-pro')
    response = model.generate_content(prompt)
    
    try:
        # Extract JSON from response (handling potential markdown blocks)
        text = response.text
        if "```json" in text:
            text = text.split("```json")[1].split("```")[0]
        elif "```" in text:
            text = text.split("```")[1].split("```")[0]
            
        return json.loads(text.strip())
    except Exception as e:
        print(f"Failed to parse JSON from Gemini: {e}")
        return {"error": "Failed to generate dynamic schema"}
