$( document ).ready( onReady );
let employeeSalaries = []

// input form that collects
// employee first name, 
// last name, 
// ID number, 
// job title, 
// annual salary_.

// A 'Submit' button should collect the form information, 
// store the information to calculate monthly costs,
// append information to the DOM 
// and clear the input fields. 

function onReady() {
    $( '#submitInfoButton' ).on( 'click', newSalary);
    $( '#displaySalaries' ).on( 'click', '.removeEmployeeData', removeInfo );
 }

// Using the stored information, calculate monthly costs 
// and append this to the to DOM. 

function newSalary() {
    let addEmployeeSalary = {};
    addEmployeeSalary.firstName = $( '#firstNameInput' ).val();
    addEmployeeSalary.lastName = $( '#lastNameInput' ).val();
    addEmployeeSalary.idNumber = $( '#idNumberInput' ).val();
    addEmployeeSalary.jobTitle = $( '#jobTitleInput' ).val();
    addEmployeeSalary.annualSalary = $( '#annualSalaryInput' ).val();
    console.log( addEmployeeSalary );
    employeeSalaries.push( addEmployeeSalary );
    console.log( employeeSalaries )
    displaySalaries();
    emptyInputs();
}

function displaySalaries() {
    let el = $( '#displaySalaries' );
    el.empty();
    let salaries = 0;
    for( let i=0; i<employeeSalaries.length; i++) {
      // appends new total value to monthly salary cost
      el.append('<li>' + employeeSalaries[i].firstName + ' ' + employeeSalaries[i].lastName + ' ' + employeeSalaries[i].idNumber + ' ' + employeeSalaries[i].jobTitle + ' ' 
      + employeeSalaries[i].annualSalary + ' ' + '<button class="removeEmployeeData">Delete</button></li>' );
      salaries += Number( employeeSalaries[i].annualSalary );
    }
    // appends new total value to monthly salary cost
    el = $( '#salaryTotal' );
    el.empty();
    el.append( 'Cost: ' + salaries );
    timeToBudget;
}

// If the total monthly cost exceeds $20,000, 
// add a red background color to the total monthly cost.

function timeToBudget() {
    const limit = 20000;
    if ( salaries > limit ) {
        document.getElementById=("salaryTotal").style.backgroundColor = 'red';
    } else {
        document.getElementById=("salaryTotal").style.backgroundColor = 'initial';
    }
}

// Create a delete button that removes an employee from the DOM. 
// For Base mode, it does **not** need to remove that Employee's 
// salary from the reported total.

function removeInfo() {
    $( this ).parent().fadeOut( 1000 );
}

// resets input boxes
function emptyInputs() {
    $( '#firstNameInput' ).val( '' );
    $( '#lastNameInput' ).val( '' );
    $( '#idNumberInput' ).val( '' );
    $( '#jobTitleInput' ).val( '' );
    $( '#annualSalaryInput' ).val( '' );
}