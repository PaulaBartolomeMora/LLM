from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permitir todas las URLs de origen. Puedes restringir esto a dominios específicos si lo prefieres.
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos los métodos HTTP.
    allow_headers=["*"],  # Permitir todos los encabezados HTTP.
)

@app.get("/")
async def read_root():
    return {"Hello": "World"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")
