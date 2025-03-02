from django.urls import path
from . import views

urlpatterns = [
    path("", views.home),
    path("login/", views.login),
    path("bucketquery/", views.bucketquery),
    path("meansurementquery/", views.meansurementquery),
]