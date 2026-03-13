-- TABEL: artikel
-- Konten artikel kesehatan yang ditulis dokter

CREATE TABLE IF NOT EXISTS artikel (
    id INT PRIMARY KEY AUTO_INCREMENT,
    dokter_id INT NOT NULL,
    judul VARCHAR(200) NOT NULL,
    isi LONGTEXT NOT NULL,
    ringkasan TEXT,
    kategori ENUM('penyakit', 'nutrisi', 'mental_health', 'ibu_anak', 'olahraga', 'mitos_fakta') NOT NULL,
    thumbnail VARCHAR(255),
    status ENUM('draft', 'diterbitkan', 'diarsipkan') DEFAULT 'draft',
    total_dibaca INT DEFAULT 0,
    total_disimpan INT DEFAULT 0,
    tgl_terbit TIMESTAMP NULL,
    tgl_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (dokter_id) REFERENCES profil_dokter(id) ON DELETE CASCADE,
    INDEX (dokter_id),
    INDEX (kategori),
    INDEX (status),
    INDEX (tgl_terbit)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
