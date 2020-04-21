# alda-online
Alda Online aims to make the Alda music programming language more accessible via a web client. The original project by Dave Yarwood can be found here: https://github.com/alda-lang/alda.


Please continue reading if you would like to run the project locally (for the time being this is the only option since hosting is quite expensive).

## Requirements

-python<=3.6 

-node<=13.10.1

-npm<=6.13.7

-alda (https://github.com/alda-lang/alda)

## How to Run

1. Follow instructions on the Alda git page to install and get server running.

#### Backend Server

1. git clone https://github.com/JesseChua94/alda-online.git

2. cd alda-online

3. cd server && pip install -r requirements.txt

4. uvicorn main:app

#### Frontend
1. In a new shell, cd alda-online/frontend && npm install

2. npm start

3. Go to http://localhost:3000/


## Disclaimer

This project is not directly associated with the Alda project.

TODO
- Figure out how to run Alda server when Docker container starts.
