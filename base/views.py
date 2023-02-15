from django.shortcuts import render
from django.http import HttpResponse
from .models import Employee, Vacation
from datetime import datetime, timedelta

# Create your views here.
def firstPage_view(request):
    return render(request, 'index.html')
    
def home_view(request):
    return render(request, 'homepage.html')

def addEmployee_view(request):
    if request.method == 'POST':
        if Employee.objects.filter(id=request.POST.get("id")).count() != 0:
            return HttpResponse("There is an employee with that id already") 
        Employee.objects.create(
            id = request.POST.get("id"),
            name = request.POST.get("name"),
            email = request.POST.get("email"),
            address = request.POST.get("address"),
            phone = request.POST.get("phone"),
            gender = str(request.POST.get("gender")),
            marital = str(request.POST.get("marital")),
            availableVac= request.POST.get("available_vac_days"),
            approvedVac= request.POST.get("approved_vac_days"),
            salary= request.POST.get("salary"),
            dob = request.POST.get("dob")
        )
        return HttpResponse("Employee added successfully")
    return render(request, 'add.html')

def employeeScreen_view(request, pk):
    if Employee.objects.filter(id=pk).count() == 0:
        return render(request, 'empNotFound.html')
    emp = Employee.objects.get(id=pk)
    return render(request, 'employeeScreen.html', {'emp': emp})

def editEmployee_view(request, pk):
    if Employee.objects.filter(id=pk).count() == 0:
        return render(request, 'empNotFound.html')
    emp = Employee.objects.get(id=pk)
    if request.method == 'POST':
        if request.POST.get("action") == 'update':
            emp.id = request.POST.get("id")
            emp.name = request.POST.get("name")
            emp.availableVac = request.POST.get("available_vac_days")
            emp.approvedVac = request.POST.get("approved_vac_days")
            emp.email = request.POST.get("email")
            emp.salary = request.POST.get("salary")
            emp.address = request.POST.get("address")
            emp.dob = request.POST.get("dob")
            emp.phone = request.POST.get("phone")
            emp.gender = str(request.POST.get("gender"))
            emp.marital = str(request.POST.get("marital"))
            emp.save()
            return HttpResponse("Employee info updated") 
        elif request.POST.get("action") == 'erase':
            emp.delete()
    return render(request, 'editInfo.html', {'emp': emp})

def srchEmployee_view(request):
    srch = request.GET.get("srch") if request.GET.get("srch") != None else '' 
    emp = Employee.objects.filter(name__contains=srch)
    return render(request, 'SearchForEmployee.html', {'emps': emp})

def Requestvacation_view(request, pk):
    if Employee.objects.filter(id=pk).count() == 0:
        return render(request, 'empNotFound.html')
    empl = Employee.objects.get(id=pk)
    if request.method == 'POST':
        if Vacation.objects.filter(emp=empl).count() != 0:
            Vacation.objects.filter(emp=empl).delete()
        Vacation.objects.create(
            emp = empl,
            fromDate = request.POST.get("fromDate"),
            toDate = request.POST.get("tDate"),
            reason = request.POST.get("reason")
        )
        return HttpResponse("Vacation request submitted successfully")
    if Vacation.objects.filter(emp=empl).count() == 0:
        status = 'No submitted vacations yet'
    else:
        status = Vacation.objects.get(emp=empl).status
    return render(request, 'submitVacation.html', {'emp':empl, 'status': status})

def vacationReqests_view(request):
    if request.method == 'POST':
        empid = request.POST.get("employeeid")
        emp = Employee.objects.get(id=empid)
        vacrequest = Vacation.objects.get(emp=emp)
        if request.POST.get("state") == "accepted":
            diff = vacrequest.toDate - vacrequest.fromDate
            emp.availableVac = emp.availableVac - diff.days - 1
            emp.approvedVac = emp.approvedVac + diff.days + 1
            vacrequest.status = 'Accepted'
        else:
            vacrequest.status = 'Rejected'
        emp.save()
        vacrequest.save()
    vacs = Vacation.objects.filter(status='Submitted')
    return render(request, 'submittedVacations.html', {'vacs': vacs})