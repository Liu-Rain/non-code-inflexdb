FROM python:3.9
COPY . /app
WORKDIR /app

CMD python main.py && python -m pip install django && python non_code/manage.py runserver 0.0.0.0:3000
