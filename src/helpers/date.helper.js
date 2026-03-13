const { format } = require('date-fns');
const { id } = require('date-fns/locale');

const formatTgl = (tgl, pola = 'dd MMMM yyyy HH:mm') => {
  return format(new Date(tgl), pola, { locale: id });
};

const tglSekarang = () => new Date();

module.exports = { formatTgl, tglSekarang };
