let num = 266219,
res=1;

while(num != 0){
  res *= num % 10;
  num = Math.floor(num / 10);
}

console.log("Multiplication result: " + res);
res **= 3;
console.log("Power product and output of two numbers: " + String(res).slice(0,2));
