const hitungOffset = (halaman = 1, perHalaman = 10) => {
  return (parseInt(halaman) - 1) * parseInt(perHalaman);
};

const buatPagination = (halaman = 1, perHalaman = 10, total = 0) => {
  return {
    halaman: parseInt(halaman),
    per_halaman: parseInt(perHalaman),
    total: parseInt(total),
    total_halaman: Math.ceil(total / perHalaman),
  };
};

module.exports = { hitungOffset, buatPagination };
