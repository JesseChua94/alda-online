from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

import os

from alda import router as alda_router


app = FastAPI(
    title="Alda Online",
    description="Web server to use the music programming language Alda",
    openapi_url="/api/v1/openapi.json"
)


app.mount("/static", StaticFiles(directory="static"), name="static")


origins = [
    "http://localhost:3000",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(
    alda_router,
    prefix="/alda",
    tags=["alda"]
)