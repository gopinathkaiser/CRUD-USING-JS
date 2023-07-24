let ename = document.getElementById("name");
let edesignation = document.getElementById("designation");
let esal = document.getElementById("salary");
let ecity = document.getElementById("city");
var globalValue = 0;
var sno = 1;
let main = new Array();
let id = 1;

function getDetails() {

    addEmployee();

}

function addEmployee() {
    var arr = new Array();

    arr.push(id);
    arr.push(ename.value);
    arr.push(edesignation.value);
    arr.push(esal.value);
    arr.push(ecity.value);
    id++;

    main.push(arr);
    console.log(main);
    display();
    document.getElementById("name").value = "";
    document.getElementById("designation").value = "";
    document.getElementById("salary").value = "";
    document.getElementById("city").value = "";


}

function display() {

    let did = 1;
    document.getElementById("table-main").innerHTML = "<tr><th> S.NO </th> <th> NAME </th> <th>DESIGNATION</th> <th>SALARY</th> <th>CITY</th> <th>ACTIONS</th> </tr>";
    main.forEach(val => {
        let temp = [];
        temp = val;
        temp[0] = did;


        document.getElementById("table-main").innerHTML += `<tr><td>  ${temp[0]} </td><td> ${temp[1]} </td> <td> ${temp[2]} </td><td> ${temp[3]} </td> <td> ${temp[4]} </td><td> <a href = "#" onclick = "edit(${temp[0]})">Edit</a>  <a href = "#" onclick="deleteRow(${temp[0]})">Delete </a></td></tr>`;
        did++;
    });



}



function visibleForm() {

    document.getElementById('form-data').style.display = "block";

}

function edit(val) {

    document.getElementById('form-data-update').style.display = "block";
    document.getElementById('form-data').style.display = "none";
    let newArr = main[--val];
    document.getElementById("name-1").value = newArr[1];
    document.getElementById("designation-1").value = newArr[2];
    document.getElementById("salary-1").value = newArr[3];
    document.getElementById("city-1").value = newArr[4];
    globalValue = ++val;
    console.log(newArr);
}

function update() {

    let ename1 = document.getElementById("name-1");
    let edesignation1 = document.getElementById("designation-1");
    let esal1 = document.getElementById("salary-1");
    let ecity1 = document.getElementById("city-1");

    let uArray = new Array();
    uArray.push(globalValue);
    uArray.push(ename1.value);
    uArray.push(edesignation1.value);
    uArray.push(esal1.value);
    uArray.push(ecity1.value);

    let temp = --globalValue;

    main[temp] = uArray;

    console.log(main[temp]);
    display();
    document.getElementById('form-data-update').style.display = "none";
}

function deleteRow(val) {
    console.log(main);
    val--;
    console.log("index " + val);
    main.splice(val, 1);
    display();
}







