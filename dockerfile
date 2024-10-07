# Start with an official Python image for Django
FROM python:3.10-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set working directory in the container
WORKDIR /app

# Copy and install requirements for Django
COPY requirements.txt /app/
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Install prerequisites for InfluxDB
RUN apt-get update && \
    apt-get install -y wget gnupg2 curl && \
    rm -rf /var/lib/apt/lists/*

# Install InfluxDB
RUN wget -qO- https://repos.influxdata.com/influxdb.key | apt-key add - && \
    echo "deb https://repos.influxdata.com/debian stable main" | tee /etc/apt/sources.list.d/influxdb.list && \
    apt-get update && \
    apt-get install -y influxdb && \
    rm -rf /var/lib/apt/lists/*

# Expose necessary ports
EXPOSE 8000 8086

# Copy the Django application code to the container
COPY . /app/

# Start InfluxDB in the background and then run Django server
CMD service influxdb start && python manage.py runserver 0.0.0.0:8000