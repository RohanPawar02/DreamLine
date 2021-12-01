from django.urls import path
from . import views

urlpatterns = [
    path('', views.BackgroundImgList.as_view(), name='BackgroundImgList'),
    path('add/', views.BackgroundImgAdd.as_view(), name='BackgroundImgAdd')
]
