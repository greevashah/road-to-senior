
// When error is thrown control flow ends there.Hence we catch it. If the error is caught in a try-catch, 
// it will not trigger the subsequent try-catch hence there is a possibility of missing out errors.
// to avoid it you may throw the error in the inner try-catch

const addNumbers = (num1:number, num2: number):number => {
    if(num1 == 0 && num2 == 0) {
        throw new Error("Both numbers cant be zero");
    }
    else if (num1 > 100 || num2 > 100) {
        throw new Error("Number cant be greater than 100");
    }
    try { subtractNumber(num1, num2);}
    catch(err) { throw err; }
    return (num1 + num2)
}

const subtractNumber = (num1:number, num2: number) => {
    const diff = num1 - num2;
    if(diff < 0 ){
        throw new Error("Negative difference");
    }
    return diff;
}

try {
    console.log(addNumbers(10,15));
    console.log(addNumbers(110,15));
    console.log(addNumbers(0,0));
}
catch(err){
    console.log("Error: ", err);
}
console.log("Outside try-catch");

if(0){
    console.log("True");
} else {
    console.log("False");
}
