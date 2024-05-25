import { db } from "./connect.js";

export default class Kontrak {
  constructor(nim, nip, idMatkul, nilai) {
    this.nim = nim;
    this.nip = nip;
    this.idMatkul = idMatkul;
    this.nilai = nilai;
  }

  static all(cb) {
    db.all("SELECT * FROM teach", (err, rows) => {
      if (err) return console.log("Tolong hubungi administrator!", err);
      cb(rows);
    });
  }

  static get(param, paramId, cb) {
    if (typeof arguments[0] === "function") {
      db.all(
        "SELECT teach.id, mahasiswa.nim, mahasiswa.nama, mata_kuliah.nama_matkul, dosen.nama AS nama_dosen, teach.nilai FROM mahasiswa LEFT JOIN teach USING(nim) LEFT JOIN mata_kuliah USING(id_matkul) LEFT JOIN dosen USING(nip) ORDER BY id",
        (err, rows) => {
          if (err) return console.log("Tolong hubungi administrator!", err);
          param(rows);
        }
      );
    } else if (typeof arguments[1] === "function") {
      db.all(
        "SELECT teach.id, mahasiswa.nim, mahasiswa.nama, mata_kuliah.nama_matkul, dosen.nama AS nama_dosen, teach.nilai FROM mahasiswa LEFT JOIN teach USING(nim) LEFT JOIN mata_kuliah USING(id_matkul) LEFT JOIN dosen USING(nip) WHERE nim = ? ORDER BY id",
        [param],
        (err, rows) => {
          if (err) return console.log("Tolong hubungi administrator!", err);
          paramId(rows);
        }
      );
    } else {
      db.all(
        "SELECT teach.id, mahasiswa.nim, mahasiswa.nama, mata_kuliah.nama_matkul, dosen.nama AS nama_dosen, teach.nilai FROM mahasiswa LEFT JOIN teach USING(nim) LEFT JOIN mata_kuliah USING(id_matkul) LEFT JOIN dosen USING(nip) WHERE nim = ? AND id = ? ORDER BY id",
        [param, paramId],
        (err, rows) => {
          if (err) return console.log("Tolong hubungi administrator!", err);
          cb(rows)
        }
      );
    }
  }

  static findByNim(nim, cb) {
    db.all("SELECT * FROM teach WHERE nim = ?", [nim], (err, rows) => {
      if (err) return console.log("Tolong hubungi administrator!", err);
      cb(rows);
    });
  }

  static findByID(id, cb) {
    db.all("SELECT * FROM teach WHERE id = ?", [id], (err, rows) => {
      if (err) return console.log("Tolong hubungi administrator!", err);
      cb(rows);
    });
  }

  static create(nim, idMatkul, nip, cb) {
    db.run(
      "INSERT INTO teach (nim, id_matkul, nip) VALUES (?, ?, ?)",
      [nim, idMatkul, nip],
      (err) => {
        if (err) return console.log("Tolong hubungi administrator!", err);
        cb();
      }
    );
  }

  static update(nilai, id, cb) {
    db.run("UPDATE teach SET nilai = ? WHERE id = ?", [nilai, id], (err) => {
      if (err) return console.log("Tolong hubungi administrator!", err);
      cb();
    });
  }

  static delete(id, cb) {
    db.run("DELETE FROM teach WHERE id = ?", [id], (err) => {
      if (err) return console.log("Tolong hubungi administrator!", err);
      cb();
    });
  }
}
