from fastapi import APIRouter, Request
from pydantic import BaseModel

router = APIRouter()

class PostAldaCode(BaseModel):
    data: str = None


@router.post("/")
async def post_alda(response: PostAldaCode):
    """ Verifies Alda code given from client and processes it into a midi file.
    """
    print(response)

    return 200


def process_alda():
    """Call a subprocess to run Alda server on given Alda code.

    Args:
        alda_code (str): Syntactically correct Alda code.
    
    Return:
        Midi file (obj): Midi file returned by Alda server.

    """

    pass