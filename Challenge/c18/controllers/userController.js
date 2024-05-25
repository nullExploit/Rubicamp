import User from "../models/User.js";
import { rl, line } from "../models/connect.js";
import mahasiswaMenu from "../controllers/mahasiswaController.js";
import jurusanMenu from "./jurusanController.js";
import dosenMenu from "./dosenController.js";
import matkulMenu from "./mataKuliahController.js";
import conMenu from "./kontrakController.js";

export default function main(cb) {
  console.log(`${line}
Welcome to Universita Pendidikan Indonesia
Jl. Setiabudhi No. 255
${line}`);
  login(cb);
}

function login(cb) {
  rl.question("username : ", (user) => {
    User.login(user, (data) => {
      if (!data) return console.log("username tidak terdaftar"), login(cb);
      pass(data, cb);
    });
  });
}

function pass(data, cb) {
  rl.question("password : ", (passwd) => {
    if (passwd !== data.password)
      return console.log("password salah!"), pass(data, cb);
    greet(data, cb);
  });
}

function greet(data, cb) {
  console.log(`${line}
Welcome, ${data.username}. Your access level is : ${data.role.toUpperCase()}
${line}`);
  mainMenu(cb);
}

export function mainMenu(cb) {
  cb.printMenu();
  rl.question("Masukkan salah satu nomor dari opsi diatas : ", (ans) => {
    switch (ans) {
      case "1":
        mahasiswaMenu(cb);
        break;
      case "2":
        jurusanMenu(cb);
        break;
      case "3":
        dosenMenu(cb);
        break;
      case "4":
        matkulMenu(cb);
        break;
      case "5":
        conMenu(cb);
        break;
      case "6":
        console.log(`${line}
Anda telah keluar`);
        main(cb);
        break;
      default:
        console.log("Opsi tidak ditemukan, tolong masukkan ulang!");
        mainMenu(cb);
        break;
    }
  });
}
