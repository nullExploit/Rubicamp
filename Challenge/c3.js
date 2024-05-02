function romawi(n) {
  const rom = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  };
  let res = '';

  for (key in rom) {
    const repeatCount = Math.floor(n / rom[key])

    if (repeatCount !== 0) {
        res += key.repeat(repeatCount)
    }

    n %= rom[key];

    if (n === 0) return res;
  }

  return res;
}

console.log("Script Testing Untuk Konversi Romawi\n");
console.log("input | expected | result");
console.log("-------------------------");
console.log("4     | IV       | ", romawi(4))
console.log("9     | IX       | ", romawi(9))
console.log("13    | XIII     | ", romawi(13))
console.log("1456  | MCDLIII  | ", romawi(1453))
console.log("1646  | MDCXLVI  | ", romawi(1646));