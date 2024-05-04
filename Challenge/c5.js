function stringManipulation(word) {
  const vowels = "aiueoAIUEO";
  if (vowels.includes(word[0])) {
    console.log(word);
  } else {
    const str = word.split("");
    const firstEl = str.shift();
    str.push(firstEl);
    console.log(str.join("") + "nyo");
  }
}

stringManipulation("ayam");
stringManipulation("bebek");