// 1. Selecting DOM elements and naming variables
const buttons = document.querySelectorAll(".btn");
const displayElm = document.querySelector(".display");
const operators = ["%", "+", "-", "/", "*"];

let strToDisplay = "";
let lastOperator = "";

// 4. Main display function
const display = (str) => {
  displayElm.innerText = str || "0";
};

//  2. extracting the button values
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.innerText;
    buttonAction(value);
  });
});

// 3. Total calculating function
const total = () => {
  const ttl = eval(strToDisplay);
  strToDisplay = ttl.toString();
  display(ttl);
};

// 5. ButtonAction function to add conditions required for the operations (Passed the button value as a Parameter)
const buttonAction = (value) => {
  //  I. Making AC btn work
  if (value === "AC") {
    strToDisplay = "";
    display();
    return;
  }
  // II. Making C btn work
  if (value === "C") {
    strToDisplay = strToDisplay.substring(0, strToDisplay.length - 1);
    display(strToDisplay);
    return;
  }

  // III. Getting "=" to perform calcualtion
  if (value === "=") {
    // a. Getting rid of operator in the end
    const lastCharacter = strToDisplay[strToDisplay.length - 1];
    if (operators.includes(lastCharacter)) {
      strToDisplay = strToDisplay.slice(0, -1);
    }

    // b. Getting rid of /,*,% in the beginning of the main display string
    const searchstring = strToDisplay[0];
    if (["/", "*", "%"].includes(searchstring)) {
      strToDisplay = strToDisplay.slice(1);
    }

    total();

    // c. Disregarding the value of 0/0= NaN in the display
    if (strToDisplay.includes("NaN")) {
      strToDisplay = "";
      return;
    }

    return;
  }

  // IV. Operator is clicked(Not letting two operators simultaneously)
  if (operators.includes(value)) {
    lastOperator = value;
    const lc = strToDisplay[strToDisplay.length - 1];
    if (operators.includes(lc)) {
      strToDisplay = strToDisplay.slice(0, -1);
    }
  }

  // V.  Handing multiple "." in the equation
  if (value === ".") {
    const lastOperatorIndex = strToDisplay.lastIndexOf(lastOperator);
    const lastNumberSet = strToDisplay.slice(lastOperatorIndex);
    console.log(lastOperatorIndex);
    console.log(lastNumberSet);

    if (lastNumberSet.includes(".")) {
      return;
    }
    if (!lastOperator && strToDisplay.includes(".")) {
      return;
    }
  }

  strToDisplay += value;
  display(strToDisplay);
};

//6. adding the keypress event
document.addEventListener("keypress", (e) => {
  const value = e.key;
  if (e.code.includes("Key")) {
    return;
  }

  buttonAction(value);
});
