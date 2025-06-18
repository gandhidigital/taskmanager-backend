const mongoose = require('mongoose');
const Task = require('./models/task');

async function deleteAllTasks() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/taskmanager');
    const result = await Task.deleteMany({});
    console.log(`🧹 Tareas eliminadas: ${result.deletedCount}`);
  } catch (err) {
    console.error('Error eliminando tareas:', err);
  } finally {
    mongoose.connection.close();
  }
}

deleteAllTasks();

