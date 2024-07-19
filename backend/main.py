from fastapi import FastAPI
import uvicorn
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
# import data_loader
import rag_pipeline
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5174", 'http://0.0.0.0:5174'],
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["*"],
)


class TextRequest(BaseModel):
    text: str

@app.post("/prompt/")
async def retrive_result(text_request: TextRequest):
    text = text_request.text
    result = rag_pipeline.rag_response(text)
    # Now you can use the 'text' variable as a string
    # for key,value in result.items():
    #     print(key,value)
    return {"text": result["llm"]["replies"][0]}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8532)