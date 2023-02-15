from email.headerregistry import Address
from django.db import models

# Create your models here.
class Employee(models.Model):
    id = models.CharField(max_length=8, primary_key=True)
    name = models.CharField(max_length=255) 
    email= models.EmailField()
    address = models.CharField(max_length=511)
    phone= models.CharField(max_length=13) 
    gender= models.CharField(max_length=6)
    marital=models.CharField(max_length=13)
    availableVac= models.IntegerField()
    approvedVac= models.IntegerField()
    salary= models.IntegerField()
    dob = models.DateField()
    
class Vacation(models.Model):
    emp = models.ForeignKey(Employee, on_delete=models.CASCADE)
    fromDate= models.DateField()
    toDate= models.DateField()
    reason = models.TextField(null= True, blank= True)
    status = models.CharField(max_length=10, default='Submitted')