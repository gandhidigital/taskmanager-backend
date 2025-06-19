import React, { useState } from 'react';
import './TaskTable.css';
import EditTaskModal from './EditTaskModal';

function TaskTable({ tasks, setTasks, onCreateSubtask, users }) {
  const [expandedTasks, setExpandedTasks] = useState([]);
  const [modalTask, setModalTask] = useState(null);
  const [isSubtaskEdit, setIsSubtaskEdit] = useState(false);
  const [editingStatusId, setEditingStatusId] = useState(null);
  const [tempStatus, setTempStatus] = useState('');

  const toggleSubtasks = (taskId) => {
    setExpandedTasks((prev) =>
      prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]
    );
  };

  const getUserName = (userId) => {
    const user = users.find((u) => u._id === userId);
    return user ? user.name : '';
  };

  const handleOpenModal = (task, isSubtask = false) => {
    setModalTask(task);
    setIsSubtaskEdit(isSubtask);
  };

  const handleCloseModal = () => {
    setModalTask(null);
    setIsSubtaskEdit(false);
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

  const handleStatusClick = (task) => {
    setEditingStatusId(task._id);
    setTempStatus(task.status);
  };

  const handleStatusChange = (e) => {
    setTempStatus(e.target.value);
  };

  const handleStatusBlur = async (task) => {
    const updatedTask = { ...task, status: tempStatus };

    const newTasks = tasks.map((t) =>
      t._id === task._id ? updatedTask : t
    );
    setTasks(newTasks);

    try {
      await fetch(`/api/tasks/${task._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask),
      });
    } catch (error) {
      console.error('❌ Error al guardar el nuevo estado:', error);
    }

    setEditingStatusId(null);
  };

  const renderStatusCell = (task) => {
    return editingStatusId === task._id ? (
      <select
        className="status-dropdown"
        value={tempStatus}
        onChange={handleStatusChange}
        onBlur={() => handleStatusBlur(task)}
        autoFocus
      >
        <option value="nueva">Nueva</option>
        <option value="trabajando">Trabajando</option>
        <option value="bloqueada">Bloqueada</option>
        <option value="pendiente">Pendiente</option>
        <option value="completada">Completada</option>
      </select>
    ) : (
      <span
        className={`task-pill ${task.status?.toLowerCase().replace(/\s/g, '-') || ''}`}
        onClick={() => handleStatusClick(task)}
      >
        {task.status}
      </span>
    );
  };

  const renderTaskRow = (task) => {
    const isExpanded = expandedTasks.includes(task._id);
    const subtasks = tasks.filter((t) => t.parentTask === task._id);

    return (
      <React.Fragment key={task._id}>
        <tr className="task-row">
          <td>
            {task.title}
            {subtasks.length > 0 && (
              <span style={{ marginLeft: '10px' }}>
                <button
                  className="toggle-button"
                  onClick={() => toggleSubtasks(task._id)}
                >
                  {isExpanded ? '▼' : '▶'}
                </button>
              </span>
            )}
          </td>
          <td>{renderStatusCell(task)}</td>
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
              onClick={() => handleOpenModal(task, false)}
            />
          </td>
        </tr>

        {isExpanded &&
          subtasks.map((subtask) => (
            <tr key={subtask._id} className="subtask-row">
              <td>{subtask.title}</td>
              <td>{renderStatusCell(subtask)}</td>
              <td>{getUserName(subtask.responsible)}</td>
              <td>{getUserName(subtask.validator)}</td>
              <td>{subtask.dueDate ? new Date(subtask.dueDate).toLocaleDateString() : ''}</td>
              <td>{subtask.notes}</td>
              <td></td>
              <td className="action-cell">
                <img
                  src="/icons/edit.svg"
                  alt="Editar Subtarea"
                  title="Editar Subtarea"
                  className="icon-button subtask"
                  onClick={() => handleOpenModal(subtask, true)}
                />
              </td>
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
          isSubtask={isSubtaskEdit}
          onClose={handleCloseModal}
          onSave={handleSaveModal}
          users={users}
        />
      )}
    </>
  );
}

export default TaskTable;

