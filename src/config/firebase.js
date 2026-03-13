const admin = require('firebase-admin');
const path = require('path');
const config = require('./app.config');

try {
  const serviceAccount = require(path.resolve(config.firebase.serviceAccountPath));

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: config.firebase.projectId,
  });

  console.log('✅ Firebase Admin SDK Terhubung!');
} catch (err) {
  console.error('❌ Firebase Admin SDK Gagal Terhubung:', err.message);
}

module.exports = admin;
