import { db } from "./connect.js";

export default class MataKuliah {
  constructor(idMatkul, namaMatkul, sks) {
    this.idMatkul = idMatkul;
    this.namaMatkul = namaMatkul;
    this.sks = sks;
  }

  static all(cb) {
    db.all("SELECT * FROM mata_kuliah", (err, rows) => {
      if (err) return console.log("Tolong hubungi administrator!", err);
      cb(rows);
    });
  }

  static find(params, cb) {
    if (/[0-9]/g.test(params)) {
      db.get(
        "SELECT * FROM mata_kuliah WHERE id_matkul = ?",
        [params],
        (err, row) => {
          if (err) return console.log("Tolong hubungi administrator!", err);
          cb(row);
        }
      );
    } else {
      db.get(
        "SELECT * FROM mata_kuliah WHERE nama_matkul = ?",
        [params],
        (err, row) => {
          if (err) return console.log("Tolong hubungi administrator!", err);
          cb(row);
        }
      );
    }
  }

  static create(idMatkul, namaMatkul, sks, cb) {
    db.run(
      "INSERT INTO mata_kuliah VALUES (?, ?, ?)",
      [idMatkul, namaMatkul, sks],
      (err) => {
        if (err) return console.log("Tolong hubungi administrator!", err);
        cb();
      }
    );
  }

  static delete(idMatkul, cb) {
    db.run("DELETE FROM mata_kuliah WHERE id_matkul = ?", [idMatkul], (err) => {
      if (err) return console.log("Tolong hubungi administrator!", err);
      cb();
    });
  }
}
