from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_alda():
    """ Verifies Alda code given from client and processes it into a midi file.

    
    """
    pass


def process_alda_():
    """Call a subprocess to run Alda server on given Alda code.

    Args:
        alda_code (str): Syntactically correct Alda code.
    
    Return:
        Midi file (obj): Midi file returned by Alda server.

    """

    pass