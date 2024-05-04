function sentenceManipulation(sentence) {
  const vowels = "aiueoAIUEO";
  const sen = sentence.split(" ").map((word) => {
    if (vowels.includes(word[0])) {
      return word;
    } else {
      const str = word.split("");
      const firstEl = str.shift();
      str.push(firstEl);
      console.log(str.join("") + "nyo");
    }
  });
  console.log(sen.join(" "));
}

sentenceManipulation("ibu pergi ke pasar bersama aku");
