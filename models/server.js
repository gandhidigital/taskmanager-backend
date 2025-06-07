require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const User = require('./models/User');
const Task = require('./models/Task');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const uri = process.env.MONGO_URI;

mongoose.connect(uri)
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch(err => console.error('❌ Error de conexión:', err.message));

// Obtener usuarios
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// Obtener tareas con populate
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find().populate('responsible').populate('validator');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener tareas' });
  }
});

// Crear nueva tarea
app.post('/api/tasks', async (req, res) => {
  try {
    const newTask = new Task(req.body);
    const savedTask = await newTask.save();
    const populatedTask = await Task.findById(savedTask._id).populate('responsible').populate('validator');
    res.status(201).json(populatedTask);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear tarea' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
});

