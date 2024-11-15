from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
#Views is a request handler

def say_hello(request):
    return HttpResponse("Hi!!!")