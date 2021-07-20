function sum(num1, num2) {
    return num1 + num2
}
function calc(num1, num2, callback) {
    setTimeout(() => {
        
    }, 5000);
    return callback(num1, num2)
    
}
function date(callback) {
    console.log(new Date);
    setTimeout(function () {
        let date = new Date;
        callback(date)
    }, 3000)
    console.log("Terminada la funcion date");
}
function printDate(dateNow) {

    console.log(dateNow);
    console.log("Terminada la funcion printDate");
}
date(printDate);
console.log(calc(3, 3, sum));