import React from 'react';
import './TaskTable.css';

function TaskTable({ tasks, onCreateSubtask }) {
  // Normaliza para clase CSS: sin acentos, minúsculas, sin espacios
  const normalizeStatusClass = (status) => {
    if (!status) return '';
    return status
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // elimina acentos
      .replace(/\s+/g, '-')           // reemplaza espacios por guiones
      .toLowerCase();
  };

  return (
    <div className="task-table-container">
      <h2 className="task-table-title">Lista de Tareas</h2>
      <table>
        <thead>
          <tr>
            <th className="th-custom">Título</th>
            <th className="th-custom">Estado</th>
            <th className="th-custom">Responsable</th>
            <th className="th-custom">Validador</th>
            <th className="th-custom center-wrap">Fecha<br />de entrega</th>
            <th className="th-custom">Notas</th>
            <th className="th-custom th-icon"></th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td>{task.title}</td>
              <td>
                <span className={`task-status ${normalizeStatusClass(task.status)}`}>
                  {task.status}
                </span>
              </td>
              <td>{task.responsible?.name || task.assignee || ''}</td>
              <td>{task.validator?.name || ''}</td>
              <td>
                {task.dueDate ? (
                  <span className="due-date-pill">
                    {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                ) : ''}
              </td>
              <td>{task.notes || ''}</td>
              <td>
                <button
                  className="btn-subtarea"
                  onClick={() => onCreateSubtask(task._id)}
                >
                  +
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskTable;

