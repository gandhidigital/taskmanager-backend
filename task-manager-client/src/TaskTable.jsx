import React, { useState } from 'react';
import './TaskTable.css';

function TaskTable({ tasks, setTasks, onCreateSubtask, users }) {
  const [expandedTasks, setExpandedTasks] = useState([]);

  const toggleSubtasks = (taskId) => {
    setExpandedTasks((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    );
  };

  const getUserName = (userId) => {
    const user = users.find((u) => u._id === userId);
    return user ? user.name : '';
  };

  const renderTaskRow = (task) => {
    const isExpanded = expandedTasks.includes(task._id);
    const subtasks = tasks.filter((t) => t.parentTask === task._id);

    return (
      <React.Fragment key={task._id}>
        <tr className="task-row">
          <td>
            <span style={{ display: 'inline-flex', alignItems: 'center' }}>
              {task.title}
              {subtasks.length > 0 && (
                <button
                  className="toggle-button"
                  onClick={() => toggleSubtasks(task._id)}
                  style={{
                    marginLeft: '10px',
                    fontSize: '12px',
                    color: '#F5333E',
                  }}
                >
                  {isExpanded ? '▼' : '▶'}
                </button>
              )}
            </span>
          </td>
          <td>
            <span className={`task-pill ${task.status?.toLowerCase().replace(/\s/g, '-') || ''}`}>
              {task.status}
            </span>
          </td>
          <td>{getUserName(task.responsible)}</td>
          <td>{getUserName(task.validator)}</td>
          <td>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : ''}</td>
          <td>{task.notes}</td>
          <td>
            <button className="btn-subtarea" onClick={() => onCreateSubtask(task._id)}>
              + Agregar
            </button>
          </td>
        </tr>

        {isExpanded &&
          subtasks.map((subtask) => (
            <tr key={subtask._id} className="subtask-row">
              <td>{subtask.title}</td>
              <td>
                <span className={`task-pill ${subtask.status?.toLowerCase().replace(/\s/g, '-') || ''}`}>
                  {subtask.status}
                </span>
              </td>
              <td>{getUserName(subtask.responsible)}</td>
              <td>{getUserName(subtask.validator)}</td>
              <td>{subtask.dueDate ? new Date(subtask.dueDate).toLocaleDateString() : ''}</td>
              <td>{subtask.notes}</td>
              <td></td>
            </tr>
          ))}
      </React.Fragment>
    );
  };

  const parentTasks = tasks.filter((t) => !t.parentTask);

  return (
    <table className="task-table">
      <thead>
        <tr>
          <th>Título</th>
          <th>Estado</th>
          <th>Responsable</th>
          <th>Validador</th>
          <th>Entrega</th>
          <th>Notas</th>
          <th>Subtareas</th>
        </tr>
      </thead>
      <tbody>
        {parentTasks.map((task) => renderTaskRow(task))}
      </tbody>
    </table>
  );
}

export default TaskTable;

