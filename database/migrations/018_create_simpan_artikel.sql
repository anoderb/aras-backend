-- TABEL: simpan_artikel
-- Artikel yang di-bookmark user

CREATE TABLE IF NOT EXISTS simpan_artikel (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pengguna_id INT NOT NULL,
    artikel_id INT NOT NULL,
    tgl_disimpan TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pengguna_id) REFERENCES pengguna(id) ON DELETE CASCADE,
    FOREIGN KEY (artikel_id) REFERENCES artikel(id) ON DELETE CASCADE,
    UNIQUE INDEX (pengguna_id, artikel_id),
    INDEX (pengguna_id),
    INDEX (artikel_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
