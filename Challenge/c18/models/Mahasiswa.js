import { db } from "./connect.js";

export default class Mahasiswa {
  constructor(nim, nama, tanggalLahir, alamat, idJurusan) {
    this.nim = nim;
    this.nama = nama;
    this.tanggalLahir = tanggalLahir;
    this.alamat = alamat;
    this.idJurusan = idJurusan;
  }

  save(cb = function () {}) {
    db.get("SELECT * FROM mahasiswa WHERE nim = ?", [this.nim], (err, row) => {
      if (err) return console.log("Tolong hubungi administrator!", err);
      else if (row) return console.log("NIM sudah terpakai!");
      db.run(
        "INSERT INTO mahasiswa VALUES (?, ?, ?, ?, ?)",
        [this.nim, this.nama, this.tanggalLahir, this.alamat, this.idJurusan],
        (err) => {
          if (err) return console.log("Tolong hubungi administrator!", err);
          cb();
        }
      );
    });
  }

  static all(cb) {
    db.all(
      "SELECT * FROM mahasiswa LEFT JOIN jurusan USING(id_jurusan)",
      (err, rows) => {
        if (err) return console.log("Tolong hubungi administrator!", err);
        cb(rows);
      }
    );
  }

  static find(nim, cb) {
    db.get("SELECT * FROM mahasiswa WHERE nim = ?", [nim], (err, row) => {
      if (err) return console.log("Tolong hubungi administrator!", err);
      cb(row);
    });
  }

  static create(nim, nama, tanggalLahir, alamat, idJurusan, cb) {
    db.run(
      "INSERT INTO mahasiswa VALUES (?, ?, ?, ?, ?)",
      [nim, nama, tanggalLahir, alamat, idJurusan],
      (err) => {
        if (err) return console.log("Tolong hubungi administrator!", err);
        cb();
      }
    );
  }

  static delete(nim, cb) {
    db.run("DELETE FROM mahasiswa WHERE nim = ?", [nim], (err) => {
      if (err) return console.log("Tolong hubungi administrator!", err);
      cb();
    });
  }
}
