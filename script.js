let eid = document.getElementById("employeeid");
let ename = document.getElementById("name");
let edesignation = document.getElementById("designation");
let esal = document.getElementById("salary");
let ecity = document.getElementById("city");

let EmployeeDetails = new Array();


function getDetails() {
   // event.preventDefaultult();
   if(eid.value == "" || ename.value == "" || edesignation.value == "" || esal.value == "" || ecity.value == ""){
        alert("Fill all the fields");
   }else{
    addEmployee();

   }

}


function loading(){
     
    let arr1 = new Array();
    let a = 12;
    let s = JSON.parse(JSON.stringify(localStorage.getItem(a)));
    for (e in localStorage){
        
        s = JSON.parse(JSON.stringify(localStorage.getItem(e)));
        if(s==null){
            break;
        }
        arr1 = s.split(",");
        main.push(arr1);

        console.log("local storage " + arr1);
        
    }
    display();
    // arr1 = s.split(",");
    // console.log("local storage " + arr1);

}

function addEmployee() {
    var arr = new Array();

    arr.push(eid.value);
    arr.push(ename.value);
    arr.push(edesignation.value);
    arr.push(esal.value);
    arr.push(ecity.value);
    
    let key = eid.value;
    localStorage.setItem(key,arr);
    
    main.push(arr);
    console.log("local item" + main);
    display();
    document.getElementById("employeeid").value = "";
    document.getElementById("name").value = "";
    document.getElementById("designation").value = "";
    document.getElementById("salary").value = "";
    document.getElementById("city").value = "";


}

function display() {

    let did = 1;
    document.getElementById("table-main").innerHTML = "<tr><th> Employee ID </th> <th> NAME </th> <th>DESIGNATION</th> <th>SALARY</th> <th>CITY</th> <th>ACTIONS</th> </tr>";
    main.forEach(val => {
        let temp = [];
        temp = val;
        


        document.getElementById("table-main").innerHTML += `<tr><td>  ${temp[0]} </td><td> ${temp[1]} </td> <td> ${temp[2]} </td><td> ${temp[3]} </td> <td> ${temp[4]} </td><td> <a href = "#" onclick = "edit(${temp[0]})">Edit</a>  <a href = "#" onclick="deleteRow(${temp[0]})">Delete </a></td></tr>`;
        did++;
        //console.log(main);
    });



}



function visibleForm() {

    document.getElementById('form-data').style.display = "block";

}

function edit(val) {

    document.getElementById('form-data-update').style.display = "block";
    document.getElementById('form-data').style.display = "none";

    let arr2 = new Array();
    
    let index;
    for(let i=0;i<main.length;i++){
        arr2 = main[i];
        if(arr2[0] == val){
            index = i;
            break;
        }
    }

    let newArr = main[index];
    document.getElementById("employeeIdUpdate").value = newArr[0];
    document.getElementById("employeeNameUpdate").value = newArr[1];
    document.getElementById("employeeDesignationUpdate").value = newArr[2];
    document.getElementById("employeeSalaryUpdate").value = newArr[3];
    document.getElementById("employeeCityUpdate").value = newArr[4];
    // globalValue = ++val;
    //console.log(newArr);
}

function update() {
    let eid1 = document.getElementById("employeeIdUpdate");
    let ename1 = document.getElementById("employeeNameUpdate");
    let edesignation1 = document.getElementById("employeeDesignationUpdate");
    let esal1 = document.getElementById("employeeSalaryUpdate");
    let ecity1 = document.getElementById("employeeCityUpdate");

    let uArray = new Array();
    uArray.push(eid1.value);
    uArray.push(ename1.value);
    uArray.push(edesignation1.value);
    uArray.push(esal1.value);
    uArray.push(ecity1.value);

    // let temp = --globalValue;
    let arr2 = new Array();
    let index;
    for(let i=0;i<main.length;i++){
        arr2 = main[i];
        //console.log("array" + arr2[0] +"e id value" + eid1.value);
        if(arr2[0] == eid1.value){
            index = i;
            break;
        }
    }

    // console.log("main before update " + main + "index" + index);
    main[index] = uArray;
    // console.log("main after update " + main);
   // console.log(main[temp]);
   localStorage.setItem(eid1.value,uArray);
    display();
    document.getElementById('form-data-update').style.display = "none";
}

function deleteRow(val) {
    console.log(main);
    if(!confirm("Are u sure")){
        return ;
    }
     
    console.log("index " + val);
    let arr2 = new Array();
   // arr2 = main[val];
    //console.log(main);
    
    let index;
    for(let i=0;i<main.length;i++){
        arr2 = main[i];
        if(arr2[0] == val){
            index = i;
            break;
        }
    }
    console.log("array to be deleted :" + main[index] + "val is" + val + "index is " + index);
     main.splice(index, 1);
     localStorage.removeItem(val);
    display();
}







