const { readFileSync } = require("node:fs"),
  readline = require("node:readline"),
  rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Tebakan: ",
  }),
  raw = readFileSync("./data.json"),
  datas = JSON.parse(raw),
  readlineFunc = () => {
    console.log(
      "Selamat datang di permainan Tebak Kata, silahkan isi dengan jawaban yang benar ya!\n"
    );
    console.log(`Pertanyaan: ${datas[0].definition}`);
    rl.prompt();
    rl.on("line", (ans) => {
      if (ans.toLowerCase() == datas[0].term) {
        console.log("Selamat Anda Benar!\n");
        rl.removeAllListeners();
        console.log(`Pertanyaan: ${datas[1].definition}`);
        rl.on("line", (ans) => {
          if (ans.toLowerCase() == datas[1].term) {
            console.log("Selamat Anda Benar!\n");
            rl.removeAllListeners();
            console.log(`Pertanyaan: ${datas[2].definition}`);
            rl.on("line", (ans) => {
              if (ans.toLowerCase() == datas[2].term) {
                console.log("Selamat Anda Benar!\n");
                console.log("Hore Anda Menang!");
                process.exit(0);
              } else {
                console.log("Wkwkwkwk, Anda kurang beruntung!\n");
              }
              rl.prompt();
            });
          } else {
            console.log("Wkwkwkwk, Anda kurang beruntung!\n");
          }
          rl.prompt();
        });
      } else {
        console.log("Wkwkwkwk, Anda kurang beruntung!\n");
      }
      rl.prompt();
    });
  };
readlineFunc();