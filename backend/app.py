from dotenv import load_dotenv
import os
import logging

from fastapi import FastAPI, Form, Depends, HTTPException
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from starlette.requests import Request
from pydantic import BaseModel

from langchain_groq import ChatGroq
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate

"""from langchain_openai import OpenAI
model = OpenAI(api_key=os.getenv('OPENAI_API_KEY'), temperature=0.7)
"""

#####import bbdd

################################# INICIALIZACIÓN

load_dotenv()  # Cargar variables de entorno desde el archivo .env

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

llm = ChatGroq(model="llama3-70b-8192")
app = FastAPI()

app.add_middleware( # Configurar CORS
    CORSMiddleware,
    allow_origins=["*"],  # Permitir todas las URLs de origen. Puedes restringir esto a dominios específicos si lo prefieres.
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos los métodos HTTP.
    allow_headers=["*"],  # Permitir todos los encabezados HTTP.
)

class InputModel(BaseModel):
    input: str

#################################

@app.get("/")
# """
#   Página principal de la app
# """

def home():
    return {"response": "hola home"}

@app.post("/ai")
async def chat(input_model: InputModel):
    if not input_model.input:
        raise HTTPException(status_code=400, detail="No input provided")

    template = "User: {question}\nBot:"
    prompt = PromptTemplate(template=template, input_variables=['input'])

    chain = LLMChain(llm=llm, prompt=prompt)
    
    try:
        logger.info(f"Invoking LLMChain with input: {input_model.input}")
        response = chain.invoke(input=input_model.input) 
        logger.info(f"Received response: {response}")
    except Exception as e:
        logger.error(f"Error during LLMChain invocation: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
    
    return {"response": str(response).strip()}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")
