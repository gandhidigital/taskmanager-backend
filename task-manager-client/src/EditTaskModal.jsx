import React, { useState, useEffect } from 'react';
import './TaskForm.css'; // Reutiliza estilos del modal de creación

function EditTaskModal({ task, users, onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('');
  const [responsible, setResponsible] = useState('');
  const [validator, setValidator] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setStatus(task.status || '');
      setResponsible(task.responsible || '');
      setValidator(task.validator || '');
      setDueDate(task.dueDate ? task.dueDate.split('T')[0] : '');
      setNotes(task.notes || '');
    }
  }, [task]);

  const handleSave = () => {
    onSave({
      ...task,
      title,
      status,
      responsible,
      validator,
      dueDate,
      notes,
    });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Editar Tarea</h2>

        <label>Título:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Estado:</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Selecciona</option>
          <option value="nueva">Nueva</option>
          <option value="trabajando">Trabajando</option>
          <option value="bloqueada">Bloqueada</option>
          <option value="pendiente">Pendiente</option>
          <option value="completada">Completada</option>
        </select>

        <label>Responsable:</label>
        <select
          value={responsible}
          onChange={(e) => setResponsible(e.target.value)}
        >
          <option value="">Selecciona</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>

        <label>Validador:</label>
        <select
          value={validator}
          onChange={(e) => setValidator(e.target.value)}
        >
          <option value="">Selecciona</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>

        <label>Fecha de entrega:</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <label>Notas:</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <div className="form-buttons">
          <button onClick={handleSave} style={{ backgroundColor: '#7037FA' }}>
            Guardar cambios
          </button>
          <button onClick={onClose} className="cancel-button">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditTaskModal;

