import React, { useState, useEffect } from 'react';
import './TaskList.css';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState('');
  const [responsible, setResponsible] = useState('');
  const [delivery, setDelivery] = useState('');

  const buildQuery = (status, responsible, delivery) => {
    const query = new URLSearchParams();
    if (status) query.append('status', status);
    if (responsible) query.append('responsible', responsible);
    if (delivery) query.append('delivery', delivery);
    return query.toString();
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(`http://localhost:3000/tasks?${buildQuery(status, responsible, delivery)}`);
        const data = await res.json();
        setTasks(data);
      } catch (error) {
        console.error('Error al obtener tareas:', error);
      }
    };
    fetchTasks();
  }, [status, responsible, delivery]);

  return (
    <div className="task-list">
      <h2>Listado de Tareas</h2>

      <div className="filters">
        <input placeholder="Filtrar por estado" value={status} onChange={(e) => setStatus(e.target.value)} />
        <input placeholder="Filtrar por responsable" value={responsible} onChange={(e) => setResponsible(e.target.value)} />
        <input type="date" value={delivery} onChange={(e) => setDelivery(e.target.value)} />
      </div>

      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <h3>{task.title}</h3>
            <p><strong>Estado:</strong> {task.status}</p>
            <p><strong>Responsable:</strong> {task.responsible?.name}</p>
            <p><strong>Entrega:</strong> {new Date(task.delivery).toLocaleDateString()}</p>
            <ul>
              {task.subtasks.map(sub => (
                <li key={sub._id}>
                  {sub.completed ? '✅' : '⬜️'} {sub.title}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;

