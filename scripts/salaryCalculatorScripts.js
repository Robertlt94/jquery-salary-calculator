$( document ).ready( onReady );

// setting up some globals
let employeeSalaries = [];
let countId = 0;
let companyBudget = 0;
let companyExpense = 0;

// on document ready, run these functions when this action is taken here
function onReady() {
    $( '#submitInfoButton' ).on( 'click', verification );
    $( '#salaryTable' ).on( 'click', '.deleteButton', removeEmployee );
    $( '#salaryTable' ).on('click', '.openEditButton', openEditPopup );
    $( '#setBudgetButton' ).on('click', setBudget );
}

// sets the company's budget
function setBudget(){
    companyBudget = prompt("What is your company's budget?");
    if( /^[0-9.,]+$/.test(companyBudget)){
    let el = $('#companyBudget');
    el.empty();
    el.append('Budget: $'+companyBudget);
    budgetTracker();
    }else{
        alert('Please use only numbers');
        companyBudget = prompt("What is your company's budget?");
    }
}

// reinforces the required form textfields before user can submit information
function verification(){
    if( $( '#firstNameInput' ).val() === '' ){
        return alert("Employee's first name is blank");
    }else if( $( '#firstNameInput' ).val() === '' ){
        return alert("Employee's last name is blank");
    }else if( $( '#jobIdInput' ).val() === '' ){
        return alert("Employee's id number is blank");
    }else if( $( '#jobTitleInput' ).val() === '' ){
        return alert("Employee's job title is blank");
    }else if( $( '#annualSalaryInput' ).val() === '' ){
        return alert("Employee's salary is blank");
    }else{
        newSalary();
    }
}

// collects submitted data as a object, pushes object into a new array, before the DOM is maniuplated to display the values
function newSalary() {
    let addEmployeeSalary = {};
    addEmployeeSalary.id = countId;
    addEmployeeSalary.firstName = $( '#firstNameInput' ).val();
    addEmployeeSalary.lastName = $( '#firstNameInput' ).val();
    addEmployeeSalary.jobId = $( '#jobIdInput' ).val();
    addEmployeeSalary.jobTitle = $( '#jobTitleInput' ).val();
    addEmployeeSalary.annualSalary = $( '#annualSalaryInput' ).val();
    console.log( addEmployeeSalary );
    employeeSalaries.push( addEmployeeSalary );
    console.log( employeeSalaries )
    displaySalaries();
    emptyInputs();
    countId++
}

// resets input boxes
function emptyInputs() {
    $( '#firstNameInput' ).val( '' );
    $( '#lastNameInput' ).val( '' );
    $( '#jobIdInput' ).val( '' );
    $( '#jobTitleInput' ).val( '' );
    $( '#annualSalaryInput' ).val( '' );
}

// resets the company expense total before looping through the array of employees 
// that are represented as objects, displaying their values on the DOM, and 
// calculating the sum of all employee salaries within the previously mentioned array
function displaySalaries() {
    companyExpense = 0;
    let el = $( '#salaryTable' );
    el.empty();
    el.append('<tr id="tableHeaders"><th>#</th><th>First Name</th><th>Last Name</th><th>Job ID</th><th>Job Title</th><th>Annual Salary</th><th>Action</th></tr>');
    for( let i=0; i<employeeSalaries.length; i++) {
        companyExpense += eval(employeeSalaries[i].annualSalary)
        // appends new employee information to the table
        el.append('<tr><td>'+employeeSalaries[i].id+'</td><td>'+employeeSalaries[i].firstName +'</td><td>'+employeeSalaries[i].lastName+'</td><td>'+employeeSalaries[i].jobId+'</td><td>'+employeeSalaries[i].jobTitle+'</td><td>'
            +employeeSalaries[i].annualSalary+'</td><td><button class="openEditButton">Edit</button> <button class="deleteButton">Delete</button></td></tr>' );
    };
    el = $('#salaryTotal');
    el.empty();
    el.append(companyExpense);
    budgetTracker();
}

// Changes the CSS of the total according to the company budget.
function budgetTracker() {
    console.log('in budgetTracker');
    if(companyBudget === 0){
        return;
    }else{
        if ( companyExpense > companyBudget ) {
            document.getElementById("salaryTotal").style.color = 'red';
        } else {
            document.getElementById("salaryTotal").style.color = 'initial';
        }
    }
}

// removes data from array and from the DOM
function removeEmployee(){
    console.log('in removeEmployee');
    // $(this).parent().parent(); removes table row, but does not adjust total cost value
    let currentData = $(this).closest('tr');
    // currentData holds the values for the elements and values within the closest Table Row where the delete button was clicked
    let dataId = currentData.find('td:eq(0)').text();
    // dataId holds the value for the first set of table data, with the next set being 'td:eq(1)' and so forth
    let index = employeeSalaries.findIndex(i => i.id == dataId);
    // index finds the index of the selected table data within the employeeSalaries array so that it can be removed
    // console.log(dataId);
    // console.log(index);
    employeeSalaries.splice(index, 1);
    displaySalaries();
}

// allows the user to edit information that was previously submitted according to their selection from the table
function openEditPopup(){
    console.log('in edit information');
    let editData = $(this).closest('tr');
    let dataId = editData.find('td:eq(0)').text();
    let index = employeeSalaries.findIndex(i => i.id == dataId);
    let el = $('#editPopup');
    el.empty();
    let editFirstName = employeeSalaries[index].firstName;
    let editLastName = employeeSalaries[index].lastName;
    let editJobId = employeeSalaries[index].jobId;
    let editJobTitle = employeeSalaries[index].jobTitle;
    let editAnnualSalary = employeeSalaries[index].annualSalary;
    el.append("<h2>Edit</h2><table id='editTable'><tr><td><p>First Name: </p><input type='text' value="+editFirstName+" id='editFirstName' required /></td><td><p>Last Name: </p><input type='text' value="+editLastName+" id='editLastName' required /></td><td><p>Job ID: </p><input type='number' value="+editJobId+" id='editJobId' required /></td><td><p>Job Title: </p><input text='text' value="+editJobTitle+" id='editJobTitle' required /></td><td><p>Annual Salary: </p><input type='number' value="+editAnnualSalary+" id='editAnnualSalary' required /></td></table> <br> <button onClick={closePopupEditor()}>Cancel</button><button id='submitEditsButton' onClick={submitEdits("+index+")}>Update</button>");
    document.getElementById("editPopup").style.display="block";
}

function closePopupEditor(){
    document.getElementById('editPopup').style.display='none';
}

function submitEdits(index){
    employeeSalaries[index].firstName = $( '#editFirstName' ).val();
    employeeSalaries[index].lastName = $( '#editLastName' ).val();
    employeeSalaries[index].jobId = $( '#editJobId' ).val();
    employeeSalaries[index].jobTitle = $( '#editJobTitle' ).val();
    employeeSalaries[index].annualSalary = $( '#editAnnualSalary' ).val();
    closePopupEditor();
    displaySalaries();
}