$( document ).ready( onReady );

// setting up some globals
let employeeSalaries = [];
let countId = 0;

// on document ready, run these functions when this action is taken here
function onReady() {
    $( '#submitInfoButton' ).on( 'click', verification );
    $( '#salaryTable' ).on( 'click', '.deleteButton', removeEmployee );
}

// reinforces the required form textfields before user can submit information
function verification(){
    if( $( '#firstNameInput' ).val() === '' ){
        return alert("Employee's first name is blank");
    }else if( $( '#firstNameInput' ).val() === '' ){
        return alert("Employee's last name is blank");
    }else if( $( '#idNumberInput' ).val() === '' ){
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
    addEmployeeSalary.jobId = $( '#idNumberInput' ).val();
    addEmployeeSalary.jobTitle = $( '#jobTitleInput' ).val();
    addEmployeeSalary.annualSalary = $( '#annualSalaryInput' ).val();
    console.log( addEmployeeSalary );
    employeeSalaries.push( addEmployeeSalary );
    console.log( employeeSalaries )
    displaySalaries();
    emptyInputs();
    countId++
}

// resets the company expense total before looping through the array of employees 
// that are represented as objects, displaying their values on the DOM, and 
// calculating the sum of all employee salaries within the previously mentioned array
function displaySalaries() {
    let companyExpense = 0;
    let el = $( '#salaryTable' );
    el.empty();
    el.append('<tr id="tableHeaders"><th>#</th><th>First Name</th><th>Last Name</th><th>Job ID</th><th>Job Title</th><th>Annual Salary</th><th>Action</th></tr>');
    for( let i=0; i<employeeSalaries.length; i++) {
        companyExpense += eval(employeeSalaries[i].annualSalary)
        // appends new employee information to the table
        el.append('<tr><td>'+employeeSalaries[i].id+'</td><td id="firstName">'+employeeSalaries[i].firstName +'</td><td>'+employeeSalaries[i].lastName+'</td><td>'+employeeSalaries[i].jobId+'</td><td>'+employeeSalaries[i].jobTitle+'</td><td>'
            +employeeSalaries[i].annualSalary+'</td><td><button>Edit</button> <button class="deleteButton" data-id="${i}">Delete</button></td></tr>' );
    };
    el = $('#salaryTotal');
    el.empty();
    el.append('Total Salary Cost: $'+companyExpense);

}

// If the total monthly cost exceeds $20,000, 
// add a red background color to the total monthly cost.

// function timeToBudget() {
//     const limit = 20000;
//     if ( salaryCost > limit ) {
//         document.getElementById=("salaryTotal").style.backgroundColor = 'red';
//     } else {
//         document.getElementById=("salaryTotal").style.backgroundColor = 'initial';
//     }
// }

// Create a delete button that removes an employee from the DOM. 
// For Base mode, it does **not** need to remove that Employee's 
// salary from the reported total.

// onClick="salaryAdjustment(),$(this).parent().parent().remove()"

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

// resets input boxes
function emptyInputs() {
    $( '#firstNameInput' ).val( '' );
    $( '#lastNameInput' ).val( '' );
    $( '#idNumberInput' ).val( '' );
    $( '#jobTitleInput' ).val( '' );
    $( '#annualSalaryInput' ).val( '' );
}