// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const User = require('./models/User');
const Task = require('./models/Task');
const normalizeStatus = require('./utils/normalizeStatus');

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
    const tasks = await Task.find()
      .populate('responsible')
      .populate('validator');
    res.json(tasks);
  } catch (err) {
    console.log('💥 Entrando al catch de /api/tasks');
    console.error('❌ Error al obtener tareas:', err);
    res.status(500).json({ error: err.message || 'Error al obtener tareas' });
  }
});

// Obtener una sola tarea por ID
app.get('/api/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('responsible')
      .populate('validator');

    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    res.json(task);
  } catch (err) {
    console.error('❌ Error en GET /api/tasks/:id:', err.message);
    res.status(400).json({ error: 'ID inválido o error en la búsqueda' });
  }
});

// Crear una nueva tarea
app.post('/api/tasks', async (req, res) => {
  try {
    console.log('📦 Datos recibidos al crear tarea o subtarea:', req.body);
    const taskData = {
      ...req.body,
      status: normalizeStatus(req.body.status)
    };
    const task = new Task(taskData);
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (err) {
    console.error('❌ Error en POST /api/tasks:', err.message);
    res.status(400).json({ error: 'Error al crear tarea' });
  }
});

// Actualizar una tarea por ID (PATCH)
app.patch('/api/tasks/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(updatedTask);
  } catch (err) {
    console.error('❌ Error en PATCH /api/tasks/:id:', err.message);
    res.status(400).json({ error: 'Error al actualizar tarea' });
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

// Crear un nuevo usuario
app.post('/api/users', async (req, res) => {
  try {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.error('❌ Error en POST /api/users:', err.message);
    res.status(400).json({ error: 'Error al crear usuario' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
});

