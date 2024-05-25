import MataKuliah from "../models/MataKuliah.js";
import Table, { line, rl } from "../models/connect.js";
import { mainMenu } from "./userController.js";

export default function matkulMenu(cb) {
  cb.printMatkul();
  rl.question("Masukkan salah satu nomor dari opsi diatas : ", (ans) => {
    switch (ans) {
      case "1":
        matkulList(cb);
        break;
      case "2":
        findMatkul(cb);
        break;
      case "3":
        addMatkul(cb);
        break;
      case "4":
        delMatkul(cb);
        break;
      case "5":
        mainMenu(cb);
        break;
      default:
        console.log("Opsi tidak ditemukan, tolong masukkan ulang!");
        matkulMenu(cb);
        break;
    }
  });
}

function matkulList(cb) {
  const table = new Table({
    head: ["Kode Mata Kuliah", "Nama Mata Kuliah", "SKS"],
  });
  MataKuliah.all((data) => {
    data.forEach((row) => {
      table.push([row.id_matkul, row.nama_matkul, row.sks]);
    });
    return console.log(table.toString()), matkulMenu(cb);
  });
}

function findMatkul(cb) {
  rl.question("Masukkan Kode Mata Kuliah : ", (ans) => {
    MataKuliah.find(ans, (row) => {
      if (!row)
        return (
          console.log(`Mata Kuliah dengan Kode Matkul ${ans}, tidak terdaftar`),
          matkulMenu(cb)
        );
      console.log(`${line}
  Detail Mata Kuliah dengan Kode '${ans}' :
  Kode Matkul : ${row.id_matkul}
  Nama        : ${row.nama_matkul}
  SKS         : ${row.sks}
  `);
      matkulMenu(cb);
    });
  });
}

function addMatkul(cb) {
  console.log("Lengkapi data di bawah ini : ");
  const table = new Table({
    head: ["Kode Mata Kuliah", "Mata Kuliah", "SKS"],
  });
  MataKuliah.all((data) => {
    data.forEach((row) => {
      table.push([row.id_matkul, row.nama_matkul, row.sks]);
    });
    return console.log(table.toString()), addCredK(data[0], cb);
  });
}

function addCredK(rows, cb) {
  rl.question("Kode Matkul : ", (kmk) => {
    if (kmk.length != rows.id_matkul.length)
      return (
        console.log("Panjang Kode Matkul tidak sesuai"), addCredK(rows, cb)
      );

    MataKuliah.find(kmk, (row) => {
      if (row)
        return (
          console.log("Kode Mata Kuliah sudah terpakai"), addCredK(rows, cb)
        );
      rl.question("Mata Kuliah : ", (mk) => {
        if (!mk) return console.log("Isi Mata Kuliah!"), addCredK(rows, cb);
        MataKuliah.find(mk, (row) => {
          if (row)
            return (
              console.log("Mata Kuliah sudah terpakai"), addCredK(rows, cb)
            );

          rl.question("SKS : ", (sks) => {
            if (sks.length != 1) {
              return (
                console.log("Panjang SKS tidak sesuai!"), addCredK(rows, cb)
              );
            } else if (!/[0-9]/g.test(sks)) {
              return console.log("SKS harus berupa angka!"), addCredK(rows, cb);
            }
            MataKuliah.create(kmk, mk, sks, () => {
              return (
                console.log("mata kuliah telah ditambahkan ke database"),
                matkulMenu(cb)
              );
            });
          });
        });
      });
    });
  });
}

function delMatkul(cb) {
  rl.question("Masukkan Kode Mata Kuliah : ", (ans) => {
    MataKuliah.find(ans, (row) => {
      if (!row)
        return (
          console.log(
            `Mata Kuliah dengan Kode Mata Kuliah ${ans}, tidak terdaftar`
          ),
          matkulMenu(cb)
        );
      MataKuliah.delete(ans, () => {
        return (
          console.log(`Data Mata Kuliah ${ans}, telah dihapus`), matkulMenu(cb)
        );
      });
    });
  });
}
