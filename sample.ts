// Note:
// 1. When error is thrown control flow ends there.Hence we catch it. If the error is caught in a try-catch, 
// it will not trigger the subsequent try-catch hence there is a possibility of missing out errors.
// to avoid it you may throw the error in the inner try-catch

import { createLanguageService } from "typescript";

// setTimeout(() => { console.log("Delayed..")}, 5000);

// 2. Promises
// return type of promise is represented as Promise<T> where T is the type of the resolve callback
// Promise<T> is a representation of generic datatype 

// Callback Hell
const timer = new Promise((resolve, reject) => {
    console.log("Before");
    setTimeout(() => { resolve("Delayed..") }, 5000);
    console.log("After");
});

timer.then((result) => {
    addNumbers(10,15).then((firstResult) => {
        addNumbers(0,0).then((secondResult) => {
            console.log("Second Result: ", secondResult)
        }).catch(err => {
            console.log("Second Error: ", err)
        });
        console.log("First Result: ", firstResult)
    }).catch(err => {
        console.log("First Error: ", err);
    })
    console.log("Value passed by callbacks inside promise: ", result);
});

const addNumbers = (a: number, b:number): Promise<string> => {
    return new Promise((resolve, reject) => {
        if((a===0 && b===0) || (a>100 || b>100)){
            reject("Promise Rejected");
        }
        else {
            resolve(`Promise Resolved: ${a+b}`);
        }
    });
}

// addNumbers(10,15).then((result) => {
//     console.log("Value returned by addNumbers promise: ", result);
// });

// addNumbers(0,0).then((result) => {
//     console.log("Value returned by addNumbers promise: ", result);
// }).catch(err => {
//     console.log("Error thrown by promise reject callback is caught here: ", err);
// })

// addNumbers(110,15).then((result) => {
//     console.log("Value returned by addNumbers promise: ", result);
// }).catch(err => {
//     console.log("Error thrown by promise reject callback is caught here: ", err);
// });

// Async Function
const asyncFunc = async () => {
    try {
        const firstResult = await addNumbers(10,15);
        const secondResult = await addNumbers(10,16);
        const thirdResult = await addNumbers(10,17);
        console.log("Results are: ", firstResult, secondResult, thirdResult);
    } catch(error){
        console.log("Caught error is: ", error)
    }
}

asyncFunc().then((res) => {
    console.log("Executor: ", res);
});

const mockApi1 = () => {
    setTimeout(() => {
        console.log("API1 :: Response in 2s");
    }, 2000);
}

const mockApi2 = () => {
    setTimeout(() => {
        console.log("API1 :: Response in 3s");
    }, 3000);
}

mockApi1();
mockApi2();
