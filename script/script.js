"use strict";

//elements
const billInputEl = document.getElementById("bill");
const personInputEl = document.getElementById("people-input");
const tipInputEl = document.querySelectorAll(".tip-percentage");
const customInputEl = document.getElementById("custom-input");
const amountEl = document.getElementById("amount");
const totalEl = document.getElementById("total");
const btnReset = document.getElementById("btn-reset");
const errorEl = document.getElementById("error");

//global variables
let bill, persons, tipPercent;

//functions
function init() {
  bill = 0;
  persons = 0;
  tipPercent = 0;

  personInputEl.value = null;
  billInputEl.value = null;
  customInputEl.value = null;

  amountEl.innerText = `$0.00`;
  totalEl.innerText = `$0.00`;
}

function calBills(tipPercent) {
  //converting all inputs in number
  bill = Number(billInputEl.value);
  persons = Number(personInputEl.value);

  //showing error msg
  if (persons === 0) {
    errorEl.style.display = "block";
    personInputEl.style.border = "2px solid orangered";

    amountEl.innerText = `$0.00`;
    totalEl.innerText = `$0.00`;
  }
  //else calculate the inputs
  else {
    //calculation
    const totalTip = bill * tipPercent;
    const totalBill = bill + totalTip;
    const tipPerPerson = totalTip / persons;
    const billPerPerson = totalBill / persons;

    //if we re-enter the value >0
    errorEl.style.display = "none";
    personInputEl.style.border = "2px solid var(--clr-Strong-cyan)";
    billInputEl.style.border = "2px solid var(--clr-Strong-cyan)";

    //showing output
    amountEl.innerText = "$" + tipPerPerson.toFixed(2);
    totalEl.innerText = "$" + billPerPerson.toFixed(2);

    personInputEl.value = null;
    billInputEl.value = null;
  }
}

//event listners
//tipinput buttons
for (let i = 0; i < tipInputEl.length; i++) {
  tipInputEl[i].addEventListener("click", function () {
    tipPercent = Number(this.value) / 100;

    calBills(tipPercent);
  });
}

//custom tip
customInputEl.addEventListener("change", function () {
  tipPercent = Number(this.value) / 100;
  this.value = null;
  calBills(tipPercent);
});

//btn reset
btnReset.addEventListener("click", function () {
  errorEl.style.display = "none";
  personInputEl.style.border = "none";
  init();
  billInputEl.style.border = "none";
  init();
});

init();
