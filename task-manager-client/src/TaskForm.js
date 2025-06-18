import React, { useEffect, useState } from 'react';
import './TaskForm.css';

function TaskForm({ onSubmit, onClose, parentTask, isSubtask, users = [] }) {
  const [formData, setFormData] = useState({
    title: '',
    status: '',
    responsible: '',
    validator: '',
    dueDate: '',
    notes: '',
    parentTask: isSubtask ? parentTask : null
  });

  useEffect(() => {
    if (isSubtask) {
      setFormData((prev) => ({ ...prev, parentTask }));
    }
  }, [parentTask, isSubtask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content form-container">
        <h2>{isSubtask ? 'Agregar Subtarea' : 'Crear Nueva Tarea'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group full-width">
            <input
              type="text"
              name="title"
              placeholder="Título"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group full-width">
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona estado</option>
              <option value="Nueva">Nueva</option>
              <option value="Trabajando">Trabajando</option>
              <option value="Bloqueada">Bloqueada</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Completada">Completada</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <select
                name="responsible"
                value={formData.responsible}
                onChange={handleChange}
              >
                <option value="">Responsable</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>{user.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <select
                name="validator"
                value={formData.validator}
                onChange={handleChange}
              >
                <option value="">Validador</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>{user.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group full-width">
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-group full-width">
            <textarea
              name="notes"
              placeholder="Notas"
              value={formData.notes}
              onChange={handleChange}
            />
          </div>

          <div className="form-buttons">
            <button type="submit">Guardar</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;

