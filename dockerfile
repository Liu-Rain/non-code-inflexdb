FROM python:3.9
COPY . /test
WORKDIR /test
RUN pip install django
CMD python main.py
