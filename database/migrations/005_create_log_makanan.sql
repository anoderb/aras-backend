-- TABEL: log_makanan
-- Log makanan & nutrisi harian

CREATE TABLE IF NOT EXISTS log_makanan (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pengguna_id INT NOT NULL,
    nama_makanan VARCHAR(100) NOT NULL,
    porsi DECIMAL(6, 2),
    satuan_porsi VARCHAR(20),
    kalori DECIMAL(8, 2),
    karbohidrat DECIMAL(6, 2),
    protein DECIMAL(6, 2),
    lemak DECIMAL(6, 2),
    sumber_data ENUM('manual', 'barcode', 'database_lokal'),
    barcode VARCHAR(50),
    waktu_makan ENUM('sarapan', 'makan_siang', 'makan_malam', 'camilan'),
    tgl_dicatat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pengguna_id) REFERENCES pengguna(id) ON DELETE CASCADE,
    INDEX (pengguna_id),
    INDEX (tgl_dicatat),
    INDEX (waktu_makan)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
