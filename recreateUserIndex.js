// recreateUserIndex.js
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const uri = process.env.MONGO_URI;

mongoose.connect(uri)
  .then(async () => {
    console.log('✅ Conectado a MongoDB');
    await User.collection.dropIndexes();
    console.log('🧹 Índices eliminados');
    await User.collection.createIndex({ email: 1 }, { unique: true, sparse: true });
    console.log('✅ Índice único recreado en el campo "email"');
    process.exit();
  })
  .catch(err => {
    console.error('❌ Error:', err.message);
    process.exit(1);
  });

