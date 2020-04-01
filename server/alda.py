from fastapi import APIRouter, HTTPException, Request

import base64
from datetime import datetime
import os
import subprocess

from models import PostResponseAlda, PostRequestAlda


router = APIRouter()


def format_error(code):
    command = "alda play --code '{}'".format(code)
    result = subprocess.run(command, stdout=subprocess.PIPE, shell=True)
    return result.stdout.decode().split('ERROR')[1].strip('\n')


@router.post("/", response_model=PostResponseAlda)
async def post_alda(post_body: PostRequestAlda):
    """ Runs Alda server on given Alda code from client.

    Args:
        post_body (PostRequestAlda): Request body with Alda code from client.
        request (Request): Request object to get base url from.
    Return:
        response (PostResponseAlda): Response body including Alda server response.
   """
    alda_code = post_body.data
    file_name = '/static/' + str(datetime.utcnow().timestamp())
    file_path = os.path.dirname(os.path.realpath(__file__)) + file_name
    midi_path = file_path + '.mid'
    mp3_path = file_path + '.mp3'
    command = "alda export --code '{}' -o {} -F midi".format(alda_code, midi_path)
    subprocess.run(command, stdout=subprocess.PIPE, shell=True)

    if not os.path.isfile(midi_path):
        response = {'data': format_error(alda_code),
                    'status': 400}
    else:
        command = "timidity {} -Ow -o - | lame - -b 64 {}".format(midi_path, mp3_path)
        subprocess.run(command, shell=True)
        f = open(mp3_path, 'rb').read()
        b = base64.b64encode(f)
        response =  {'data': b,
                     'status': 200}
                    
    return response
    