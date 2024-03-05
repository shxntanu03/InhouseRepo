// TaskCategoryDropdown.js

import React, { useState } from 'react';
import TaskCategory from './TaskCategory';
import './TaskCategoryDropdown.css';

const TaskCategoryDropdown = ({ categoryTitle, tasks, onTaskAction }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className={`task-category-dropdown ${isDropdownOpen ? 'open' : ''}`}>
      <div className="dropdown-header" onClick={toggleDropdown}>
        <span>{categoryTitle}</span> <span>{isDropdownOpen ? '🔽' : '🔼'}</span>
      </div>
      {isDropdownOpen && <TaskCategory tasks={tasks} onTaskAction={onTaskAction} />}
    </div>
  );
};

export default TaskCategoryDropdown;
