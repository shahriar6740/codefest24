from fastapi import FastAPI
import uvicorn
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import data_loader
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", 'http://0.0.0.0:5173'],
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["*"],
)


class TextRequest(BaseModel):
    text: str

@app.post("/prompt/")
async def retrive_result(text_request: TextRequest):
    text = text_request.text
    result = data_loader.rag_response(text)
    # Now you can use the 'text' variable as a string
    return {"text": result}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)