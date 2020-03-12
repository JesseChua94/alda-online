from pydantic import BaseModel


class PostRequestAlda(BaseModel):
    data: str


class PostResponseAlda(BaseModel):
    data: str
    status: int