require('dotenv').config();
const mongoose = require('mongoose');

const User = require('./models/User');
const Task = require('./models/Task');

const uri = process.env.MONGO_URI;

mongoose.connect(uri)
.then(async () => {
  console.log("✅ Conectado para pruebas de modelo");

  // Borrar usuarios y tareas previas con el mismo nombre o email
  await Task.deleteMany({ title: 'Revisar diseño visual' });
  await User.deleteMany({ email: 'ana@example.com' });

  // Crear usuario de prueba
  const user = await User.create({ name: 'Ana Pérez', email: 'ana@example.com' });
  console.log("👤 Usuario creado:", user);

  // Crear tarea de prueba
  const task = await Task.create({
    title: 'Revisar diseño visual',
    responsible: user._id,
    validator: null,
    status: 'Por hacer',
    subtasks: [
      { title: 'Revisar fuentes tipográficas' },
      { title: 'Alinear iconos en modo oscuro' }
    ],
    delivery: new Date(new Date().setHours(18, 0, 0, 0))
  });
  console.log("📝 Tarea creada:", task);

  // Eliminar los datos de prueba
  await Task.deleteOne({ _id: task._id });
  await User.deleteOne({ _id: user._id });
  console.log("🧹 Datos de prueba eliminados");

  await mongoose.disconnect();
  console.log("🔌 Conexión cerrada");
})
.catch(err => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});

