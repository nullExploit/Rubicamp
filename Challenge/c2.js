function deretKaskus(n) {
  const res = [];
  for (let i = 3; res.length < n; i += 3) {
    if (i % 5 == 0 && i % 6 == 0) {
      res.push("KASKUS");
    } else if (i % 5 == 0) {
      res.push("KAS");
    } else if (i % 6 == 0) {
      res.push("KUS");
    } else {
      res.push(i);
    }
  }
  return res;
}

console.log(deretKaskus(10))
