import main from "../controllers/userController.js";
import { line } from "../models/connect.js";

main({
  printMenu,
  printMahasiswa,
  printJurusan,
  printDosen,
  printMatkul,
  printKontrak,
});

function printMenu() {
  console.log(`
silahkan pilih opsi di bawah ini :
[1] Mahasiswa
[2] Jurusan
[3] Dosen
[4] Mata Kuliah
[5] Kontrak
[6] Keluar

${line}`);
}

function printMahasiswa() {
  console.log(`${line}

silahkan pilih opsi di bawah ini :
[1] Daftar Mahasiswa
[2] Cari Mahasiswa
[3] Tambah Mahasiswa
[4] Hapus Mahasiswa
[5] Kembali

${line}`);
}

function printJurusan() {
  console.log(`${line}

silahkan pilih opsi di bawah ini :
[1] Daftar Jurusan
[2] Cari Jurusan
[3] Tambah Jursan
[4] Hapus Jurusan
[5] Kembali

${line}`);
}

function printDosen() {
  console.log(`${line}

silahkan pilih opsi di bawah ini :
[1] Daftar Dosen
[2] Cari Dosen
[3] Tambah Dosen
[4] Hapus Dosen
[5] Kembali

${line}`);
}

function printMatkul() {
  console.log(`${line}

silahkan pilih opsi di bawah ini :
[1] Daftar Mata Kuliah
[2] Cari Mata Kuliah
[3] Tambah Mata Kuliah
[4] Hapus Mata Kuliah
[5] Kembali

${line}`);
}

function printKontrak() {
  console.log(`${line}

silahkan pilih opsi di bawah ini :
[1] Daftar Kontrak
[2] Cari Kontrak
[3] Tambah Kontrak
[4] Hapus Kontrak
[5] Update Nilai
[6] Kembali

${line}`);
}
