from dotenv import load_dotenv
load_dotenv()  # Cargar variables de entorno desde el archivo .env

from fastapi import FastAPI, Form, Depends, HTTPException
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware

import uvicorn
import os

from starlette.requests import Request
from pydantic import BaseModel


#####import bbdd




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
users_db = {"user@example.com": {"password": "password123"}}

class LoginForm(BaseModel):
    email: str
    password: str

@app.post("/login")
async def login_user(form_data: LoginForm):
    email = form_data.email
    password = form_data.password

    if email not in users_db:
        raise HTTPException(status_code=400, detail="Usuario no encontrado")
    
    if users_db[email]["password"] != password:
        raise HTTPException(status_code=400, detail="Contraseña incorrecta")
    
    return RedirectResponse(url="/success", status_code=302)

@app.get("/success")
async def success():
    return {"message": "Inicio de sesión exitoso"}
"""






"""from langchain_openai import OpenAI
model = OpenAI(api_key=os.getenv('OPENAI_API_KEY'), temperature=0.7)
"""

from langchain_groq import ChatGroq
llm = ChatGroq(model="llama3-70b-8192")

from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate



class InputModel(BaseModel):
    input: str

@app.post("/ai")
async def chat(input_model: InputModel):
    if not input_model.input:
        raise HTTPException(status_code=400, detail="No input provided")

    template = "User: {question}\nBot:"
    prompt = PromptTemplate(template=template, input_variables=['question'])

    # Create the processing chain
    chain = LLMChain(llm=llm, prompt=prompt)
    
    try:
        # Get the response from the model
        response = chain.run(question=input_model.input)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    return {"response": response.strip()}


@app.get("/")
# """
#   Página principal de la app
# """

def home():
    return {"response": "hola home"}



if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")
