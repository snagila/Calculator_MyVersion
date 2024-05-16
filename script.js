const buttons = document.querySelectorAll(".btn");
const displayElm = document.querySelector(".display");
let strToDisplay = "";
const operators = ["%", "+", "-", "/", "*"];

const display = (str) => {
  displayElm.innerText = str || "0";
};

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.innerText;
    buttonAction(value);
  });
});

const total = () => {
  const ttl = eval(strToDisplay);
  strToDisplay = ttl.toString();
  display(ttl);
};

const buttonAction = (value) => {
  if (value === "AC") {
    strToDisplay = "";
    display();
    return;
  }
  if (value === "C") {
    strToDisplay = strToDisplay.substring(0, strToDisplay.length - 1);
    display(strToDisplay);
    return;
  }
  if (value === "=") {
    const lastCharacter = strToDisplay[strToDisplay.length - 1];
    if (operators.includes(lastCharacter)) {
      strToDisplay = strToDisplay.slice(0, -1);
    }
    total();
    return;
  }

  strToDisplay += value;
  display(strToDisplay);
};
