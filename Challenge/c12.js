const { readFileSync } = require("node:fs"),
  file = process.argv[2];
if (!file) {
  console.log(
    "Tolong sertakan nama file sebagai inputan soalnya\nMisalnya 'node solution.js data.json'"
  );
}
if (file) {
  console.log(`Selamat datang di permainan Tebak-tebakan. kamu akan diberikan pertanyaan dari file ini '${file}'.
Untuk bermain, jawablah dengan jawaban yang sesuai.
Gunakan 'skip' untuk menangguhkan pertanyaannya, dan di akhir pertanyaan akan ditanyakan lagi.\n`);

  const readline = require("node:readline"),
    rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: "Jawaban: ",
    }),
    raw = readFileSync(`./${file}`),
    datas = JSON.parse(raw),
    guessGame = () => {
      let index = 0,
        mistake = 0;
      console.log(`Pertanyaan: ${datas[index].definition}`);
      rl.prompt();
      rl.on("line", (ans) => {
        if (ans.toLowerCase() === datas[index].term) {
          console.log("\nAnda Beruntung!\n");
          if (index === datas.length - 1) {
            console.log("Anda Berhasil!");
            process.exit(0);
          } else {
            index++;
            console.log(`Pertanyaan: ${datas[index].definition}`);
          }
        } else if (ans.toLowerCase() == "skip") {
          datas.push(datas.splice(index, 1)[0]);
          mistake = 0;
          console.log(`\nPertanyaan: ${datas[index].definition}`);
        } else {
          mistake++;
          console.log(
            `\nAnda Kurang Beruntung! anda telah salah ${mistake} kali, silahkan coba lagi.\n`
          );
        }
        rl.prompt();
      });
    };
  guessGame();
}