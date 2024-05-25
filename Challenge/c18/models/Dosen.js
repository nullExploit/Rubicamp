import { db } from "./connect.js";

export default class Dosen {
  constructor(nip, nama) {
    this.nip = nip;
    this.nama = nama;
  }

  static all(cb) {
    db.all("SELECT * FROM dosen", (err, rows) => {
      if (err) return console.log("Tolong hubungi administrator!", err);
      cb(rows);
    });
  }

  static find(nip, cb) {
    db.get("SELECT * FROM dosen WHERE nip = ?", [nip], (err, row) => {
      if (err) return console.log("Tolong hubungi administrator!", err);
      cb(row);
    });
  }

  static create(nip, nama, cb) {
    db.run("INSERT INTO dosen VALUES (?, ?)", [nip, nama], (err) => {
      if (err) return console.log("Tolong hubungi administrator!", err);
      cb();
    });
  }

  static delete(nip, cb) {
    db.run("DELETE FROM dosen WHERE nip = ?", [nip], (err) => {
      if (err) return console.log("Tolong hubungi administrator!", err);
      cb();
    });
  }
}
