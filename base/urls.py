from django.urls import path
from . import views
urlpatterns=[
    path('', views.firstPage_view, name="firstPage"),
    path('home', views.home_view, name="home"),
    path('screen/<str:pk>', views.employeeScreen_view, name="empScreen"),
    path('editemployee/<str:pk>', views.editEmployee_view, name="empEdit"),
    path('add', views.addEmployee_view, name="addEmp"),
    path('search', views.srchEmployee_view, name="search"),
    path('requestvacation/<str:pk>', views.Requestvacation_view, name="requestVac"),
    path('vacationrequests', views.vacationReqests_view, name="vacRequests"),
]