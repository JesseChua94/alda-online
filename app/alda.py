from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel

from os import path
import subprocess

router = APIRouter()

class PostRequestAlda(BaseModel):
    data: str


@router.post("/")
async def post_alda(response: PostRequestAlda):
    """ Verifies Alda code given from client and processes it into a midi file.
    """
    response = process_alda(response.data)
    #call subprocess on response in try/except
    #raise HTTPException(status_code=200, detail="ITS AN ERROR")
    return {"detail": "/test.midi"}


def process_alda(alda_code):
    """Call a subprocess to run Alda server on given Alda code.

    Args:
        alda_code (str): Syntactically correct Alda code.
    
    Return:
        Midi file (obj): Midi file returned by Alda server.

    """
    result = subprocess.run(['alda', 'export', '--code', alda_code, 
                            '-o', 'alda_output.mid', '-F', 'midi'], 
                            stdout=subprocess.PIPE)
    if os.path.isfile('/alda_output.mid'):
        response =  {'data': '/alda_output.mid'}
    else:
        response = {'data': result.stdout.decode()}
    
    return response