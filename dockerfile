FROM python:3.9
COPY . /test
WORKDIR /test
CMD node app.js && python main.py