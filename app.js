
// get loan form to listen for submit on calculate btn
const formLoan =document.getElementById("loan-form");

//Input variables
const loanAmount = document.querySelector("#loan-amount-input");
const interestPerc = document.querySelector("#interest-amount-input");
const paymentYears = document.querySelector("#payment-years");

//Output variables
const monthlyPayOut = document.getElementById("monthly-pay");
const totalPayOut = document.getElementById("total-pay");
const totalInterestOut = document.getElementById("total-interest");



loadEventListeners();

function loadEventListeners(){
    // listening for submit on loan form
    formLoan.addEventListener("submit", clickCalcBtn);

};


function clickCalcBtn(event){
    //when the button is reclicked, hide the results
    //when the page is loaded for the first time they are hiden by default via CSS
    document.getElementById('results').style.display = "none";

    // User Input Variables

    const loanValue = parseFloat(loanAmount.value);
    const interestValue = parseFloat(interestPerc.value);
    const yearsToPayValue = parseFloat(paymentYears.value);
    
    // Output calculations
    let monthlyInterestRate = interestValue/100/12;
    let calculatedPayments = yearsToPayValue * 12;

    const monthlyx = Math.pow(1 + monthlyInterestRate, calculatedPayments);
    const monthlyPayments = (loanValue * monthlyx*monthlyInterestRate)/(monthlyx-1);

    //UI outputs

    if(isFinite(monthlyPayments)){
        monthlyPayOut.value = monthlyPayments.toFixed(2);
        totalPayOut.value = (monthlyPayments * calculatedPayments).toFixed(2);
        totalInterestOut.value = ((monthlyPayments * calculatedPayments)-loanValue).toFixed(2);

        document.getElementById('loading').style.display = "block";
        setTimeout(showResults,2000);
    }
    else {
        showError("Please check if you entered correct numbers.");
    }

    event.preventDefault();
}

// Show results function from Timeout 
function showResults(){
    document.getElementById('loading').style.display = "none";
    document.getElementById('results').style.display = "block";
}

function showError(message){

        //create div
        const newDiv = document.createElement('div');
        //add Bootstrap alert class
        newDiv.className = 'alert alert-danger';
        //add textNode
        newDiv.appendChild(document.createTextNode(message));

        //insert into DOM
        const cardBodyUI = document.querySelector(".card-body");
        const headingCardUI = document.querySelector(".heading");
        cardBodyUI.insertBefore(newDiv, headingCardUI);

        //clear error after 3 seconds
        setTimeout(clearError, 3000);
 
};

function clearError(){
    document.querySelector(".alert").remove();
};


