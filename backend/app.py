import uvicorn
from threading import Thread
from fastapi import FastAPI

app = FastAPI()




if __name__ == "__main__":

    @app.get("/")
    async def read_root():
        return {"Hello": "World"}

    def run_server():
        uvicorn.run(app, host="127.0.0.1", port=8000, log_level="info")

    # Start the server in a separate thread
    thread = Thread(target=run_server)
    thread.start()