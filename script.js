// let input = document.getElementById('input');
// window.addEventListener('load',()=>{
//    input.textContent = '';
// })

// let numbers = document.querySelectorAll('.numbers div');
// let operators = document.querySelectorAll('.operators div');
// let result = document.getElementById('result');
// let clear = document.getElementById('clear');

// let resultDisplayed = false;


// for (const num of numbers) {
//     if (num.getAttribute('id') == 'clear') {
//         num.addEventListener('click',()=>{
//             input.textContent = '';
//         })
//     }else{
//         num.addEventListener('click',()=>{
//             input.textContent += num.textContent;
//         })
//     }
   
// }
// for (const oper of operators) {
//     oper.addEventListener('click',()=>{
//         input.textContent += oper.textContent;
//     })
// }

// result.addEventListener('click',calculate)
// function calculate() {
//     let inputvalue = input.innerHTML;
//     console.log(inputvalue);
//     //  const tokens = inputvalue.match(/\d|\S/g);

//     //The regular expression (\d+(\.\d+)?)|(\S) matches either a number with an optional decimal part or any non-space character (operators)
//     // const tokens = inputvalue.match(/(\d+(\.\d+)?)|(\S)/g);
//     // const tokens = inputvalue.match(/(\d+)|(\S)/g);
//      // Split the expression into individual tokens (numbers with optional signs and operators)
//     //  const tokens = inputvalue.match(/([-+]?(\d+(\.\d+)?|\.\d+))|(\S)/g);
//      // Split the expression into individual tokens (numbers and operators)
//     const tokens = inputvalue.match(/\d+(\.\d+)?|[+\-*/]/g);
//      let result =  parseFloat(tokens[0]);//the first number in the tokens array
//      let val;
//      let i = 1
//         do {
//             for (; i < tokens.length; i+=2) {
//                 const operator = tokens[i];
//                     const operand = parseFloat(tokens[i+1]);
//             switch (operator) {
//                 case '+':
//                     val = result + operand;
//                     break;
//                     case '-':
//                         val = result - operand;
//                     break;
              
//                 default:
//                     break;
//               }
//             }
//         } while (i<tokens.length){
//            result = val;
//            switch (operator) {
//             case '+':
//                 val = result + operand;
//                 break;
//                 case '-':
//                     val = result - operand;
//                 break;
          
//             default:
//                 break;
//           }
//         }
         
          

          
//         //   const operand = parseFloat(tokens[i+1]);
//         //   console.log(operator);
//         //   console.log(operand);
//           // If the operator is an operator, store it for the next calculation
//     // if (operator.match(/[+\-*]/)) {
//     //     currentOperator = operator;
//     //     console.log(currentOperator);
//     // }else{
//     //     //If the operator is a number, perform the operation based on the previous operator
//     //     const number = parseFloat(operator)
    
        
//     //       switch (currentOperator) {
//     //         case '+':
//     //             result+=number;
//     //             break;
//     //       case '-':
//     //         result -= number;
//     //         case '*':
//     //             result*=number;
//     //             case '/':
//     //                 result /= number;
//     //         default:
//     //             throw new Error('invalid operator');
//     //       }
//     //}
//     input.textContent = '';
//     input.textContent = val;
    
// }


"use strict";



var input = document.getElementById('input'), // input/output button
  number = document.querySelectorAll('.numbers div'), // number buttons
  operator = document.querySelectorAll('.operators div'), // operator buttons
  result = document.getElementById('result'), // equal button
  clear = document.getElementById('clear'), // clear button
  resultDisplayed = false; // flag to keep an eye on what output is displayed


  window.addEventListener('load',()=>{
    input.innerHTML = '';
  })


// adding click handlers to number buttons
for (var i = 0; i < number.length; i++) {
  number[i].addEventListener("click", function(e) {

    // storing current input string and its last character in variables - used later
    var currentString = input.innerHTML;
    var lastChar = currentString[currentString.length - 1];

    // if result is not diplayed, just keep adding
    if (resultDisplayed === false) {
      input.innerHTML += e.target.innerHTML;
    } else if (resultDisplayed === true && lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
      // if result is currently displayed and user pressed an operator
      // we need to keep on adding to the string for next operation
      resultDisplayed = false;
      input.innerHTML += e.target.innerHTML;
    } else {
      // if result is currently displayed and user pressed a number
      // we need clear the input string and add the new input to start the new opration
      resultDisplayed = false;
      input.innerHTML = "";
      input.innerHTML += e.target.innerHTML;
    }

  });
}

// adding click handlers to number buttons
for (var i = 0; i < operator.length; i++) {
  operator[i].addEventListener("click", function(e) {

    // storing current input string and its last character in variables - used later
    var currentString = input.innerHTML;
    var lastChar = currentString[currentString.length - 1];

    // if last character entered is an operator, replace it with the currently pressed one
    if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
      var newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
      input.innerHTML = newString;
    } else if (currentString.length == 0) {
      // if first key pressed is an opearator, don't do anything
      console.log("enter a number first");
    } else {
      // else just add the operator pressed to the input
      input.innerHTML += e.target.innerHTML;
    }

  });
}

// on click of 'equal' button
result.addEventListener("click", function() {

  // this is the string that we will be processing eg. -10+26+33-56*34/23
  var inputString = input.innerHTML;

  // forming an array of numbers. eg for above string it will be: numbers = ["10", "26", "33", "56", "34", "23"]
  var numbers = inputString.split(/\+|\-|\×|\÷/g);

  // forming an array of operators. for above string it will be: operators = ["+", "+", "-", "*", "/"]
  // first we replace all the numbers and dot with empty string and then split
  var operators = inputString.replace(/[0-9]|\./g, "").split("");

  console.log(inputString);
  console.log(operators);
  console.log(numbers);
  console.log("----------------------------");

  // now we are looping through the array and doing one operation at a time.
  // first divide, then multiply, then subtraction and then addition
  // as we move we are alterning the original numbers and operators array
  // the final element remaining in the array will be the output

  var divide = operators.indexOf("÷");
  while (divide != -1) {
    numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
    operators.splice(divide, 1);
    divide = operators.indexOf("÷");
  }

  var multiply = operators.indexOf("×");
  while (multiply != -1) {
    numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
    operators.splice(multiply, 1);
    multiply = operators.indexOf("×");
  }

  var subtract = operators.indexOf("-");
  while (subtract != -1) {
    numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
    operators.splice(subtract, 1);
    subtract = operators.indexOf("-");
  }

  var add = operators.indexOf("+");
  while (add != -1) {
    // using parseFloat is necessary, otherwise it will result in string concatenation :)
    numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
    operators.splice(add, 1);
    add = operators.indexOf("+");
  }

  input.innerHTML = numbers[0]; // displaying the output

  resultDisplayed = true; // turning flag if result is displayed
});

// clearing the input on press of clear
clear.addEventListener("click", function() {
  input.innerHTML = "";
})
