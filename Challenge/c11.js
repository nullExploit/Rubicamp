const { readFileSync } = require("node:fs"),
  readline = require("node:readline"),
  rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Tebakan: ",
  }),
  raw = readFileSync("./data.json"),
  datas = JSON.parse(raw),
  read = () => {
    let ind = 0;
    console.log(
      "Selamat datang di permainan Tebak Kata, silahkan isi dengan jawaban yang benar ya!\n"
    );
    console.log(`Pertanyaan: ${datas[ind].definition}`);
    rl.prompt();
    rl.on("line", (ans) => {
      if (ans.toLowerCase() == datas[ind].term) {
        console.log("Selamat Anda Benar!\n");
        ind++;
        if (ind === datas.length) {
          console.log("Hore Anda Menang!");
          process.exit(0);
        }
        console.log(`Pertanyaan: ${datas[ind].definition}`);
      } else {
        console.log("Wkwkwkwk, Anda kurang beruntung!\n");
      }
      rl.prompt();
    });
  };

read();
