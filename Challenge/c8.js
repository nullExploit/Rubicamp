function pola(str) {
  const res = [];
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const filtered = str.replace("#", i).replace("#", j),
        ind = filtered.split(" = ");
      if (eval(ind[0]) === eval(ind[1])) {
        res.push(i, j);
        return res;
      }
    }
  }
}

console.log(pola("42#3 * 188 = 80#204")); 
console.log(pola("8#61 * 895 = 78410#5"));
