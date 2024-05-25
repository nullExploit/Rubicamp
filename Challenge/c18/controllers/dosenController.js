import Dosen from "../models/Dosen.js";
import Table, { rl, line } from "../models/connect.js";
import { mainMenu } from "./userController.js";

export default function dosenMenu(cb) {
  cb.printDosen();
  rl.question("Masukkan salah satu nomor dari opsi diatas : ", (ans) => {
    switch (ans) {
      case "1":
        dosenList(cb);
        break;
      case "2":
        findDosen(cb);
        break;
      case "3":
        addDosen(cb);
        break;
      case "4":
        delDosen(cb);
        break;
      case "5":
        mainMenu(cb);
        break;
      default:
        console.log("Opsi tidak ditemukan, tolong masukkan ulang!");
        dosenMenu(cb);
        break;
    }
  });
}

function dosenList(cb) {
  const table = new Table({
    head: ["NIP", "Nama Dosen"],
  });
  Dosen.all((data) => {
    data.forEach((row) => {
      table.push([row.nip, row.nama]);
    });
    return console.log(table.toString()), dosenMenu(cb);
  });
}

function findDosen(cb) {
  rl.question("Masukkan NIP Dosen : ", (ans) => {
    Dosen.find(ans, (row) => {
      if (!row)
        return (
          console.log(`Dosen dengan NIP ${ans}, tidak terdaftar`), dosenMenu(cb)
        );
      console.log(`${line}
Detail Dosen dengan NIP '${ans}' :
NIP         : ${row.nip}
Nama        : ${row.nama}
    `);
      dosenMenu(cb);
    });
  });
}

function addDosen(cb) {
  console.log("Lengkapi data di bawah ini : ");
  const table = new Table({
    head: ["NIP", "Nama Dosen"],
  });
  Dosen.all((data) => {
    data.forEach((row) => {
      table.push([row.nip, row.nama]);
    });
    console.log(table.toString());
    addCredD(data[0], cb);
  });
}

function addCredD(rows, cb) {
  rl.question("NIP : ", (nip) => {
    if (nip.length != rows.nip.length)
      return console.log("Panjang NIP tidak sesuai"), addCredD(rows, cb);

    Dosen.find(nip, (row) => {
      if (row) return console.log("NIP sudah terpakai"), addCredD(rows, cb);
      rl.question("Nama Dosen : ", (d) => {
        if (!d) return console.log("Isi Nama Dosen!"), addCredD(rows, cb);
        Dosen.create(nip, d, () => {
          return (
            console.log("jurusan telah ditambahkan ke database"), dosenMenu(cb)
          );
        });
      });
    });
  });
}

function delDosen(cb) {
  rl.question("Masukkan NIP : ", (ans) => {
    Dosen.find(ans, (row) => {
      if (!row)
        return (
          console.log(`Dosen dengan NIP ${ans}, tidak terdaftar`), dosenMenu(cb)
        );
      Dosen.delete(ans, () => {
        return console.log(`Data Dosen ${ans}, telah dihapus`), dosenMenu(cb);
      });
    });
  });
}
