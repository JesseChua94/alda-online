# alda-online
Alda Online aims to make the Alda music programming language more accessible via a web client. The original project by Dave Yarwood can be found here: https://github.com/alda-lang/alda.


Please continue reading if you would like to run the project locally (for the time being this is the only option as I currently work on getting this hosted).

## Requirements

-python<=3.6 

-node<=13.10.1

-npm<=6.13.7

-alda (https://github.com/alda-lang/alda)

## How to Run

1. Follow instructions on Alda git page to install and get server running.

#### Backend Server

1. git clone https://github.com/JesseChua94/alda-online.git

2. cd alda-online

3. cd server && pip install -t requirements.txt

4. uvicorn main:app

#### Frontend
1. cd alda-online/frontend && npm install

2. cp ./mode-alda.js node_modules/ace-builds/src-noconflict/  # This is a prebuilt library that the editor currently relies on for syntax highlighting. As of writing, the merged pr I created on the original project has not been reflected in the prebuilt repo so this file has to be moved in manually.

3. npm start

4. Go to http://localhost:8888/


Disclaimer
This project is not directly associated with the Alda project.

TODO
- Look into hosting
