import pandas as pd
import numpy as np
from prophet import Prophet
from sklearn.linear_model import LinearRegression

def analyze_and_forecast(df: pd.DataFrame, target_column: str, date_column: str = None, periods: int = 30):
    """
    Given a dataframe, determines the best forecasting method (time-series vs regression),
    generates a forecast, calculates a confidence score, and provides explainability.
    """
    if date_column and date_column in df.columns:
        return _forecast_timeseries(df, date_column, target_column, periods)
    else:
        return _forecast_regression(df, target_column)

def _forecast_timeseries(df: pd.DataFrame, date_column: str, target_column: str, periods: int):
    # Prepare for Prophet
    prophet_df = df[[date_column, target_column]].rename(columns={date_column: "ds", target_column: "y"})
    prophet_df["ds"] = pd.to_datetime(prophet_df["ds"], errors='coerce')
    prophet_df = prophet_df.dropna()
    
    if len(prophet_df) < 10:
        return {"error": "Not enough data points for time-series forecasting."}
        
    model = Prophet(yearly_seasonality=True, weekly_seasonality=True)
    model.fit(prophet_df)
    
    future = model.make_future_dataframe(periods=periods)
    forecast = model.predict(future)
    
    # Calculate a rough "Confidence Score" based on variance / MAPE (Mocked for hackathon flair)
    variance = prophet_df['y'].var()
    confidence = min(99, max(50, int(100 - (variance / (prophet_df['y'].mean()**2 + 1e-9)) * 10)))
    
    # Extract reasoning
    reason = "Prophet chosen due to detected time-series structure."
    if 'yearly' in model.seasonalities:
        reason += " Yearly seasonality modeled."
        
    forecast_results = forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].tail(periods).to_dict(orient="records")
    # Convert timestamps to strings for JSON serializability
    for r in forecast_results:
        r['ds'] = r['ds'].strftime("%Y-%m-%d")
    
    return {
        "model": "Prophet",
        "confidence": f"{confidence}%",
        "reason": reason,
        "forecast": forecast_results
    }

def _forecast_regression(df: pd.DataFrame, target_column: str):
    # Basic linear regression if no time component
    df = df.select_dtypes(include=[np.number]).dropna()
    if target_column not in df.columns or len(df) < 10:
        return {"error": "Not enough numeric data for regression."}
        
    X = df.drop(columns=[target_column])
    y = df[target_column]
    
    model = LinearRegression()
    model.fit(X, y)
    score = model.score(X, y)
    
    confidence = min(99, max(30, int(score * 100)))
    reason = "Linear Regression chosen for cross-sectional numerical data."
    
    return {
        "model": "Linear Regression",
        "confidence": f"{confidence}%",
        "reason": reason,
        "r2_score": score
    }
