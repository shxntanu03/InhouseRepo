// TaskCategory.js

import React from 'react';
import './TaskCategory.css';

const TaskCategory = ({ tasks, onTaskAction }) => {
  return (
    <div className="task-category">
      {tasks.map((task) => (
        <div key={task.id} className="task-item">
          <div className="task-item-header" onClick={() => onTaskAction(task.id, 'toggle')}>
            <strong>{task.name}</strong> - {task.startTime} to {task.endTime} on {task.date} - {task.subject} - {task.batch} - {task.class}
          </div>
          <div className={`task-details ${task.status === 'toggle' ? 'open' : ''}`}>
            <div>{task.description}</div>
            <div>Status: {task.status}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskCategory;
