from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib import messages


# Create your views here.
#Views is a request handler

def login(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        messages.success(request, f"username={username}, password={password}")
        

    # Check if credentials match
    #if username in users and users[username] == password:
    #    return f"Welcome, {username}!"
    #else:
    #    return "Invalid username or password.", 401
    return render(request, "login.html")

def home(request):
    return HttpResponse("HI!!!")