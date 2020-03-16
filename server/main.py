from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles

import os

from alda import router as alda_router


app = FastAPI(
    title="Alda Online",
    description="Web server to use the music programming language Alda",
    openapi_url="/api/v1/openapi.json"
)


app.mount("/static", StaticFiles(directory="static"), name="static")


@app.get('/')
async def index(request: Request):
    os.environ['BASE_URL'] = str(request.base_url)
    
    return


app.include_router(
    alda_router,
    prefix="/alda",
    tags=["alda"]
)