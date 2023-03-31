var firstNum = "";
var secNum = "";
var operator = "";

var tempNum = "";
var prevNum = "";
var isOpDeleted = false;

var display = document.querySelector("h4");


/**
 * Call different functions base on the type of val.
 * @param {number / string} val - value of the button pressed
 */
function pressedBtn(val){
    if (typeof(val) == "number"){
        setTempNum(val);
    } else if (typeof(val) == "string") {
        setOperator(val);
    }
}

/**
 * Clear display by resetting all the variable values
 * and change display value to 0.
 */
function clearDisplay(){
    firstNum = "";
    secNum = "";
    operator = "";
    tempNum = "";
    prevNum = "";
    isOpDeleted = false;
    display.innerText = 0;
    console.log("Cleared display");
}

/**
 * Delete the last character.
 */
function del(){
    deletedChar = display.innerText.slice(-1);  // last character
    console.log("Deleted from display: " + deletedChar);

    /**
     * condition - If deletedChar is any of the operator
     * do - Call operatorDeleted() to remember firstNum value before clearing it.
     *      Clear opeartor and firstNum variable values.
     */
    if (deletedChar == "+" || deletedChar == "-" 
     || deletedChar == "*" || deletedChar == "/"){

        operatorDeleted();  // remember firstNum
        operator = "";  // cleared value
        firstNum = "";  

        console.log("cleared operator variable, tempNum: " + tempNum);
    } 
    /**
     * condition - If deletedChar is number or "."
     * do - Delete the last character and store the deleted value to tempNum.
     */
    else {
        /**
         * condition - An operator has been deleted before deleting this character
         * do - Restore tempNum value using prevNum.
         *      Set isOpDeleted to false.
         */
        if (isOpDeleted){
            tempNum = prevNum;  // restore tempNum value using prevNum
            isOpDeleted = false;
        }
        tempNum = tempNum.substring(0, tempNum.length -1);  
        console.log("tempNum after delete: "+ tempNum);
    }

    /**
     * condition - if the display has only one character
     * do - replace it with 0
     */
    if (display.innerText.length == 1) { 
        display.innerText = 0;
    } 
    /**
     * conditin - if display has more than one character
     * do - remove the last character from display 
     *      and reassign its value (the one without the last character).
     */
    else {
    display.innerText = display.innerText.substring(0,display.innerText.length-1);
    }
}  // end del()

   
/**
 * When the user press any of the operator, 
 * setOperator() will update firstNum value with tempNum, 
 * then clear tempNum (to store value for secNum).
 * 
 * firstNum value will also be cleared when an operator has been deleted.
 * Since tempNum and firstNum will be cleared, we need to keep track of their data.
 * We do this by using operatorDeleted() function.
 */
function operatorDeleted(){
    prevNum = firstNum;
    isOpDeleted = true;
}

function setTempNum(num){
    /**
     * condition - if firstNum, secNum and operator aren't empty
     * do - clear their values by calling clearDisplay()
     */
    if (firstNum != "" && secNum != "" && operator != ""){
        clearDisplay()
    }
    
    /**
     * condition - Pressing 0 when tempNum and firstNum are empty
     * do - Run this block by doing nothing, to skip other blocks.
     */
    if (num == 0 && tempNum == "" && firstNum == ""){ 
        //pass
    } 
    /**
     * condition - An operator has been deleted 
     * (user first deleted an operator, then pressed a number)
     * do - Restore tempNum value using prevNum.
     *      Then use that tempNum to add another number.
     *      Update display to display the number.
     *      Reset isOpDeleted to false. 
     */
    else if (isOpDeleted){ 
        tempNum = prevNum;  // restore tempNum
        tempNum += num;     // add the number to tempNum
        display.innerText += num;
        isOpDeleted = false;
        console.log("updated tempNum with prevNum, tempNum: " + tempNum)
    } 
    /**
     * condition - if firstNum is empty
     * do - Add the number to tempNum and update display.
     */
    else if (firstNum == ""){ 
        tempNum += num;
        display.innerText = tempNum;
        console.log("set tempNum: " + tempNum);
    } 
    /**
     * condition - if firstNum and operator aren't empty (has some value)
     * do - Add number to tempNum and update display.
     */
    else if (firstNum != "" && operator != ""){ 
        tempNum += num;
        display.innerText += num;
        console.log("firstNum is not empty: " + firstNum + " tempNum value: " + tempNum);
    } 
}  // end setTempNum()


/**
 * Add "." to tempNum and display if tempNum doesn't have a decimal. 
 * If it does, do nothing.
 */
function setDecimal(){
    if (tempNum.search(/[.]/) == -1){ 
        tempNum += ".";
        display.innerText += ".";
    }
}

/**
 * set operator base on the conditions.
 * @param {string} op - operator 
 */
function setOperator(op){ 
    /**
     * condition - pressed operator when firstNum, secNum and operator aren't empty
     * (pressed operator after getting the result).
     * do - Called clearDisplay()
     */
    if (firstNum != "" && secNum != "" && operator != ""){
        clearDisplay()
    }

    /**
     * condition - If firstNum and operator aren't empty
     * do - Pass this block by doing nothing.
     */
    if (firstNum != "" && operator != ""){
        //pass
        console.log("pass: firstNum and operator are not empty")
     } 
     /**
      * condition - If tempNum is not empty and operator is empty
      * (pressing an operator when tempNum has some value means user has finished
      * entering thier first number)
      * do - Assign operator value.
      *      Store tempNum value to firstNum.
      *      Clear tempNum value (to store the value for secNum)
      */
     else if (tempNum != "" && operator == ""){
        operator = op; 

        firstNum = tempNum;  // updated fristNum
        tempNum = "";   // cleared tempNum 

        display.innerText += operator;
        console.log("stored tempNum value to firstNum: " + firstNum);
    } 
    /**
     * condition - if an operator has been deleted
     * (pressed operator again after deleting an operator)
     * do - Assign operator value.
     *      Restore firstNum using prevNum (Deleting an operator clears 
     *                                      both operator and firstNum values.)
     *      Set isOpDeleted to false.
     */
    else if (isOpDeleted) {
        operator = op;
        firstNum = prevNum;   // restore firstNum
        isOpDeleted = false;
        display.innerText += operator;
        console.log("restore firstNum and updated operator, firstNum: " + firstNum)
    }
}  // end setOperator()


/**
 * When user pressed equal, checks whether firstNum, operator and tempNum are empty.
 * If empty, assign tempNum value to secNum.
 * Call calculateResult() and round the return value to 2 decimal place 
 * and store it inside result and display it.
 */
function pressedEqual(){
    if (firstNum != "" && operator != "" && tempNum != ""){
        secNum = tempNum;
        console.log("Put tempNum value to secNum: " + secNum);
        console.log("firstNum: " + firstNum);
        var result = calculateResult().toFixed(2);
        display.innerText = result;
    }
    console.log("pressed equal")
}

/**
 * Computes two numbers according to operator type.
 * @returns {number} - the computation of two numbers.
 */
function calculateResult(){
    if (operator == "+"){
        return Number(firstNum) + Number(secNum);
    } else if (operator == "-"){
        return Number(firstNum) - Number(secNum);
    } else if (operator == "*"){
        return Number(firstNum) * Number(secNum);
    } else if (operator == "/"){
        return Number(firstNum) / Number(secNum);
    } 
}
