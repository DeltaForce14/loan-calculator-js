
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
    // User Input Variables

    const loanValue = parseFloat(loanAmount.value);
    const interestValue = parseFloat(interestPerc.value);
    const yearsToPayValue = parseFloat(paymentYears.value);

    let totalPayment = loanValue + ((loanValue/100*interestValue)*yearsToPayValue);
    let monthlyPayments = (totalPayment/yearsToPayValue)/12;
    let totalInterest =  totalPayment-loanValue;

    //UI outputs

    if(isFinite(monthlyPayments)){
        monthlyPayOut.value = monthlyPayments.toFixed(2);
        totalPayOut.value = totalPayment.toFixed(2);
        totalInterestOut.value = totalInterest.toFixed(2);
        
    }
    else {

        showError("Please check if you entered correct numbers.");
    }

    event.preventDefault();
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
}


