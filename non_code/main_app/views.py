from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.contrib import messages
import requests
from django.views.decorators.csrf import csrf_exempt
import json
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

def query(request):
    cookies_value = request.GET.get('cookies')
    cookies = requests.cookies.RequestsCookieJar()
    cookies.set(
        name="influxdb-oss-session",
        value=cookies_value,
        domain="influxdb2.local",
        path="/api/"
    )#convert cookies back to RequestsCookieJar


    headers = {
            "Content-Type": "application/vnd.flux",
            "Accept": "application/json",
        }
    data = """
            from(bucket: "home")
            |> range(start: -1h)
            |> filter(fn: (r) => r._measurement == "measurement_name")
            """
    
    url = "http://influxdb2:8086/api/v2/query?org=docs" #need to soft code org

    response = requests.post(url, headers=headers, cookies=cookies, data=data)

    if response.status_code == 200:
        messages.success(request, f"Query Results:={response.text}")

    else:
        messages.success(request, f"Error:={response.status_code}, {response.text}")

    return render(request, "query.html")
    
