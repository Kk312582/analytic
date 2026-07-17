import os
import chromadb
from chromadb.config import Settings
import google.generativeai as genai
from core.config import settings

# In a real setup, we would use a proper path. Using an absolute path for safety.
DB_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "chroma_db")
os.makedirs(DB_PATH, exist_ok=True)

# Initialize ChromaDB
chroma_client = chromadb.PersistentClient(path=DB_PATH)
collection_name = "user_analyses"
collection = chroma_client.get_or_create_collection(name=collection_name)

# Initialize Gemini if API key is present
if settings.GEMINI_API_KEY:
    genai.configure(api_key=settings.GEMINI_API_KEY)

def get_embedding(text: str) -> list[float]:
    if not settings.GEMINI_API_KEY:
        # Dummy embedding for testing without API key
        return [0.0] * 768
    
    result = genai.embed_content(
        model="models/embedding-001",
        content=text,
        task_type="retrieval_document",
    )
    return result['embedding']

def add_analysis_to_memory(user_id: str, analysis_summary: str, metadata: dict):
    """
    Stores an analysis summary in the vector database, tied to a specific user.
    """
    embedding = get_embedding(analysis_summary)
    
    # Generate a simple ID for the document
    doc_id = f"user_{user_id}_{hash(analysis_summary)}"
    
    # Store user_id in metadata for filtering
    final_metadata = {"user_id": str(user_id)}
    final_metadata.update(metadata)
    
    collection.add(
        embeddings=[embedding],
        documents=[analysis_summary],
        metadatas=[final_metadata],
        ids=[doc_id]
    )

def query_past_analyses(user_id: str, query_text: str, n_results: int = 3) -> list[str]:
    """
    Retrieves past analyses for a user that match the query context.
    """
    query_embedding = get_embedding(query_text)
    
    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=n_results,
        where={"user_id": str(user_id)}
    )
    
    if results['documents'] and results['documents'][0]:
        return results['documents'][0]
    return []
