CREATE TABLE jurusan (
    id_jurusan CHARACTER(4) PRIMARY KEY NOT NULL,
    nama_jurusan VARCHAR(100) NOT NULL
);

CREATE TABLE mahasiswa (
    nim CHARACTER(8) PRIMARY KEY NOT NULL,
    nama VARCHAR(50) NOT NULL,
    alamat TEXT NOT NULL,
    id_jurusan CHARACTER(4) NOT NULL,
    FOREIGN KEY (id_jurusan) REFERENCES jurusan (id_jurusan)
);

CREATE TABLE dosen (
    nip CHARACTER(16) PRIMARY KEY NOT NULL,
    nama VARCHAR(50) NOT NULL
);

CREATE TABLE mata_kuliah (
    id_matkul CHARACTER(4) PRIMARY KEY NOT NULL,
    nama_matkul VARCHAR(100) NOT NULL,
    sks INT NOT NULL
);

CREATE TABLE teach (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nim CHARACTER(8) NOT NULL,
    nip CHARACTER(16) NOT NULL,
    id_matkul CHARACTER(4) NOT NULL,
    nilai CHARACTER(1) NOT NULL,
    FOREIGN KEY (nim) REFERENCES mahasiswa (nim),
    FOREIGN KEY (nip) REFERENCES dosen (nip),
    FOREIGN KEY (id_matkul) REFERENCES mata_kuliah (id_matkul)
);

INSERT INTO jurusan VALUES
('J001', 'Teknik Industri'),
('J002', 'Teknik Nuklir'),
('J003', 'Teknologi Informasi'),
('J004', 'Teknik Elektro');

INSERT INTO mahasiswa VALUES
('20622001', 'Ilham Alfarisi', 'Jakarta Selatan', 'J003'),
('20622002', 'Khaidar Ali Izetbehovic', 'Surabaya', 'J004'),
('20622003', 'Muhammad Naufal Wiksa', 'Sidoarjo', 'J001'),
('20622004', 'Imam Baihaqi', 'Semarang', 'J001'),
('20622005', 'Aditya Haydar', 'Malang', 'J003'),
('20622006', 'Muhammad Danke Ardiansyah', 'Bali', 'J003'),
('20622007', 'Hafidz Abdirrahman', 'Yogyakarta', 'J004'),
('20622008', 'Abdul Muhsi', 'Aceh', 'J001'),
('20622009', 'Fikri Tanjung', 'Padang', 'J002'),
('20622010', 'Muhammad Milado', 'Kendari', 'J002');

INSERT INTO dosen VALUES
('1968081720200410', 'Prof. Ir. Atyanto Dharoko, M.Phil., Ph.D.'),
('1985081820200410', 'Ir. Slamet Sudibyo, MT.'),
('1970081220200410', 'Dr. Ir. Djoko Wijono, M.Arch.'),
('1960081220200410', 'Dr. Ir. Laretna Trisnantari Adishakti, M.Arch.');

INSERT INTO mata_kuliah VALUES
('M001', 'Menggambar Teknik', 3),
('M002', 'Sistem Operasi', 3),
('M003', 'Probabilitas dan Statistika', 3),
('M004', 'Dasar Pemrograman', 3);

INSERT INTO teach (nim, nip, id_matkul, nilai) VALUES
('20622001', '1985081820200410', 'M002', 'A'),
('20622002', '1968081720200410', 'M003', 'B'),
('20622003', '1970081220200410', 'M001', 'A'),
('20622004', '1970081220200410', 'M001', 'A');