from fastapi import FastAPI, Request
from fastapi.routing import get_name
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates



from alda import router as alda_router


app = FastAPI(
    title="Alda Online",
    description="Web server to use the music programming language Alda",
    openapi_url="/api/v1/openapi.json"
)


templates = Jinja2Templates(directory='templates')


app.mount("/static", StaticFiles(directory="static"), name="static")


@app.get('/')
async def index(request: Request):

    return templates.TemplateResponse('index.html', 
                                     {'request': request})


app.include_router(
    alda_router,
    prefix="/alda",
    tags=["alda"]
)