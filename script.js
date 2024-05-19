const buttons = document.querySelectorAll(".btn");
const displayElm = document.querySelector(".display");
const operators = ["%", "+", "-", "/", "*"];

let strToDisplay = "";
let lastOperator = "";

// main display function
const display = (str) => {
  displayElm.innerText = str || "0";
};

// extracting the button values
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.innerText;
    buttonAction(value);
  });
});

// total calculating function
const total = () => {
  const ttl = eval(strToDisplay);
  strToDisplay = ttl.toString();
  display(ttl);
};

const buttonAction = (value) => {
  // making AC btn work
  if (value === "AC") {
    strToDisplay = "";
    display();
    return;
  }
  // making C btn work
  if (value === "C") {
    strToDisplay = strToDisplay.substring(0, strToDisplay.length - 1);
    display(strToDisplay);
    return;
  }
  if (value === "=") {
    // getting rid of operator in the end
    const lastCharacter = strToDisplay[strToDisplay.length - 1];
    if (operators.includes(lastCharacter)) {
      strToDisplay = strToDisplay.slice(0, -1);
    }

    total();
    // disregarding the value of 0/0= NaN in the display

    if (strToDisplay.includes("NaN")) {
      strToDisplay = "";
      return;
    }

    return;
  }

  // operator is clicked
  if (operators.includes(value)) {
    lastOperator = value;
    const lc = strToDisplay[strToDisplay.length - 1];
    if (operators.includes(lc)) {
      strToDisplay = strToDisplay.slice(0, -1);
    }
  }

  // handing multiple "." in the equation
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
