-- TABEL: mengikuti
-- Relasi follow antar pengguna

CREATE TABLE IF NOT EXISTS mengikuti (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pengikut_id INT NOT NULL,
    diikuti_id INT NOT NULL,
    tgl_mengikuti TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pengikut_id) REFERENCES pengguna(id) ON DELETE CASCADE,
    FOREIGN KEY (diikuti_id) REFERENCES pengguna(id) ON DELETE CASCADE,
    UNIQUE INDEX (pengikut_id, diikuti_id),
    INDEX (pengikut_id),
    INDEX (diikuti_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
