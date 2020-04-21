FROM python:3.7

COPY requirements.txt /app/
WORKDIR /app
RUN pip install -r requirements.txt
COPY . /app


RUN apt-get update && \
    apt-get upgrade && \
    apt-get install -y software-properties-common && \
    add-apt-repository ppa:openjdk-r/ppa && \
    apt-get install -q -y openjdk-11-jre openjdk-11-jdk && \
    apt-get clean
    
RUN /bin/bash -c 'chmod +x alda && mv alda /usr/local/bin && alda update'
RUN /bin/bash -c 'alda up &'

CMD ["uvicorn", "main:app", "--host", "0.0.0.0"]
