require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const User = require('./models/User');
const Task = require('./models/Task');
const normalizeStatus = require('./utils/normalizeStatus'); // <- Normaliza los estados

const app = express();
app.use(cors());
app.use(bodyParser.json());

const uri = process.env.MONGO_URI;

// Conexión a MongoDB
mongoose.connect(uri)
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch(err => console.error('❌ Error de conexión:', err.message));

// Obtener todas las tareas con información de usuario
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find().populate('responsible').populate('validator');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener tareas' });
  }
});

// Crear una nueva tarea
app.post('/api/tasks', async (req, res) => {
  try {
    console.log('📦 Datos recibidos al crear tarea o subtarea:', req.body); // ← Verificación
    const taskData = {
      ...req.body,
      status: normalizeStatus(req.body.status) // ← Normaliza el status antes de guardar
    };
    const task = new Task(taskData);
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (err) {
    console.error('❌ Error en POST /api/tasks:', err.message); // ← Log de errores
    res.status(400).json({ error: 'Error al crear tarea' });
  }
});

// Obtener todos los usuarios
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
});

