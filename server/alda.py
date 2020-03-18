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
    file_name = '/static/alda_output'
    file_path = os.path.dirname(os.path.realpath(__file__)) + file_name
    midi_path = file_path + '.mid'
    mp3_path = file_path + '.mp3'

    command = "alda export --code '{}' -o {} -F midi".format(alda_code, midi_path)
    result = subprocess.run(command, stdout=subprocess.PIPE, shell=True)

    command = "timidity {} -Ow -o - | lame - -b 64 {}".format(midi_path, mp3_path)
    subprocess.run(command, shell=True)

    if os.path.isfile(mp3_path):
        response =  {'data': file_name + '.mp3',
                     'status': 200}
    else:
        response = {'data': result.stdout.decode(),
                    'status': 400}
                    
    return response
    