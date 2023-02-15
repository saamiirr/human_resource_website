function validVacation(form) {
    if(form.tDate.value == ""){
        alert("Input from date");
        return false;
    }
    if(form.fromDate.value == ""){
        alert("Input to date");
        return false;
    }
    var toDate = new Date(form["tDate"].value);
    var fromDate = new Date(form["fromDate"].value);
    var vacDays = toDate.getTime() - fromDate.getTime();
    vacDays /= (1000 * 60 * 60 * 24);
    var remain = document.getElementById("remaining").innerHTML;
    var remaindays = parseInt(remain)
    if (vacDays + 1 > remaindays) { 
        alert("Available Vacation days Exceeded");
    } else if (vacDays + 1 < 1) {
        alert('"From" Date must be smaller than "To" Date!');
    } else {
        return true;
    }
    return false;
}
function checkform(form) {

    if (form.name.value == "") {
        alert("Erorr : You must enter Employee's name ");
        form.name.focus();
        return false;
    }
    re = /[0-9]/;
    if (re.test(form.name.value)) {
        alert("Erorr :  Employee's name must contain no numbers ");
        form.name.focus();
        return false;

    }
    if (form.id.value == "") {
        alert("Erorr : You must enter Employee's ID");
        form.id.focus();
        return false;
    }
    re = /[a-z]/;
    if (re.test(form.id.value)) {
        alert("Erorr :  Employee's ID must contain numbers only");
        form.id.focus();
        return false;
    }
    if (form.email.value == "") {
        alert("Erorr : You must enter Employee's Email");
        form.email.focus();
        return false;
    }
    re = /[@]/;
    if (!re.test(form.email.value)) {
        alert("Erorr :  Employee's email must contain @");
        form.email.focus();
        return false;

    }
    if (form.address.value == "") {
        alert("Erorr : You must enter Employee's Address");
        form.address.focus();
        return false;

    }
    if (form.phone.value == "") {
        alert("Erorr : You must enter Employee's Phone number");
        form.address.focus();
        return false;

    }
    re = /[a-z]/;
    if (re.test(form.phone.value)) {
        alert("Erorr :  Employee's phone number must contain only numbers");
        form.phone.focus();
        return false;

    }
    if (form.gender.value == "") {
        alert("Erorr : You must enter Employee's gender");
        form.gender.focus();
        return false;
    }
    if (form.marital.value == "") {
        alert("Erorr : You must enter Employee's marital status");
        form.marital.focus();
        return false;
    }
    if (form.available_vac_days.value == ""){
        alert("Erorr : You must enter Employee's available vacation days");
        form.available_vac_days.focus();
        return false;
    }
    if (form.approved_vac_days.value == "") {
        alert("Erorr : You must enter Employee's approved vacation days");
        form.approved_vac_days.focus();
        return false;
    }
    if (form.salary.value == "") {
        alert("Erorr : You must enter Employee's salary");
        form.salary.focus();
        return false;
    }
    if (form.dob.value == "") {
        alert("Erorr : You must enter Employee's date of birth");
        form.dob.focus();
        return false;
    }
    return true;
}
function accept(x){
    var d = x.parentNode.parentNode;
    var xhr = new XMLHttpRequest();
    var id = d.getElementsByTagName("td")[0].innerHTML;
    var parm = "state=accepted&employeeid="+id;
    xhr.open("POST", '/vacationrequests', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(parm);
    xhr.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            d.parentNode.deleteRow(d.rowIndex);
        }
    }
}
function reject(x){
    var d = x.parentNode.parentNode;
    var xhr = new XMLHttpRequest();
    var id = d.getElementsByTagName("td")[0].innerHTML;
    var parm = "state=rejected&employeeid="+id;
    xhr.open("POST", '/vacationrequests', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(parm);
    xhr.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            d.parentNode.deleteRow(d.rowIndex);
        }
    }
}
function erase(id){
    var xhr = new XMLHttpRequest();
    var parm = "action=erase&id="+id;
    var url = '/editemployee/'+id
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(parm);
    xhr.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            document.getElementById("editmain").innerHTML = "This employee no longer exists";
        }
    }
}
function deleteEmp() {
    if (confirm("Are you SURE you want to delete this employee?") == true) {
        erase(document.getElementById("id").value);
    }
}
function addEmp(){
    var form = document.forms["addform"];
    if (checkform(form) == false){
        return;
    }
    var xhr = new XMLHttpRequest();
    var parm = "id="+form["id"].value+"&";
    parm += "name="+form["name"].value+"&";
    parm += "available_vac_days="+form["available_vac_days"].value+"&";
    parm += "approved_vac_days="+form["approved_vac_days"].value+"&";
    parm += "email="+form["email"].value+"&";
    parm += "address="+form["address"].value+"&";
    parm += "phone="+form["phone"].value+"&";
    parm += "gender="+form["gender"].value+"&";
    parm += "marital="+form["marital"].value+"&";
    parm += "salary="+form["salary"].value+"&";
    parm += "dob="+form["dob"].value+"&";
    xhr.open("POST", '/add', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(parm);
    xhr.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            alert(xhr.responseText);
            location.reload();
        }
    }
}
function editEmp(){
    var form = document.forms["editform"];
    if (checkform(form) == false){
        return;
    }
    var xhr = new XMLHttpRequest();
    var parm = "action=update&";
    parm += "id="+form["id"].value+"&";
    parm += "name="+form["name"].value+"&";
    parm += "available_vac_days="+form["available_vac_days"].value+"&";
    parm += "approved_vac_days="+form["approved_vac_days"].value+"&";
    parm += "email="+form["email"].value+"&";
    parm += "address="+form["address"].value+"&";
    parm += "phone="+form["phone"].value+"&";
    parm += "gender="+form["gender"].value+"&";
    parm += "marital="+form["marital"].value+"&";
    parm += "salary="+form["salary"].value+"&";
    parm += "dob="+form["dob"].value+"&";
    var url = '/editemployee/'+form["id"].value;
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(parm);
    xhr.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            alert(xhr.responseText);
            var url = '/screen/' + form["id"].value;
            location.replace(url);
        }
    }
}
function vacrequest(){
    var form = document.forms["vacation"];
    if (validVacation(form) == false){
        return;
    }
    var xhr = new XMLHttpRequest();
    var parm = "id="+form["id"].value+"&";
    parm += "fromDate="+form["fromDate"].value+"&";
    parm += "tDate="+form["tDate"].value+"&";
    parm += "reason="+form["reason"].value;
    var url = '/requestvacation/'+ form["id"].value;
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(parm);
    xhr.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            alert(xhr.responseText);
            location.reload();
        }
    }
}