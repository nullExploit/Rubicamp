function wierdMultiply(sentence) {
  let sen = String(sentence)
    .split("")
    .map(Number)
    .reduce((acc, curr) => acc * curr);

  if (sentence < 10) {
    return sentence;
  }
  return wierdMultiply(sen);
}

console.log(wierdMultiply(39));
console.log(wierdMultiply(999));
console.log(wierdMultiply(3));