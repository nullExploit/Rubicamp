import Mahasiswa from "../models/Mahasiswa.js";
import Jurusan from "../models/Jurusan.js";
import Table, { line, rl } from "../models/connect.js";
import { mainMenu } from "./userController.js";

export default function mahasiswaMenu(cb) {
  cb.printMahasiswa();
  rl.question("Masukkan salah satu nomor dari opsi diatas : ", (ans) => {
    switch (ans) {
      case "1":
        mahasiswaList(cb);
        break;
      case "2":
        findMahasiswa(cb);
        break;
      case "3":
        addMahasiswa(cb);
        break;
      case "4":
        delMahasiswa(cb);
        break;
      case "5":
        mainMenu(cb);
        break;
      default:
        console.log("Opsi tidak ditemukan, tolong masukkan ulang!");
        mahasiswaMenu(cb);
        break;
    }
  });
}

function mahasiswaList(cb) {
  const table = new Table({
    head: [
      "NIM",
      "Nama",
      "Tanggal Lahir",
      "Alamat",
      "Kode Jurusan",
      "Nama Jurusan",
    ],
  });
  Mahasiswa.all((data) => {
    data.forEach((row) => {
      table.push([
        row.nim,
        row.nama,
        row.tanggal_lahir,
        row.alamat,
        row.id_jurusan,
        row.nama_jurusan,
      ]);
    });

    return console.log(table.toString()), mahasiswaMenu(cb);
  });
}

function findMahasiswa(cb) {
  rl.question("Masukkan NIM Mahasiswa : ", (ans) => {
    Mahasiswa.find(ans, (row) => {
      if (!row)
        return (
          console.log(`Mahasiswa dengan NIM ${ans}, tidak terdaftar`),
          mahasiswaMenu(cb)
        );
      return (
        console.log(`${line}
Detail mahasiswa dengan NIM '${ans}' :
NIM         : ${row.nim}
Nama        : ${row.nama}
Alamat      : ${row.alamat}
Jurusan     : ${row.id_jurusan}
`),
        mahasiswaMenu(cb)
      );
    });
  });
}

function addMahasiswa(cb) {
  console.log("Lengkapi data di bawah ini : ");
  const table = new Table({
    head: [
      "NIM",
      "Nama",
      "Tanggal Lahir",
      "Alamat",
      "Kode Jurusan",
      "Nama Jurusan",
    ],
  });
  Mahasiswa.all((data) => {
    data.forEach((row) => {
      table.push([
        row.nim,
        row.nama,
        row.tanggal_lahir,
        row.alamat,
        row.id_jurusan,
        row.nama_jurusan,
      ]);
    });
    console.log(table.toString());
    addCred(data[0], cb);
  });
}

function addCred(sample, cb) {
  rl.question("NIM : ", (nim) => {
    if (nim.length != sample.nim.length)
      return console.log("Panjang NIM tidak sesuai"), addCred(sample, cb);
    Mahasiswa.find(nim, (row) => {
      if (row) return console.log("NIM sudah terpakai"), addCred(sample, cb);
      rl.question("Nama : ", (nama) => {
        if (!nama)
          return console.log("Isi Nama terlebih dahulu!"), addCred(sample, cb);
        rl.question("Tanggal Lahir : ", (tgl) => {
          if (tgl.length != sample.tanggal_lahir.length)
            return (
              console.log("Sesuaikan Format tanggal lahir!"),
              addCred(sample, cb)
            );
          rl.question("Alamat : ", (alm) => {
            if (!alm)
              return (
                console.log("Isi alamat terlebih dahulu!"), addCred(sample, cb)
              );
            return addCredM(nim, nama, tgl, alm, cb);
          });
        });
      });
    });
  });
}

function addCredM(nim, nama, tgl, alm, cb) {
  const table = new Table({
    head: ["Kode Jurusan", "Nama Jurusan"],
  });
  Jurusan.all((data) => {
    data.forEach((row) => {
      table.push([row.id_jurusan, row.nama_jurusan]);
    });
    console.log(table.toString());
    rl.question("Kode Jurusan : ", (j) => {
      if (j.length != data[0].id_jurusan.length)
        return (
          console.log("Panjang Kode Jurusan tidak sesuai!"),
          addCredM(nim, nama, tgl, alm, cb)
        );
      Jurusan.find(j, (row) => {
        if (!row)
          return (
            console.log("Kode Jurusan tidak ada!"),
            addCredM(nim, nama, tgl, alm, cb)
          );

        Mahasiswa.create(nim, nama, tgl, alm, j, () => {
          return console.log("mahasiswa telah ditambahkan"), mahasiswaMenu(cb);
        });
      });
    });
  });
}

function delMahasiswa(cb) {
  rl.question("Masukkan NIM Mahasiswa : ", (ans) => {
    Mahasiswa.find(ans, (row) => {
      if (!row)
        return (
          console.log(`Mahasiswa dengan nim ${ans}, tidak terdaftar`),
          mahasiswaMenu(cb)
        );
      Mahasiswa.delete(ans, () => {
        return (
          console.log(`Data Mahasiswa ${ans}, telah dihapus`), mahasiswaMenu(cb)
        );
      });
    });
  });
}
