const admin = require('firebase-admin');
const serviceAccount = require('./firebase-adminsdk.json');

// Inicializando o firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Inicializando o firestore
const db = admin.firestore();

// Inicializando o Auth (Autenticação)
const auth = admin.auth();

module.exports = { db, auth };