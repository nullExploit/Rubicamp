import readline from "readline";
import path from "path";
import sqlite3 from "sqlite3";
import Table from "cli-table";
const line = "=".repeat(process.stdout.columns),
  rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  }),
  dbpath = path.join(path.resolve(), "db", "university.db"),
  db = new sqlite3.Database(dbpath);

main();

function main() {
  console.log(`${line}
Welcome to Universita Pendidikan Indonesia
Jl. Setiabudhi No. 255
${line}`);
  username();
}

function username() {
  rl.question("username : ", (ans) => {
    db.get(`SELECT * FROM users WHERE username='${ans}'`, (err, row) => {
      if (err) return console.log("Tolong hubungi administrator!", err);
      else if (!row) {
        console.log("username tidak terdaftar");
        username();
      } else {
        pass(row);
      }
    });
  });
}

function pass(data) {
  rl.question("password : ", (ans) => {
    if (ans === data.password) greet(data);
    else {
      console.log("password salah!");
      pass(data);
    }
  });
}

function greet(data) {
  console.log(`${line}
Welcome, ${data.username}. Your access level is : ${data.role.toUpperCase()}
${line}`);
  mainMenu();
}

function mainMenu() {
  console.log(`
silahkan pilih opsi di bawah ini :
[1] Mahasiswa
[2] Jurusan
[3] Dosen
[4] Mata Kuliah
[5] Kontrak
[6] Keluar

${line}`);
  rl.question("Masukkan salah satu nomor dari opsi diatas : ", (ans) => {
    switch (ans) {
      case "1":
        mahasiswaMenu();
        break;
      case "2":
        jurusanMenu();
        break;
      case "3":
        dosenMenu();
        break;
      case "4":
        matkulMenu();
        break;
      case "5":
        conMenu();
        break;
      case "6":
        console.log(`${line}
Anda telah keluar`);
        main();
        break;
      default:
        console.log("Opsi tidak ditemukan, tolong masukkan ulang!");
        mainMenu();
        break;
    }
  });
}

function mahasiswaMenu() {
  console.log(`${line}

silahkan pilih opsi di bawah ini :
[1] Daftar Mahasiswa
[2] Cari Mahasiswa
[3] Tambah Mahasiswa
[4] Hapus Mahasiswa
[5] Kembali

${line}`);
  rl.question("Masukkan salah satu nomor dari opsi diatas : ", (ans) => {
    switch (ans) {
      case "1":
        mahasiswaList();
        break;
      case "2":
        findMahasiswa();
        break;
      case "3":
        addMahasiswa();
        break;
      case "4":
        delMahasiswa();
        break;
      case "5":
        mainMenu();
        break;
      default:
        console.log("Opsi tidak ditemukan, tolong masukkan ulang!");
        mahasiswaMenu();
        break;
    }
  });
}

function mahasiswaList() {
  const table = new Table({
    head: [
      "Nim",
      "Nama",
      "Tanggal Lahir",
      "Alamat",
      "Kode Jurusan",
      "Nama Jurusan",
    ],
  });
  db.all(
    "SELECT * FROM mahasiswa LEFT JOIN jurusan USING(id_jurusan)",
    (err, rows) => {
      if (err) return console.log("Tolong hubungi administrator!");
      else if (!rows) console.log("Data tidak ditemukan!");
      else {
        rows.forEach((row) => {
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
      }
      mahasiswaMenu();
    }
  );
}

function findMahasiswa() {
  rl.question("Masukkan NIM Mahasiswa : ", (ans) => {
    db.get(`SELECT * FROM mahasiswa WHERE nim='${ans}'`, (err, row) => {
      if (err) return console.log("Tolong hubungi administrator!");
      else if (!row) {
        console.log(`Mahasiswa dengan NIM ${ans}, tidak terdaftar`);
        mahasiswaMenu();
      } else {
        console.log(`${line}
Detail mahasiswa dengan NIM '${ans}' :
NIM         : ${row.nim}
Nama        : ${row.nama}
Alamat      : ${row.alamat}
Jurusan     : ${row.id_jurusan}
`);
        mahasiswaMenu();
      }
    });
  });
}

function addMahasiswa() {
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
  db.all(
    "SELECT * FROM mahasiswa LEFT JOIN jurusan USING(id_jurusan)",
    (err, rows) => {
      if (err) return console.log("Tolong hubungi administrator!", err);
      rows.forEach((row) => {
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
      addCred(rows);
    }
  );
}

function addCred(sample) {
  rl.question("NIM : ", (nim) => {
    if (nim.length != sample[0].nim.length) {
      console.log("Panjang NIM tidak sesuai");
      addCred(sample);
    } else {
      sample.forEach((sam) => {
        if (sam.nim.includes(nim)) {
          console.log("NIM sudah terpakai");
          addCred(sample);
        }
      });
      rl.question("Nama : ", (nama) => {
        if (!nama) {
          console.log("Isi Nama terlebih dahulu!");
          addCred(sample);
        } else {
          rl.question("Tanggal Lahir : ", (tgl) => {
            if (tgl.length != sample[0].tanggal_lahir.length) {
              console.log("Sesuaikan Format tanggal lahir!");
              addCred(sample);
            } else {
              rl.question("Alamat : ", (alm) => {
                if (!alm) {
                  console.log("Isi alamat terlebih dahulu!");
                  addCred(sample);
                } else {
                  addCredM(nim, nama, tgl, alm);
                }
              });
            }
          });
        }
      });
    }
  });
}

function addCredM(nim, nama, tgl, alm) {
  const table = new Table({
    head: ["Kode Jurusan", "Nama Jurusan"],
  });
  db.all("SELECT * FROM jurusan", (err, rows) => {
    if (err) return console.log("Tolong hubungi administrator!", err);
    rows.forEach((row) => {
      table.push([row.id_jurusan, row.nama_jurusan]);
    });
    console.log(table.toString());
    rl.question("Kode Jurusan : ", (j) => {
      if (j.length != rows[0].id_jurusan.length) {
        console.log("Panjang Kode Jurusan tidak sesuai!");
        addCredM(nim, nama, tgl, alm);
      } else {
        for (let row of rows) {
          if (row.id_jurusan.includes(j)) {
            db.run("INSERT INTO mahasiswa VALUES(?, ?, ?, ?, ?)", [
              nim,
              nama,
              tgl,
              alm,
              j,
            ]);
            console.log("mahasiswa telah ditambahkan");
            return mahasiswaMenu();
          } else {
            return (
              console.log("Kode Jurusan tidak ada!"),
              addCredM(nim, nama, tgl, alm)
            );
          }
        }
      }
    });
  });
}

function delMahasiswa() {
  rl.question("Masukkan NIM Mahasiswa : ", (ans) => {
    db.get(`SELECT * FROM mahasiswa WHERE nim='${ans}'`, (err, row) => {
      if (err) return console.log("Tolong hubungi administrator!", err);
      else if (!row) {
        console.log(`Mahasiswa dengan nim ${ans}, tidak terdaftar`);
        mahasiswaMenu();
      } else {
        db.run(`DELETE FROM mahasiswa WHERE nim='${ans}'`);
        console.log(`Data Mahasiswa ${ans}, telah dihapus`);
        mahasiswaMenu();
      }
    });
  });
}

function jurusanMenu() {
  console.log(`${line}

silahkan pilih opsi di bawah ini :
[1] Daftar Jurusan
[2] Cari Jurusan
[3] Tambah Jursan
[4] Hapus Jurusan
[5] Kembali

${line}`);
  rl.question("Masukkan salah satu nomor dari opsi diatas : ", (ans) => {
    switch (ans) {
      case "1":
        jurusanList();
        break;
      case "2":
        findJurusan();
        break;
      case "3":
        addJurusan();
        break;
      case "4":
        delJurusan();
        break;
      case "5":
        mainMenu();
        break;
      default:
        console.log("Opsi tidak ditemukan, tolong masukkan ulang!");
        jurusanMenu();
        break;
    }
  });
}

function jurusanList() {
  const table = new Table({
    head: ["Kode Jurusan", "Nama Jurusan"],
  });
  db.all("SELECT * FROM jurusan", (err, rows) => {
    if (err) return console.log("Tolong hubungi administrator!", err);
    else if (!rows) console.log("Data tidak ditemukan!");
    else {
      rows.forEach((row) => {
        table.push([row.id_jurusan, row.nama_jurusan]);
      });
      console.log(table.toString());
    }
    jurusanMenu();
  });
}

function findJurusan() {
  rl.question("Masukkan Kode Jurusan : ", (ans) => {
    db.get(`SELECT * FROM jurusan WHERE id_jurusan='${ans}'`, (err, row) => {
      if (err) return console.log("Tolong hubungi administrator!");
      else if (!row) {
        console.log(`Jurusan dengan Kode Jurusan ${ans}, tidak terdaftar`);
        jurusanMenu();
      } else {
        console.log(`${line}
Detail Jurusan dengan Kode '${ans}' :
Kode Jurusan : ${row.id_jurusan}
Nama Jurusan : ${row.nama_jurusan}
`);
        jurusanMenu();
      }
    });
  });
}

function addJurusan() {
  console.log("Lengkapi data di bawah ini : ");
  const table = new Table({
    head: ["Kode Jurusan", "Nama Jurusan"],
  });
  db.all("SELECT * FROM jurusan", (err, rows) => {
    if (err) return console.log("Tolong hubungi administrator!", err);
    rows.forEach((row) => {
      table.push([row.id_jurusan, row.nama_jurusan]);
    });
    console.log(table.toString());
    addCredJ(rows);
  });
}

function addCredJ(rows) {
  rl.question("Kode Jurusan : ", (idj) => {
    if (idj.length != rows[0].id_jurusan.length) {
      console.log("Panjang Kode Jurusan tidak sesuai");
      addCredJ(rows);
    }
    rows.forEach((row) => {
      if (idj.includes(row.id_jurusan)) {
        console.log("Kode Jurusan sudah terpakai");
        addCredJ(rows);
      }
    });
    rl.question("Nama Jurusan : ", (j) => {
      if (!j) {
        console.log("Isi Nama Jurusan!");
        addCredJ(rows);
      } else {
        db.run("INSERT INTO jurusan VALUES(?, ?)", [idj, j]);
        console.log("jurusan telah ditambahkan ke database");
        jurusanMenu();
      }
    });
  });
}

function delJurusan() {
  rl.question("Masukkan Kode Jurusan : ", (ans) => {
    db.get(`SELECT * FROM jurusan WHERE id_jurusan='${ans}'`, (err, row) => {
      if (err) return console.log("Tolong hubungi administrator!", err);
      else if (!row) {
        console.log(`Jurusan dengan Kode Jurusan ${ans}, tidak terdaftar`);
        jurusanMenu();
      } else {
        db.run(`DELETE FROM jurusan WHERE id_jurusan='${ans}'`);
        console.log(`Data Jurusan ${ans}, telah dihapus`);
        jurusanMenu();
      }
    });
  });
}

function dosenMenu() {
  console.log(`${line}

silahkan pilih opsi di bawah ini :
[1] Daftar Dosen
[2] Cari Dosen
[3] Tambah Dosen
[4] Hapus Dosen
[5] Kembali

${line}`);
  rl.question("Masukkan salah satu nomor dari opsi diatas : ", (ans) => {
    switch (ans) {
      case "1":
        dosenList();
        break;
      case "2":
        findDosen();
        break;
      case "3":
        addDosen();
        break;
      case "4":
        delDosen();
        break;
      case "5":
        mainMenu();
        break;
      default:
        console.log("Opsi tidak ditemukan, tolong masukkan ulang!");
        dosenMenu();
        break;
    }
  });
}

function dosenList() {
  const table = new Table({
    head: ["NIP", "Nama Dosen"],
  });
  db.all("SELECT * FROM dosen", (err, rows) => {
    if (err) return console.log("Tolong hubungi administrator!");
    else if (!rows) console.log("Data tidak ditemukan!");
    else {
      rows.forEach((row) => {
        table.push([row.nip, row.nama]);
      });
      console.log(table.toString());
    }
    dosenMenu();
  });
}

function findDosen() {
  rl.question("Masukkan NIP Dosen : ", (ans) => {
    db.get(`SELECT * FROM dosen WHERE nip='${ans}'`, (err, row) => {
      if (err) return console.log("Tolong hubungi administrator!");
      else if (!row) {
        console.log(`Dosen dengan NIP ${ans}, tidak terdaftar`);
        dosenMenu();
      } else {
        console.log(`${line}
Detail Dosen dengan NIP '${ans}' :
NIP         : ${row.nip}
Nama        : ${row.nama}
`);
        dosenMenu();
      }
    });
  });
}

function addDosen() {
  console.log("Lengkapi data di bawah ini : ");
  const table = new Table({
    head: ["NIP", "Nama Dosen"],
  });
  db.all("SELECT * FROM dosen", (err, rows) => {
    if (err) return console.log("Tolong hubungi administrator!", err);
    rows.forEach((row) => {
      table.push([row.nip, row.nama]);
    });
    console.log(table.toString());
    addCredD(rows);
  });
}

function addCredD(rows) {
  rl.question("NIP : ", (nip) => {
    if (nip.length != rows[0].nip.length) {
      console.log("Panjang NIP tidak sesuai");
      addCredD(rows);
    }
    rows.forEach((row) => {
      if (nip.includes(row.nip)) {
        console.log("NIP sudah terpakai");
        addCredD(rows);
      }
    });
    rl.question("Nama Dosen : ", (d) => {
      if (!d) {
        console.log("Isi Nama Dosen!");
        addCredD(rows);
      } else {
        db.run("INSERT INTO dosen VALUES(?, ?)", [nip, d]);
        console.log("jurusan telah ditambahkan ke database");
        dosenMenu();
      }
    });
  });
}

function delDosen() {
  rl.question("Masukkan NIP : ", (ans) => {
    db.get(`SELECT * FROM dosen WHERE nip='${ans}'`, (err, row) => {
      if (err) return console.log("Tolong hubungi administrator!", err);
      else if (!row) {
        console.log(`Dosen dengan NIP ${ans}, tidak terdaftar`);
        dosenMenu();
      } else {
        db.run(`DELETE FROM dosen WHERE nip='${ans}'`);
        console.log(`Data Dosen ${ans}, telah dihapus`);
        dosenMenu();
      }
    });
  });
}

function matkulMenu() {
  console.log(`${line}

silahkan pilih opsi di bawah ini :
[1] Daftar Mata Kuliah
[2] Cari Mata Kuliah
[3] Tambah Mata Kuliah
[4] Hapus Mata Kuliah
[5] Kembali

${line}`);
  rl.question("Masukkan salah satu nomor dari opsi diatas : ", (ans) => {
    switch (ans) {
      case "1":
        matkulList();
        break;
      case "2":
        findMatkul();
        break;
      case "3":
        addMatkul();
        break;
      case "4":
        delMatkul();
        break;
      case "5":
        mainMenu();
        break;
      default:
        console.log("Opsi tidak ditemukan, tolong masukkan ulang!");
        matkulMenu();
        break;
    }
  });
}

function matkulList() {
  const table = new Table({
    head: ["Kode Mata Kuliah", "Nama Mata Kuliah", "SKS"],
  });
  db.all("SELECT * FROM mata_kuliah", (err, rows) => {
    if (err) return console.log("Tolong hubungi administrator!", err);
    else if (!rows) console.log("Data tidak ditemukan!");
    else {
      rows.forEach((row) => {
        table.push([row.id_matkul, row.nama_matkul, row.sks]);
      });
      console.log(table.toString());
    }
    matkulMenu();
  });
}

function findMatkul() {
  rl.question("Masukkan Kode Mata Kuliah : ", (ans) => {
    db.get(`SELECT * FROM mata_kuliah WHERE id_matkul='${ans}'`, (err, row) => {
      if (err) return console.log("Tolong hubungi administrator!");
      else if (!row) {
        console.log(`Mata Kuliah dengan Kode Matkul ${ans}, tidak terdaftar`);
        matkulMenu();
      } else {
        console.log(`${line}
Detail Mata Kuliah dengan Kode '${ans}' :
Kode Matkul : ${row.id_matkul}
Nama        : ${row.nama_matkul}
SKS         : ${row.sks}
`);
        matkulMenu();
      }
    });
  });
}

function addMatkul() {
  console.log("Lengkapi data di bawah ini : ");
  const table = new Table({
    head: ["Kode Mata Kuliah", "Mata Kuliah", "SKS"],
  });
  db.all("SELECT * FROM mata_kuliah", (err, rows) => {
    if (err) return console.log("Tolong hubungi administrator!", err);
    rows.forEach((row) => {
      table.push([row.id_matkul, row.nama_matkul, row.sks]);
    });
    console.log(table.toString());
    addCredK(rows);
  });
}

function addCredK(rows) {
  rl.question("Kode Matkul : ", (kmk) => {
    if (kmk.length != rows[0].id_matkul.length) {
      console.log("Panjang Kode Matkul tidak sesuai");
      addCredK(rows);
    }
    rows.forEach((row) => {
      if (kmk.includes(row.id_matkul)) {
        console.log("Kode Mata Kuliah sudah terpakai");
        addCredK(rows);
      }
    });
    rl.question("Mata Kuliah : ", (mk) => {
      if (!mk) {
        console.log("Isi Mata Kuliah!");
        addCredK(rows);
      } else {
        rows.forEach((row) => {
          if (mk.includes(row.nama_matkul)) {
            console.log("Mata Kuliah sudah terpakai");
            addCredK(rows);
          }
        });
        rl.question("SKS : ", (sks) => {
          if (sks.length != 1) {
            console.log("Panjang SKS tidak sesuai!");
            addCredK(rows);
          } else if (/[0-9]/g.test(sks)) {
            db.run("INSERT INTO mata_kuliah VALUES(?, ?, ?)", [kmk, mk, sks]);
            console.log("mata kuliah telah ditambahkan ke database");
            matkulMenu();
          } else {
            console.log("SKS harus berupa angka!");
            addCredK(rows);
          }
        });
      }
    });
  });
}

function delMatkul() {
  rl.question("Masukkan Kode Mata Kuliah : ", (ans) => {
    db.get(`SELECT * FROM mata_kuliah WHERE id_matkul='${ans}'`, (err, row) => {
      if (err) return console.log("Tolong hubungi administrator!", err);
      else if (!row) {
        console.log(
          `Mata Kuliah dengan Kode Mata Kuliah ${ans}, tidak terdaftar`
        );
        matkulMenu();
      } else {
        db.run(`DELETE FROM mata_kuliah WHERE id_matkul='${ans}'`);
        console.log(`Data Mata Kuliah ${ans}, telah dihapus`);
        matkulMenu();
      }
    });
  });
}

function conMenu() {
  console.log(`${line}

silahkan pilih opsi di bawah ini :
[1] Daftar Kontrak
[2] Cari Kontrak
[3] Tambah Kontrak
[4] Hapus Kontrak
[5] Update Nilai
[6] Kembali

${line}`);
  rl.question("Masukkan salah satu nomor dari opsi diatas : ", (ans) => {
    switch (ans) {
      case "1":
        conList();
        break;
      case "2":
        findCon();
        break;
      case "3":
        addCon();
        break;
      case "4":
        delCon();
        break;
      case "5":
        upCon();
        break;
      case "6":
        mainMenu();
        break;
      default:
        console.log("Opsi tidak ditemukan, tolong masukkan ulang!");
        conMenu();
        break;
    }
  });
}

function conList() {
  const table = new Table({
    head: ["ID", "NIM", "Nama", "Mata Kuliah", "Dosen", "Nilai"],
  });
  db.all(
    "SELECT teach.id, mahasiswa.nim, mahasiswa.nama, mata_kuliah.nama_matkul, dosen.nama AS nama_dosen, teach.nilai FROM mahasiswa LEFT JOIN teach USING(nim) LEFT JOIN mata_kuliah USING(id_matkul) LEFT JOIN dosen USING(nip) ORDER BY id;",
    (err, rows) => {
      if (err) return console.log("Tolong hubungi administrator!", err);
      else if (!rows) console.log("Data tidak ditemukan!");
      else {
        rows.forEach((row) => {
          if (!row.nilai) {
            table.push([
              row.id,
              row.nim,
              row.nama,
              row.nama_matkul,
              row.nama_dosen,
              "",
            ]);
          } else {
            table.push([
              row.id,
              row.nim,
              row.nama,
              row.nama_matkul,
              row.nama_dosen,
              row.nilai,
            ]);
          }
        });
        console.log(table.toString());
      }
      conMenu();
    }
  );
}

function findCon() {
  const table = new Table({
    head: [
      "Nim",
      "Nama",
      "Tanggal Lahir",
      "Alamat",
      "Kode Jurusan",
      "Nama Jurusan",
    ],
  });
  db.all(
    "SELECT * FROM mahasiswa LEFT JOIN jurusan USING(id_jurusan)",
    (err, rows) => {
      if (err) return console.log("Tolong hubungi administrator!");
      else if (!rows) console.log("Data tidak ditemukan!");
      rows.forEach((row) => {
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
      rl.question("Masukkan NIM Mahasiswa : ", (ans) => {
        db.all(`SELECT * FROM teach WHERE nim='${ans}'`, (err, rows) => {
          if (err) return console.log("Tolong hubungi administrator!");
          const table = new Table({
            head: ["ID", "NIM", "Kode Mata Kuliah", "NIP", "Nilai"],
          });

          if (!rows[0]) {
            console.log("NIM tidak ditemukan!");
            conMenu();
          } else {
            rows.forEach((row) => {
              table.push([row.id, row.nim, row.id_matkul, row.nip, row.nilai]);
            });
            console.log(`Daftar kontrak mahasiswa dengan NIM ${ans} adalah : `);
            console.log(table.toString());
            conMenu();
          }
        });
      });
    }
  );
}

function addCon() {
  const table = new Table({
    head: ["ID", "NIM", "Nama", "Mata Kuliah", "Dosen", "Nilai"],
  });
  db.all(
    "SELECT teach.id, mahasiswa.nim, mahasiswa.nama, mata_kuliah.nama_matkul, dosen.nama AS nama_dosen, teach.nilai FROM mahasiswa LEFT JOIN teach USING(nim) LEFT JOIN mata_kuliah USING(id_matkul) LEFT JOIN dosen USING(nip) ORDER BY id;",
    (err, rows) => {
      if (err) return console.log("Tolong hubungi administrator!", err);
      else if (!rows) console.log("Data tidak ditemukan!");
      else {
        rows.forEach((row) => {
          if (!row.nilai) {
            table.push([
              row.id,
              row.nim,
              row.nama,
              row.nama_matkul,
              row.nama_dosen,
              "",
            ]);
          } else {
            table.push([
              row.id,
              row.nim,
              row.nama,
              row.nama_matkul,
              row.nama_dosen,
              row.nilai,
            ]);
          }
        });
        console.log(table.toString());
        addCredC(rows[0].nim.length);
      }
    }
  );
}

function addCredC(sample) {
  rl.question("Masukkan NIM : ", (nim) => {
    db.get(`SELECT * FROM mahasiswa WHERE nim='${nim}'`, (err, row) => {
      if (err) return console.log("Tolong hubungi administrator!", err);
      else if (nim.length != sample) {
        console.log("Panjang NIM tidak sesuai!");
        addCredC(sample);
      } else {
        if (!row) {
          console.log(`Mahasiswa dengan NIM ${nim} tidak terdaftar`);
          conMenu();
        } else {
          const table = new Table({
            head: ["Kode Matkul", "Nama Matkul", "SKS"],
          });
          db.all("SELECT * FROM mata_kuliah", (err, rows) => {
            if (err) return console.log("Tolong hubungi administrator!", err);
            rows.forEach((row) => {
              table.push([row.id_matkul, row.nama_matkul, row.sks]);
            });
            console.log(table.toString());
            rl.question("Masukkan Kode Mata Kuliah : ", (mk) => {
              if (mk.length != rows[0].id_matkul.length) {
                console.log("Panjang Kode Mata Kuliah tidak sesuai!");
                addCredC(sample);
              } else {
                db.get(
                  `SELECT * FROM mata_kuliah WHERE id_matkul='${mk}'`,
                  (err, row) => {
                    if (err)
                      return console.log("Tolong hubungi administrator!", err);
                    else if (!row) {
                      console.log(
                        `Mata Kuliah dengan Kode ${mk} tidak terdaftar`
                      );
                      conMenu();
                    } else {
                      const table = new Table({
                        head: ["NIP", "Nama Dosen"],
                      });
                      db.all("SELECT * FROM dosen", (err, rows) => {
                        rows.forEach((row) => {
                          table.push([row.nip, row.nama]);
                        });
                        console.log(table.toString());
                        rl.question("Masukkan NIP Dosen : ", (nip) => {
                          db.get(
                            `SELECT * FROM dosen WHERE nip='${nip}'`,
                            (err, row) => {
                              if (err)
                                return console.log(
                                  "Tolong hubungi administrator!",
                                  err
                                );
                              else if (!row) {
                                console.log(
                                  `Dosen dengan NIP ${nip} tidak terdaftar`
                                );
                                conMenu();
                              } else {
                                db.run(
                                  "INSERT INTO teach (nim, id_matkul, nip) VALUES (?, ?, ?)",
                                  [nim, mk, nip]
                                );
                                console.log("kontrak telah ditambahkan");
                                const table = new Table({
                                  head: [
                                    "ID",
                                    "NIM",
                                    "Nama",
                                    "Mata Kuliah",
                                    "Dosen",
                                    "Nilai",
                                  ],
                                });
                                db.all(
                                  "SELECT teach.id, mahasiswa.nim, mahasiswa.nama, mata_kuliah.nama_matkul, dosen.nama AS nama_dosen, teach.nilai FROM mahasiswa LEFT JOIN teach USING(nim) LEFT JOIN mata_kuliah USING(id_matkul) LEFT JOIN dosen USING(nip) ORDER BY id;",
                                  (err, rows) => {
                                    if (err)
                                      return console.log(
                                        "Tolong hubungi administrator!",
                                        err
                                      );
                                    else if (!rows)
                                      console.log("Data tidak ditemukan!");
                                    else {
                                      rows.forEach((row) => {
                                        if (!row.nilai) {
                                          table.push([
                                            row.id,
                                            row.nim,
                                            row.nama,
                                            row.nama_matkul,
                                            row.nama_dosen,
                                            "",
                                          ]);
                                        } else {
                                          table.push([
                                            row.id,
                                            row.nim,
                                            row.nama,
                                            row.nama_matkul,
                                            row.nama_dosen,
                                            row.nilai,
                                          ]);
                                        }
                                      });
                                      console.log(table.toString());
                                    }
                                    conMenu();
                                  }
                                );
                              }
                            }
                          );
                        });
                      });
                    }
                  }
                );
              }
            });
          });
        }
      }
    });
  });
}

function delCon() {
  rl.question("Masukkan ID Kontrak : ", (ans) => {
    db.get(`SELECT * FROM teach WHERE id='${ans}'`, (err, row) => {
      if (err) return console.log("Tolong hubungi administrator!", err);
      else if (!row) {
        console.log(`Kontrak dengan ID ${ans}, tidak terdaftar`);
        conMenu();
      } else {
        db.run(`DELETE FROM teach WHERE id='${ans}'`);
        console.log(`Data Kontrak dengan ID ${ans}, telah dihapus`);
        conMenu();
      }
    });
  });
}

function upCon() {
  const table = new Table({
    head: ["ID", "NIM", "Nama", "Mata Kuliah", "Dosen", "Nilai"],
  });
  db.all(
    "SELECT teach.id, mahasiswa.nim, mahasiswa.nama, mata_kuliah.nama_matkul, dosen.nama AS nama_dosen, teach.nilai FROM mahasiswa LEFT JOIN teach USING(nim) LEFT JOIN mata_kuliah USING(id_matkul) LEFT JOIN dosen USING(nip) ORDER BY id;",
    (err, rows) => {
      if (err) return console.log("Tolong hubungi administrator!", err);
      else if (!rows) console.log("Data tidak ditemukan!");
      else {
        rows.forEach((row) => {
          if (!row.nilai) {
            table.push([
              row.id,
              row.nim,
              row.nama,
              row.nama_matkul,
              row.nama_dosen,
              "",
            ]);
          } else {
            table.push([
              row.id,
              row.nim,
              row.nama,
              row.nama_matkul,
              row.nama_dosen,
              row.nilai,
            ]);
          }
        });
        console.log(table.toString());
        rl.question("Masukkan NIM Mahasiswa : ", (nim) => {
          db.get(`SELECT * FROM mahasiswa WHERE nim='${nim}'`, (err, row) => {
            if (err) return console.log("Tolong hubungi administrator!", err);
            else if (!row) {
              console.log(`Mahasiswa dengan NIM ${nim} tidak terdaftar`);
              conMenu();
            } else {
              const table = new Table({
                head: ["ID", "Mata Kuliah", "Nilai"],
              });
              db.all(
                `SELECT teach.id, mata_kuliah.nama_matkul, teach.nilai FROM teach LEFT JOIN mata_kuliah USING(id_matkul) WHERE nim='${nim}'`,
                (err, rows) => {
                  if (err)
                    return console.log("Tolong hubungi administrator!", err);
                  else if (!rows[0]) {
                    console.log(
                      `Kontrak Mahasiswa dengan NIM ${nim} tidak terdaftar`
                    );
                    conMenu();
                  } else {
                    rows.forEach((row) => {
                      if (!row.nilai) {
                        table.push([row.id, row.nama_matkul, ""]);
                      } else {
                        table.push([row.id, row.nama_matkul, row.nilai]);
                      }
                    });
                    console.log(`${line}
Detail mahasiswa dengan NIM '${nim}' :
${table.toString()}
${line}`);
                    upCont(nim);
                  }
                }
              );
            }
          });
        });
      }
    }
  );
}

function upCont(nim) {
  rl.question("Masukkan ID yang akan diubah nilainya : ", (id) => {
    db.get(
      `SELECT teach.id, mata_kuliah.nama_matkul, teach.nilai FROM teach LEFT JOIN mata_kuliah USING(id_matkul) WHERE nim='${nim}' AND id='${id}'`,
      (err, row) => {
        if (err) return console.log("Tolong hubungi administrator!", err);
        else if (!row) {
          console.log(
            `Kontrak Mahasiswa ${nim} dengan ID ${id} tidak terdaftar`
          );
          conMenu();
        } else {
          rl.question("Tulis nilai yang baru : ", (nilai) => {
            if (nilai.length != 1) {
              console.log("Panjang nilai tidak sesuai!");
              conMenu();
            } else if (/[0-9]/g.test(nilai)) {
              console.log("Nilai harus berupa huruf!");
              conMenu();
            } else if (!"abcdeABCDE".includes(nilai)) {
              console.log("Nilai yang anda masukkan tidak memenuhi standar!");
              conMenu();
            } else {
              db.run("UPDATE teach SET nilai=? WHERE id=?", [
                nilai.toUpperCase(),
                id,
              ]);
              const table = new Table({
                head: ["ID", "NIM", "Nama", "Mata Kuliah", "Dosen", "Nilai"],
              });
              db.all(
                "SELECT teach.id, mahasiswa.nim, mahasiswa.nama, mata_kuliah.nama_matkul, dosen.nama AS nama_dosen, teach.nilai FROM mahasiswa LEFT JOIN teach USING(nim) LEFT JOIN mata_kuliah USING(id_matkul) LEFT JOIN dosen USING(nip) ORDER BY id;",
                (err, rows) => {
                  if (err)
                    return console.log("Tolong hubungi administrator!", err);
                  else if (!rows) console.log("Data tidak ditemukan!");
                  else {
                    rows.forEach((row) => {
                      if (!row.nilai) {
                        table.push([
                          row.id,
                          row.nim,
                          row.nama,
                          row.nama_matkul,
                          row.nama_dosen,
                          "",
                        ]);
                      } else {
                        table.push([
                          row.id,
                          row.nim,
                          row.nama,
                          row.nama_matkul,
                          row.nama_dosen,
                          row.nilai,
                        ]);
                      }
                    });
                    console.log(`Nilai telah diupdate
${table.toString()}`);
                  }
                  conMenu();
                }
              );
            }
          });
        }
      }
    );
  });
}