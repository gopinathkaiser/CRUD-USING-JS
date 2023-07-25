let eid = document.getElementById("employeeid");
let ename = document.getElementById("name");
let edesignation = document.getElementById("designation");
let esal = document.getElementById("salary");
let ecity = document.getElementById("city");

let employeeDetails = new Array();


function getDetails() {
   // event.preventDefaultult();
   if(eid.value == "" || ename.value == "" || edesignation.value == "" || esal.value == "" || ecity.value == ""){
        alert("Fill all the fields");
   }else{
    addEmployee();

   }

}


function loading(){
     
    let tempArray = new Array();
    
    for (let employee in localStorage){
        
        s = JSON.parse(JSON.stringify(localStorage.getItem(employee)));
        if(s==null){
            break;
        }
        tempArray = s.split(",");
        employeeDetails.push(tempArray);

        // console.log("local storage " + arr1);
        
    }
    display();
    // arr1 = s.split(",");
    // console.log("local storage " + arr1);

}

function addEmployee() {
    var tempArray = new Array();

    tempArray.push(eid.value);
    tempArray.push(ename.value);
    tempArray.push(edesignation.value);
    tempArray.push(esal.value);
    tempArray.push(ecity.value);
    
    let key = eid.value;
    localStorage.setItem(key,tempArray);
    
    employeeDetails.push(tempArray);
    // console.log("local item" + employeeDetails);
    display();
    document.getElementById("employeeid").value = "";
    document.getElementById("name").value = "";
    document.getElementById("designation").value = "";
    document.getElementById("salary").value = "";
    document.getElementById("city").value = "";


}

function display() {

    
    document.getElementById("table-main").innerHTML = "<tr><th> Employee ID </th> <th> NAME </th> <th>DESIGNATION</th> <th>SALARY</th> <th>CITY</th> <th>ACTIONS</th> </tr>";
    employeeDetails.forEach(employee => {
        let tempArray = [];
        tempArray = employee;
        


        document.getElementById("table-main").innerHTML += `<tr><td>  ${tempArray[0]} </td><td> ${tempArray[1]} </td> <td> ${tempArray[2]} </td><td> ${tempArray[3]} </td> <td> ${tempArray[4]} </td><td> <a href = "#" onclick = "edit(${tempArray[0]})">Edit</a>  <a href = "#" onclick="deleteRow(${tempArray[0]})">Delete </a></td></tr>`;
        
        //console.log(main);
    });



}



function visibleForm() {

    document.getElementById('form-data').style.display = "block";

}

function edit(val) {

    document.getElementById('form-data-update').style.display = "block";
    document.getElementById('form-data').style.display = "none";

    let tempArray = new Array();
    
    let index;
    for(let i=0;i<employeeDetails.length;i++){
        tempArray = employeeDetails[i];
        if(tempArray[0] == val){
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
    // globalValue = ++val;
    //console.log(newArr);
}

function update() {
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

    // let temp = --globalValue;
    let tempArray = new Array();
    let index;
    for(let i=0;i<employeeDetails.length;i++){
        tempArray = employeeDetails[i];
        //console.log("array" + arr2[0] +"e id value" + eid1.value);
        if(tempArray[0] == eidUpdate.value){
            index = i;
            break;
        }
    }

    // console.log("main before update " + main + "index" + index);
    employeeDetails[index] = changedValuesArray;
    // console.log("main after update " + main);
   // console.log(main[temp]);
   localStorage.setItem(eidUpdate.value,changedValuesArray);
    display();
    document.getElementById('form-data-update').style.display = "none";
}

function deleteRow(val) {
    console.log(employeeDetails);
    if(!confirm("Are u sure")){
        return ;
    }
     
    // console.log("index " + val);
    let tempArray = new Array();
   // arr2 = main[val];
    //console.log(main);
    
    let index;
    for(let i=0;i<employeeDetails.length;i++){
        tempArray = employeeDetails[i];
        if(tempArray[0] == val){
            index = i;
            break;
        }
    }
    // console.log("array to be deleted :" + employeeDetails[index] + "val is" + val + "index is " + index);
    employeeDetails.splice(index, 1);
     localStorage.removeItem(val);
    display();
}







