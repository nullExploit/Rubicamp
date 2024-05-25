import Jurusan from "../models/Jurusan.js";
import Table, { line, rl } from "../models/connect.js";
import { mainMenu } from "./userController.js";

export default function jurusanMenu(cb) {
  cb.printJurusan();
  rl.question("Masukkan salah satu nomor dari opsi diatas : ", (ans) => {
    switch (ans) {
      case "1":
        jurusanList(cb);
        break;
      case "2":
        findJurusan(cb);
        break;
      case "3":
        addJurusan(cb);
        break;
      case "4":
        delJurusan(cb);
        break;
      case "5":
        mainMenu(cb);
        break;
      default:
        console.log("Opsi tidak ditemukan, tolong masukkan ulang!");
        jurusanMenu(cb);
        break;
    }
  });
}

function jurusanList(cb) {
  const table = new Table({
    head: ["Kode Jurusan", "Nama Jurusan"],
  });
  Jurusan.all((data) => {
    data.forEach((row) => {
      table.push([row.id_jurusan, row.nama_jurusan]);
    });
    return console.log(table.toString()), jurusanMenu(cb);
  });
}

function findJurusan(cb) {
  rl.question("Masukkan Kode Jurusan : ", (ans) => {
    Jurusan.find(ans, (row) => {
      if (!row)
        return (
          console.log(`Jurusan dengan Kode Jurusan ${ans}, tidak terdaftar`),
          jurusanMenu(cb)
        );
      console.log(`${line}
Detail Jurusan dengan Kode '${ans}' :
Kode Jurusan : ${row.id_jurusan}
Nama Jurusan : ${row.nama_jurusan}
    `);
      jurusanMenu(cb);
    });
  });
}

function addJurusan(cb) {
  console.log("Lengkapi data di bawah ini : ");
  const table = new Table({
    head: ["Kode Jurusan", "Nama Jurusan"],
  });
  Jurusan.all((data) => {
    data.forEach((row) => {
      table.push([row.id_jurusan, row.nama_jurusan]);
    });
    console.log(table.toString());
    addCredJ(data[0], cb);
  });
}

function addCredJ(rows, cb) {
  rl.question("Kode Jurusan : ", (idj) => {
    if (idj.length != rows.id_jurusan.length)
      return (
        console.log("Panjang Kode Jurusan tidak sesuai"), addCredJ(rows, cb)
      );
    Jurusan.find(idj, (row) => {
      if (row)
        return console.log("Kode Jurusan sudah terpakai"), addCredJ(rows, cb);
      rl.question("Nama Jurusan : ", (j) => {
        if (!j) return console.log("Isi Nama Jurusan!"), addCredJ(rows, cb);
        Jurusan.create(idj, j, () => {
          return (
            console.log("jurusan telah ditambahkan ke database"),
            jurusanMenu(cb)
          );
        });
      });
    });
  });
}

function delJurusan(cb) {
  rl.question("Masukkan Kode Jurusan : ", (ans) => {
    Jurusan.find(ans, (row) => {
      if (!row)
        return (
          console.log(`Jurusan dengan Kode Jurusan ${ans}, tidak terdaftar`),
          jurusanMenu(cb)
        );
      Jurusan.delete(ans, () => {
        return (
          console.log(`Data Jurusan ${ans}, telah dihapus`), jurusanMenu(cb)
        );
      });
    });
  });
}
