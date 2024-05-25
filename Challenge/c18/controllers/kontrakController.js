import Dosen from "../models/Dosen.js";
import Kontrak from "../models/Kontrak.js";
import Mahasiswa from "../models/Mahasiswa.js";
import MataKuliah from "../models/MataKuliah.js";
import Table, { rl, line } from "../models/connect.js";
import { mainMenu } from "./userController.js";

export default function conMenu(cb) {
  cb.printKontrak();
  rl.question("Masukkan salah satu nomor dari opsi diatas : ", (ans) => {
    switch (ans) {
      case "1":
        conList(cb);
        break;
      case "2":
        findCon(cb);
        break;
      case "3":
        addCon(cb);
        break;
      case "4":
        delCon(cb);
        break;
      case "5":
        upCon(cb);
        break;
      case "6":
        mainMenu(cb);
        break;
      default:
        console.log("Opsi tidak ditemukan, tolong masukkan ulang!");
        conMenu(cb);
        break;
    }
  });
}

function conList(cb) {
  const table = new Table({
    head: ["ID", "NIM", "Nama", "Mata Kuliah", "Dosen", "Nilai"],
  });

  Kontrak.get((data) => {
    data.forEach((row) => {
      if (row.id) {
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
      }
    });
    return console.log(table.toString()), conMenu(cb);
  });
}

function findCon(cb) {
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
    rl.question("Masukkan NIM Mahasiswa : ", (ans) => {
      Kontrak.findByNim(ans, (data) => {
        const table = new Table({
          head: ["ID", "NIM", "Kode Mata Kuliah", "NIP", "Nilai"],
        });

        if (!data[0])
          return console.log("Kontrak tidak ditemukan!"), conMenu(cb);
        data.forEach((row) => {
          table.push([row.id, row.nim, row.id_matkul, row.nip, row.nilai]);
        });
        return (
          console.log(`Daftar kontrak mahasiswa dengan NIM ${ans} adalah : `),
          console.log(table.toString()),
          conMenu(cb)
        );
      });
    });
  });
}

function addCon(cb) {
  const table = new Table({
    head: ["ID", "NIM", "Nama", "Mata Kuliah", "Dosen", "Nilai"],
  });
  Kontrak.get((data) => {
    data.forEach((row) => {
      if (!row.nilai) {
        table.push([
          row.id || "",
          row.nim,
          row.nama,
          row.nama_matkul || "",
          row.nama_dosen || "",
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
    addCredC(data[0].nim.length, cb);
  });
}

function addCredC(sample, cb) {
  rl.question("Masukkan NIM : ", (nim) => {
    Mahasiswa.find(nim, (row) => {
      if (!row)
        return (
          console.log(`Mahasiswa dengan NIM ${nim} tidak terdaftar`),
          conMenu(cb)
        );
      else if (nim.length != sample)
        return console.log("Panjang NIM tidak sesuai!"), addCredC(sample, cb);

      const table = new Table({
        head: ["Kode Matkul", "Nama Matkul", "SKS"],
      });
      MataKuliah.all((data) => {
        data.forEach((row) => {
          table.push([row.id_matkul, row.nama_matkul, row.sks]);
        });
        console.log(table.toString());
        rl.question("Masukkan Kode Mata Kuliah : ", (mk) => {
          if (mk.length != data[0].id_matkul.length)
            return (
              console.log("Panjang Kode Mata Kuliah tidak sesuai!"),
              addCredC(sample, cb)
            );

          MataKuliah.find(mk, (row) => {
            if (!row)
              return (
                console.log(`Mata Kuliah dengan Kode ${mk} tidak terdaftar`),
                conMenu(cb)
              );

            const table = new Table({
              head: ["NIP", "Nama Dosen"],
            });

            Dosen.all((data) => {
              data.forEach((row) => {
                table.push([row.nip, row.nama]);
              });

              console.log(table.toString());
              rl.question("Masukkan NIP Dosen : ", (nip) => {
                Dosen.find(nip, (row) => {
                  if (!row)
                    return (
                      console.log(`Dosen dengan NIP ${nip} tidak terdaftar`),
                      conMenu(cb)
                    );

                  Kontrak.create(nim, mk, nip, () => {
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
                    Kontrak.get((data) => {
                      data.forEach((row) => {
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

                      return console.log(table.toString()), conMenu(cb);
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
}

function delCon(cb) {
  rl.question("Masukkan ID Kontrak : ", (ans) => {
    Kontrak.findByID(ans, (row) => {
      if (!row)
        return (
          console.log(`Kontrak dengan ID ${ans}, tidak terdaftar`), conMenu(cb)
        );
      Kontrak.delete(ans, () => {
        return (
          console.log(`Data Kontrak dengan ID ${ans}, telah dihapus`),
          conMenu(cb)
        );
      });
    });
  });
}

function upCon(cb) {
  const table = new Table({
    head: ["ID", "NIM", "Nama", "Mata Kuliah", "Dosen", "Nilai"],
  });
  Kontrak.get((data) => {
    data.forEach((row) => {
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
      Mahasiswa.find(nim, (row) => {
        if (!row)
          return (
            console.log(`Mahasiswa dengan NIM ${nim} tidak terdaftar`),
            conMenu(cb)
          );
        const table = new Table({
          head: ["ID", "Mata Kuliah", "Nilai"],
        });
        Kontrak.get(nim, (data) => {
          if (!data[0])
            return (
              console.log(
                `Kontrak Mahasiswa dengan NIM ${nim} tidak terdaftar`
              ),
              conMenu(cb)
            );
          data.forEach((row) => {
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
          upCont(nim, cb);
        });
      });
    });
  });
}

function upCont(nim, cb) {
  rl.question("Masukkan ID yang akan diubah nilainya : ", (id) => {
    Kontrak.get(nim, id, (data) => {
      if (!data[0])
        return (
          console.log(
            `Kontrak Mahasiswa ${nim} dengan ID ${id} tidak terdaftar`
          ),
          conMenu(cb)
        );
      rl.question("Tulis nilai yang baru : ", (nilai) => {
        if (nilai.length != 1)
          return console.log("Panjang nilai tidak sesuai!"), conMenu(cb);
        else if (/[0-9]/g.test(nilai))
          return console.log("Nilai harus berupa huruf!"), conMenu(cb);
        else if (!"abcdeABCDE".includes(nilai))
          return (
            console.log("Nilai yang anda masukkan tidak memenuhi standar!"),
            conMenu(cb)
          );

        Kontrak.update(nilai.toUpperCase(), id, () => {
          const table = new Table({
            head: ["ID", "NIM", "Nama", "Mata Kuliah", "Dosen", "Nilai"],
          });

          Kontrak.get((data) => {
            data.forEach((row) => {
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
            conMenu(cb);
          });
        });
      });
    });
  });
}
