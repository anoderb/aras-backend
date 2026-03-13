const { gagal } = require('../helpers/response.helper');

const validate = (skema) => {
  return (req, res, next) => {
    const { error } = skema.validate(req.body, {
      abortEarly: false, // Ambil semua error, jangan berhenti di yang pertama
      errors: {
        wrap: {
          label: '',
        },
      },
    });

    if (error) {
      const detailError = error.details.map((d) => d.message).join(', ');
      return gagal(res, 'Validasi input gagal', 400, detailError);
    }

    next();
  };
};

module.exports = validate;
