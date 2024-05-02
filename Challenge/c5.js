function stringManipulation(word) {
  if (
    word[0] == "a" ||
    word[0] == "i" ||
    word[0] == "u" ||
    word[0] == "e" ||
    word[0] == "o"
  ) {
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