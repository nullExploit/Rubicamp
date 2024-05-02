function indexPrime(param1) {
  const res = [];
  let num = 2;

  while (res.length < param1) {
    let isPrime = true;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i == 0) isPrime = false;
    }
    if (isPrime) {
      res.push(num);
    }
    num++;
  }
  return res[param1 - 1];
}

console.log(indexPrime(4))
console.log(indexPrime(500));
console.log(indexPrime(37786));