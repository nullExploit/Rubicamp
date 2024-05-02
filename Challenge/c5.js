function stringManipulation(word) {
    const vowels = 'aiueoAIUEO'
  if (vowels.includes(word[0])) {
    return word;
  } else {
    const str = word.split("");
    const firstEl = str.shift();
    str.push(firstEl);
    return str.join("") + "nyo";
  }
}

stringManipulation("ayam");
stringManipulation("bebek");