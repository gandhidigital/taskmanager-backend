// deleteAllAtlasTasks.js
const mongoose = require('mongoose');
const Task = require('./models/Task');

const uri = 'mongodb+srv://mdgo80:dgm5a8n11e14lo@klommercedb.t7nahr3.mongodb.net/?retryWrites=true&w=majority&appName=KlommerceDB';

mongoose.connect(uri)
  .then(async () => {
    const result = await Task.deleteMany({});
    console.log(`🧹 Tareas eliminadas en Atlas: ${result.deletedCount}`);
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error('❌ Error al conectar o eliminar:', err.message);
  });

