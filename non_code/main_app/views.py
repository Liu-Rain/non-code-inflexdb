from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.contrib import messages
import requests
from django.views.decorators.csrf import csrf_exempt
import json
import csv
import io
@csrf_exempt


# Create your views here.
#Views is a request handler

def login(request):
    if request.method == 'POST':
            try:
                body = json.loads(request.body)
                
                # Parse the JSON body
                username = body.get('username')
                password = body.get('password')

                url = "http://influxdb2:8086/api/v2/signin"
                response = requests.post(url, auth=(username, password))
                # Authenticate user (dummy example)
                if response.status_code == 204:
                    cookies_response = response.cookies
                    cookie_dict = {c.name: c.value for c in cookies_response}
                    cookies = cookie_dict["influxdb-oss-session"]
                    return JsonResponse({'message': 'Login successful!', "cookies": f"{cookies}"}, status=200)
                else:
                    return JsonResponse({'message': 'Invalid username or password.'}, status=401)
                    
            except Exception:
                return JsonResponse({'message': 'Body is wrong'}, status=400)
    else:
        return JsonResponse({'message': 'Only POST requests are allowed.'}, status=405)


    # Check if credentials match
    #if username in users and users[username] == password:
    #    return f"Welcome, {username}!"
    #else:
    #    return "Invalid username or password.", 401
    #return render(request, "login.html")

def home(request):
    return HttpResponse("HI!!!")

@csrf_exempt #this is how to fix 403 forbidden by 
def bucketquery(request):
    body = json.loads(request.body)
    cookies_value = body.get('cookies')
    cookies = requests.cookies.RequestsCookieJar()
    cookies.set(
        name="influxdb-oss-session",
        value=cookies_value,
        domain="influxdb2.local",
        path="/api/"
    )#convert cookies back to RequestsCookieJar


    headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
    url = "http://influxdb2:8086/api/v2/buckets" #need to soft code org


    response = requests.get(url, headers=headers, cookies=cookies) #use get instead of post
    data = response.json()
    data = data.get("buckets")
    bucket_dict = dict()
    if data:
        for bucket in data:  # Adjust based on response structure
            bucket_dict.update({bucket['name']:bucket['id']})

    
    #if response.status_code == 200:
    #    messages.success(request, f"Query Results:={response.text}")
    #    return JsonResponse({"status": f'{response.status_code}'}, status=200)

    #else:
    #    messages.success(request, f"Error:={response.status_code}, {response.text}")

    return JsonResponse({"messages": f'{response.text}', "code": f'{response.status_code}', "cookies" : f'{cookies}', "data": bucket_dict}, status = 200)
    

@csrf_exempt #this is how to fix 403 forbidden by 
def meansurementquery(request):
    body = json.loads(request.body)
    cookies_value = body.get('cookies')
    bucket = body.get('bucket')
    cookies = requests.cookies.RequestsCookieJar()
    cookies.set(
        name="influxdb-oss-session",
        value=cookies_value,
        domain="influxdb2.local",
        path="/api/"
    )#convert cookies back to RequestsCookieJar


    headers = {
            "Content-Type": "application/vnd.flux",
            "Accept": "application/csv",
        }
    url = "http://influxdb2:8086/api/v2/query" #need to soft code org
    params = {
    "org": "docs"  # Replace with your actual organization name
    }
    data = f'import "influxdata/influxdb/schema"\nschema.measurements(bucket: "{bucket}")'




    response = requests.post(url, headers=headers, cookies=cookies, params=params, data=data) #use get instead of post
    csv_content = response.text.strip()
    csv_reader = csv.reader(io.StringIO(csv_content))
    rows = list(csv_reader)

    # Extract measurement names from the last column (_value)
    measurements = []
    for row in rows:
        if len(row) >= 4 and row[3] not in ("_value", ""):  # Skip header row and empty values
            measurements.append(row[3])

    #recieve = recieve.get("buckets")
    #bucket_dict = dict()
    #if recieve:
    #    for bucket in recieve:  # Adjust based on response structure
    #        bucket_dict.update({bucket['name']:bucket['id']})

    
    #if response.status_code == 200:
    #    messages.success(request, f"Query Results:={response.text}")
    #    return JsonResponse({"status": f'{response.status_code}'}, status=200)

    #else:
    #    messages.success(request, f"Error:={response.status_code}, {response.text}")

    return JsonResponse({"messages": f'{response.text}', "code": f'{response.status_code}', "cookies" : f'{cookies}', "bucket": bucket, "data": measurements}, status = 200)
    
@csrf_exempt #this is how to fix 403 forbidden by 
def fieldquery(request):
    body = json.loads(request.body)
    cookies_value = body.get('cookies')
    bucket = body.get('bucket')
    meansurement = body.get('meansurement')
    cookies = requests.cookies.RequestsCookieJar()
    cookies.set(
        name="influxdb-oss-session",
        value=cookies_value,
        domain="influxdb2.local",
        path="/api/"
    )#convert cookies back to RequestsCookieJar


    headers = {
            "Content-Type": "application/vnd.flux",
            "Accept": "application/csv",
        }
    url = "http://influxdb2:8086/api/v2/query" #need to soft code org
    params = {
    "org": "docs"  # Replace with your actual organization name
    }
    data = f'''import "influxdata/influxdb/schema"
        schema.measurementFieldKeys(
            bucket: "{bucket}",
            measurement: "{meansurement}",
        )'''




    response = requests.post(url, headers=headers, cookies=cookies, params=params, data=data) #use get instead of post
    csv_content = response.text.strip()
    csv_reader = csv.reader(io.StringIO(csv_content))
    rows = list(csv_reader)

    # Extract measurement names from the last column (_value)
    fields = []
    for row in rows:
        if len(row) >= 4 and row[3] not in ("_value", ""):  # Skip header row and empty values
            fields.append(row[3])

    #recieve = recieve.get("buckets")
    #bucket_dict = dict()
    #if recieve:
    #    for bucket in recieve:  # Adjust based on response structure
    #        bucket_dict.update({bucket['name']:bucket['id']})

    
    #if response.status_code == 200:
    #    messages.success(request, f"Query Results:={response.text}")
    #    return JsonResponse({"status": f'{response.status_code}'}, status=200)

    #else:
    #    messages.success(request, f"Error:={response.status_code}, {response.text}")

    return JsonResponse({"messages": f'{response.text}', "code": f'{response.status_code}', "cookies" : f'{cookies}', "bucket": bucket, "meansurement":meansurement, "data": fields}, status = 200)
    
