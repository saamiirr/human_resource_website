from django.contrib import admin

# Register your models here.
from .models import Employee, Vacation
admin.site.register(Employee)
admin.site.register(Vacation)