from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib import messages
import requests

# Create your views here.
#Views is a request handler

def login(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        messages.success(request, f"username={username}, password={password}")

        url = "http://influxdb2:8086/api/v2/signin"
        response = requests.post(url, auth=(username, password)) #post is send request to fill in website's username and password to get response
        #get is send request by the arguments directly login, in influxdb, we need token to login
        cookies = response.cookies

        if response.status_code == 204:
            messages.success(request, f"success! username={username}, password={password} coockies={cookies},,,,,{type(cookies)}")
        else:
            messages.success(request, f"Failed to sign in. Status code: {response.status_code}, Response: {response.text}")

        session_url = "http://influxdb2:8086/api/v2/me"
        response = requests.get(session_url, cookies=cookies)
        messages.success(request, f"Status code: {response.status_code}, Response: {response.text}")
        cookie_dict = {c.name: c.value for c in cookies}#have to convert to dict to find value
        messages.success(request, f"{cookie_dict}")
        return redirect(f'/query/?cookies={cookie_dict["influxdb-oss-session"]}')


    # Check if credentials match
    #if username in users and users[username] == password:
    #    return f"Welcome, {username}!"
    #else:
    #    return "Invalid username or password.", 401
    return render(request, "login.html")

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
    
