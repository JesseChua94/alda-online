from fastapi import APIRouter, HTTPException, Request

import os
import subprocess

from models import PostResponseAlda, PostRequestAlda


router = APIRouter()

@router.post("/")
async def post_alda(post_body: PostRequestAlda):
    """ Runs Alda server on given Alda code from client.

    Args:
        post_body (PostRequestAlda): Request body with Alda code from client.
        request (Request): Request object to get base url from.
    Return:
        response (PostResponseAlda): Response body including Alda server response.

    TODO:
        -Find a better way to pass base url here. Possibly an app config var
    """
    alda_code = post_body.data
    file_path = os.path.dirname(os.path.realpath(__file__)) + '/static/alda_output'
    result = subprocess.run(['alda', 'export', '--code', alda_code, 
                            '-o', file_path + '.mid', '-F', 'midi'], 
                            stdout=subprocess.PIPE)

    
    #timidity test.midi -Ow -o - | lame - -b 64 test.mp3

    if os.path.isfile(file_path + '.mp3'):
        response =  {'data': file_path + '.mp3',
                     'status': 200}
    else:
        response = {'data': result.stdout.decode(),
                    'status': 400}
    return response
    