import React, { useState, useEffect } from 'react';
import './TaskForm.css';

function EditTaskModal({ task, users, onClose, onSave, isSubtask }) {
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

  const buttonStyle = {
    backgroundColor: isSubtask ? '#F5A623' : '#7037FA',
    color: isSubtask ? 'black' : 'white',
  };

  const cancelClass = isSubtask ? 'cancel-button yellow' : 'cancel-button';

  return (
    <div className="modal-overlay">
      <div className="modal-content form-container">
        <h2>{isSubtask ? 'Editar Subtarea' : 'Editar Tarea'}</h2>

        <div className="form-group full-width">
          <label>Título:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group full-width">
          <label>Estado:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">Selecciona</option>
            <option value="nueva">Nueva</option>
            <option value="trabajando">Trabajando</option>
            <option value="bloqueada">Bloqueada</option>
            <option value="pendiente">Pendiente</option>
            <option value="completada">Completada</option>
          </select>
        </div>

        <div className="form-group">
          <label>Responsable:</label>
          <select value={responsible} onChange={(e) => setResponsible(e.target.value)}>
            <option value="">Selecciona</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Validador:</label>
          <select value={validator} onChange={(e) => setValidator(e.target.value)}>
            <option value="">Selecciona</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Fecha de entrega:</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <div className="form-group full-width">
          <label>Notas:</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <div className="form-buttons">
          <button onClick={handleSave} style={buttonStyle}>
            Guardar cambios
          </button>
          <button onClick={onClose} className={cancelClass}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditTaskModal;

