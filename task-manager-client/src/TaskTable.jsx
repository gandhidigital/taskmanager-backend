import React, { useState } from 'react';
import './TaskTable.css';
import EditTaskModal from './EditTaskModal';

function TaskTable({ tasks, setTasks, onCreateSubtask, users }) {
  const [expandedTasks, setExpandedTasks] = useState([]);
  const [modalTask, setModalTask] = useState(null);

  const toggleSubtasks = (taskId) => {
    setExpandedTasks((prev) =>
      prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]
    );
  };

  const getUserName = (userId) => {
    const user = users.find((u) => u._id === userId);
    return user ? user.name : '';
  };

  const handleOpenModal = (task) => {
    setModalTask(task);
  };

  const handleCloseModal = () => {
    setModalTask(null);
  };

  const handleSaveModal = async (updatedTask) => {
    const newTasks = tasks.map((task) =>
      task._id === updatedTask._id ? updatedTask : task
    );
    setTasks(newTasks);

    try {
      await fetch(`/api/tasks/${updatedTask._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask),
      });
    } catch (error) {
      console.error('❌ Error al guardar los cambios desde el modal:', error);
    }

    handleCloseModal();
  };

  const renderTaskRow = (task) => {
    const isExpanded = expandedTasks.includes(task._id);
    const subtasks = tasks.filter((t) => t.parentTask === task._id);

    return (
      <React.Fragment key={task._id}>
        <tr className="task-row">
          <td>
            {task.title}
            <span style={{ marginLeft: '10px', color: '#F5333E', fontSize: '12px' }}>
              {subtasks.length > 0 && (
                <button
                  className="toggle-button"
                  onClick={() => toggleSubtasks(task._id)}
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
          <td className="action-cell">
            <img
              src="/icons/edit.svg"
              alt="Editar"
              title="Editar"
              className="icon-button"
              onClick={() => handleOpenModal(task)}
            />
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
              <td></td>
            </tr>
          ))}
      </React.Fragment>
    );
  };

  const parentTasks = tasks.filter((t) => !t.parentTask);

  return (
    <>
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
            <th></th>
          </tr>
        </thead>
        <tbody>{parentTasks.map((task) => renderTaskRow(task))}</tbody>
      </table>

      {modalTask && (
        <EditTaskModal
          task={modalTask}
          onClose={handleCloseModal}
          onSave={handleSaveModal}
          users={users}
        />
      )}
    </>
  );
}

export default TaskTable;

