const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('🔌 Conectado a MongoDB');
    const result = await User.deleteMany({});
    console.log(`🧹 Usuarios eliminados: ${result.deletedCount}`);
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('❌ Error al conectar a MongoDB:', err);
  });

