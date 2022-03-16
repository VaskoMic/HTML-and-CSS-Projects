
// creates an object to keep track of values
const Calculator = {
    // This is display 0 on the screen
    Display_Value: '0',
    //This will hold the first operand for any expressions, we set it to null for now
    First_Operand: null,
    //this checks whether or not th second operand has been input
    Wait_Second_Operand: false,
    //this will hold the operator, we set it to null for now
    operator: null 

}

//this modifies values each time a button is clicked
function Input_Digit(digit) {
    const { Display_Value, Wait_Second_Operand } = calculator ;
    //we are checking to see if Wait_Second_Operand is true and set
    //Display_Value to the key that was clicked.
    if (Wait_Second_Operand === true) {
        Calculator.Display_Value = digit;
        Calculator.Wait_Second_Operand = false;
    } else {
        //this overwrites Display_Value if the current value is 0
        //otherwise it adds onto it
        Calculator.Display_Value = Display_Value === '0' ? digit : Display_Value + digit;
    }
}
//this secton handles decimal points
function Input_Decimal(dot) {
    //this ensures that accidental clicking of the decimal point
    //doesn't cause bugs in your operation
    if ( Calculator.Wait_Second_Operand === true) return;
    if (!Calculator.Display_Value.includes(dot)) {
        //we are saying that if the Display_Value does not contain a decimal point
        //we want to add a decimal point
        Calculator.Display_Value += dot;
    }
}
//this section handles operators
function Handle_Operator(Next_Operators){
    const { First_Operand, Display_Value, operator} = Calculator
    //when an operator key is pressed, we convert the current number
    //displayed on the screen to a number and then store the result in
    //Calculator.First_Operand if it doesn't already exist
    const Value_of_Input = parseFloat(Display_Value);
    //checks if an operator already exists and if Wait_Second_Operand is true
    //then updates the operator and exists from the function
    if (operator && Calculator.Wait_Second_Operand) {
        Calculator.operator = Next_Operator;
        return;
    }
    Calculator.Wait_Second_Operand = true;
    Calculator.operator = Next_Operator;
}

const Perform_Calculation = {
    '/': (First_Operand, Second_Operand) => First_Operand / Second_Operand,

    '*': (First_Operand, Second_Operand) => First_Operand * Second_Operand,

    '+': (First_Operand, Second_Operand) => First_Operand + Second_Operand,

    '_': (First_Operand, Second_Operand) => First_Operand - Second_Operand,

    '=': (First_Operand, Second_Operand) => Second_Operand,
} ;
    function Calculator_Reset() {
        Calculator.Display_Value = '0';
        Calculator.First_Operand = null;
        Calculator.Wait_Second_Operand = false;
        Calculator.operator = null;
}

Update_Display() ;
// this section  monitors button cliks
const keys = document.guerySelector ('.calculator-keys');
keys.addEventListener ('click', ( Event) => {
    //the target variable is an object that represents the element
    //that was clicked
    const { target} = Event ;
    //if the element that was clicked on is not a button, exit the function
    if (!target.matches('button') ){
        return;
    }
 if (target.classList.contains('operator')) {
     Handle_Operator(target.value);
     Update_Display();
     return;
 }
    if (target.classList.contains('decimal')) {
    Input_Decimal(target.value);
    Update_Display();
    return;
 }
    //ensures that AC clears the numbers from the Calculator
    if (target.classList.contains('all-clear')) {
        Calculator_Reset();
        Update_Display();
        return ;
    }
    Input_Digit(target.value);
    Update_Display();
})