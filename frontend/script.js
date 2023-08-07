

let eid = document.getElementById("id");
let ename = document.getElementById("name");
let edesignation = document.getElementById("designation");
let esal = document.getElementById("salary");
let ecity = document.getElementById("city");

let employeeDetails = new Array();


function getDetails() {
    if (eid.value == "" || ename.value == "" || edesignation.value == "" || esal.value == "" || ecity.value == "") {
        alert("Fill all the fields");
    } else {
        addEmployee();

    }

}


function onRefresh() {

    let tempArray = new Array();

    for (let employee in localStorage) {

        let jsonString = JSON.parse(JSON.stringify(localStorage.getItem(employee)));
        if (jsonString == null) {
            break;
        }
        tempArray = jsonString.split(",");
        employeeDetails.push(tempArray);


    }
    displayEmployees();

}

function addEmployee() {
    var tempArray = new Array();

    tempArray.push(eid.value);
    tempArray.push(ename.value);
    tempArray.push(edesignation.value);
    tempArray.push(esal.value);
    tempArray.push(ecity.value);

    let key = eid.value;
    localStorage.setItem(key, tempArray);

    employeeDetails.push(tempArray);
    displayEmployees();
    document.getElementById("employeeid").value = "";
    document.getElementById("name").value = "";
    document.getElementById("designation").value = "";
    document.getElementById("salary").value = "";
    document.getElementById("city").value = "";


}

function displayEmployees() {

    document.getElementById("table-main").innerHTML = "<tr><th> Employee ID </th> <th> NAME </th> <th>DESIGNATION</th> <th>SALARY</th> <th>CITY</th> <th>ACTIONS</th> </tr>";
    employeeDetails.forEach(employee => {
        let tempArray = [];
        tempArray = employee;
        document.getElementById("table-main").innerHTML += `<tr><td>  ${tempArray[0]} </td><td> ${tempArray[1]} </td> <td> ${tempArray[2]} </td><td> ${tempArray[3]} </td> <td> ${tempArray[4]} </td><td> <a href = "#" onclick = "editEmployeeList(${tempArray[0]})">Edit</a>  <a href = "#" onclick="deleteEmployeeList(${tempArray[0]})">Delete </a></td></tr>`;

    });
}



function visibleForm() {

    document.getElementById('form-data').style.display = "block";
}

function editEmployeeList(val) {

    document.getElementById('form-data-update').style.display = "block";
    document.getElementById('form-data').style.display = "none";

    let tempArray = new Array();

    let index;
    for (let i = 0; i < employeeDetails.length; i++) {
        tempArray = employeeDetails[i];
        if (tempArray[0] == val) {
            index = i;
            break;
        }
    }

    let updatedArr = employeeDetails[index];
    document.getElementById("employeeIdUpdate").value = updatedArr[0];
    document.getElementById("employeeNameUpdate").value = updatedArr[1];
    document.getElementById("employeeDesignationUpdate").value = updatedArr[2];
    document.getElementById("employeeSalaryUpdate").value = updatedArr[3];
    document.getElementById("employeeCityUpdate").value = updatedArr[4];
}

function updateEmployeeDetails() {

    let eidUpdate = document.getElementById("employeeIdUpdate");
    let enameUpdate = document.getElementById("employeeNameUpdate");
    let edesignationUpdate = document.getElementById("employeeDesignationUpdate");
    let esalUpdate = document.getElementById("employeeSalaryUpdate");
    let ecityUpdate = document.getElementById("employeeCityUpdate");

    let changedValuesArray = new Array();
    changedValuesArray.push(eidUpdate.value);
    changedValuesArray.push(enameUpdate.value);
    changedValuesArray.push(edesignationUpdate.value);
    changedValuesArray.push(esalUpdate.value);
    changedValuesArray.push(ecityUpdate.value);


    let tempArray = new Array();
    let index;
    for (let i = 0; i < employeeDetails.length; i++) {
        tempArray = employeeDetails[i];
        if (tempArray[0] == eidUpdate.value) {
            index = i;
            break;
        }
    }

    employeeDetails[index] = changedValuesArray;
    localStorage.setItem(eidUpdate.value, changedValuesArray);
    displayEmployees();
    document.getElementById('form-data-update').style.display = "none";

}

function deleteEmployeeList(val) {

     console.log(employeeDetails);
    if (!confirm("Are u sure")) {
        return;
    }

    let tempArray = new Array();

    let index;
    for (let i = 0; i < employeeDetails.length; i++) {
        tempArray = employeeDetails[i];
        if (tempArray[0] == val) {
            index = i;
            break;
        }
    }
    employeeDetails.splice(index, 1);
    localStorage.removeItem(val);
    displayEmployees();
}

function authenticate1(){
    const formData = {
        id : document.querySelector('[name="id"]').value,
        name: document.querySelector('[name="name"]').value,
        designation : document.querySelector('[name="designation"]').value,
        salary : document.querySelector('[name = "salary"]').value,
        city : document.querySelector('[name = "city"]').value
    };

    fetch('/insert', {
        method : 'POST',
        headers : {
                'Content-Type' : 'application/json',
        },
        body : JSON.stringify(formData),
    })

    .then(response => response.json())
    .then(data => {
        alert("success");
        console.log("success", data);
    })

    .catch(error => {
        console.log(error);
    });
}
  






