import { db } from "./connect.js";

export default class Jurusan {
  constructor(idJurusan, namaJurusan) {
    this.idJurusan = idJurusan;
    this.namaJurusan = namaJurusan;
  }

  static all(cb) {
    db.all("SELECT * FROM jurusan", (err, rows) => {
      if (err) return console.log("Tolong hubungi administrator!", err);
      cb(rows);
    });
  }

  static find(j, cb) {
    db.get("SELECT * FROM jurusan WHERE id_jurusan = ?", [j], (err, row) => {
      if (err) return console.log("Tolong hubungi administrator!", err);
      cb(row);
    });
  }

  static create(idJurusan, namaJurusan, cb) {
    db.run(
      "INSERT INTO jurusan VALUES (?, ?)",
      [idJurusan, namaJurusan],
      (err) => {
        if (err) return console.log("Tolong hubungi administrator!", err);
        cb();
      }
    );
  }

  static delete(idJurusan, cb) {
    db.run("DELETE FROM jurusan WHERE id_jurusan = ?", [idJurusan], (err) => {
      if (err) return console.log("Tolong hubungi administrator!", err);
      cb();
    });
  }
}
