function sentenceManipulation(sentence) {
  const vowels = "aiueoAIUEO";
  const sen = sentence.split(" ").map((word) => {
    if (vowels.includes(word[0])) {
      return word;
    } else {
      const str = word.split("");
      const firstEl = str.shift();
      str.push(firstEl);
      return str.join("") + "nyo";
    }
  });
  return sen.join(" ");
}

const readline = require("node:readline"),
rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'tulis kalimatmu disini > '
});
rl.prompt()

rl.on('line', (line) => {
    console.log(`hasil konversi: ${sentenceManipulation(line)}`)
    rl.prompt() 
}).on('close', () => {
    console.log("Good bye!")
    process.exit(0)
})
