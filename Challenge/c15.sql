-- Task 1
SELECT * FROM mahasiswa LEFT JOIN jurusan USING(id_jurusan);

-- Task 2
ALTER TABLE mahasiswa ADD COLUMN tanggal_lahir DATE;
INSERT INTO mahasiswa (tanggal_lahir) VALUES
('2000-08-09'),
('1998-02-12'),
('2001-05-23'),
('2004-09-14'),
('2002-07-19'),
('2005-12-02'),
('2001-09-09'),
('1999-12-06'),
('2005-01-08'),
('2004-11-18'),
('2004-04-24'),
('2005-12-02'),
('2006-01-03'),
('2005-06-21'),
('2000-08-18'),
('2004-12-09'),
('2005-09-16'),
('2003-04-29'),
('1997-01-30'),
('2005-02-07'),
('2006-12-01'),
('2004-05-16'),
('2005-12-18'),
('2006-08-10'),
('1996-08-14'),
('1989-05-04'),
('1999-10-27'),
('2003-06-03'),
('2005-07-08');

SELECT nim, nama, alamat, (strftime('%Y', 'now') - strftime('%Y', tanggal_lahir)) - (strftime('%m-%d', 'now') < strftime('%m-%d', tanggal_lahir)) AS umur FROM mahasiswa GROUP BY nim  HAVING umur < 20;

-- Task 3
SELECT mahasiswa.nim, mahasiswa.nama, teach.nilai FROM mahasiswa LEFT JOIN teach USING(nim) WHERE nilai='A' OR nilai='B' GROUP BY nim;

-- Task 4
SELECT mahasiswa.nim, mahasiswa.nama, SUM(mata_kuliah.sks) AS total_sks FROM mahasiswa LEFT JOIN teach USING(nim) LEFT JOIN mata_kuliah USING(id_matkul) GROUP BY nim HAVING total_sks > 10;

-- Task 5
SELECT mahasiswa.nim, mahasiswa.nama, mata_kuliah.nama_matkul FROM mahasiswa LEFT JOIN teach USING(nim) LEFT JOIN mata_kuliah USING(id_matkul) WHERE nama_matkul='Data Mining';

-- Task 6
SELECT dosen.nip, dosen.nama , COUNT(DISTINCT mahasiswa.nim) AS total_mahasiswa FROM dosen LEFT JOIN teach USING(nip) LEFT JOIN mahasiswa USING(nim) GROUP BY dosen.nama;

-- Task 7
SELECT nim, nama, alamat, (strftime('%Y', 'now') - strftime('%Y', tanggal_lahir)) - (strftime('%m-%d', 'now') < strftime('%m-%d', tanggal_lahir)) AS umur FROM mahasiswa ORDER BY umur;

-- Task 8
SELECT mahasiswa.nim, mahasiswa.nama, teach.nilai FROM mahasiswa LEFT JOIN teach USING(nim) WHERE nilai='D' OR nilai='E';
SELECT mahasiswa.nim, mahasiswa.nama, mahasiswa.alamat, (strftime('%Y', 'now') - strftime('%Y', tanggal_lahir)) - (strftime('%m-%d', 'now') < strftime('%m-%d', tanggal_lahir)) AS umur, jurusan.id_jurusan, jurusan.nama_jurusan, dosen.nip, dosen.nama AS nama_dosen FROM mahasiswa LEFT JOIN teach USING(nim) LEFT JOIN jurusan USING(id_jurusan) LEFT JOIN dosen USING(nip) GROUP BY nim;