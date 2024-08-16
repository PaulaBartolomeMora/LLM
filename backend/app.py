from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from langchain_openai import OpenAI
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
import os
from dotenv import load_dotenv

load_dotenv()  # Cargar variables de entorno desde el archivo .env

app = FastAPI()

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permitir todas las URLs de origen. Puedes restringir esto a dominios específicos si lo prefieres.
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos los métodos HTTP.
    allow_headers=["*"],  # Permitir todos los encabezados HTTP.
)

"""
model = OpenAI(api_key=os.getenv('OPENAI_API_KEY'), temperature=0.7)

@app.post("/ai")
async def chat(input: str):
    if not input:
        raise HTTPException(status_code=400, detail="No input provided")

    # Definir un template para la conversación
    template = "User: {question}\nBot:"
    prompt = PromptTemplate(template=template, input_variables=['question'])

    # Crear la cadena de procesamiento
    chain = LLMChain(llm=model, prompt=prompt)
    
    try:
        # Obtener la respuesta del modelo
        response = chain.run(question=input)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    return {"response": response.strip()}
"""

@app.post("/ai")
async def prueba():
    return {"response": "hola"}

@app.get("/")
async def read_root():
    return {"Hello": "World"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")
