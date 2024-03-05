// ViewTasks.js
import React, { useState } from 'react';
import './ViewTasks.css';

function ViewTasks({ taskList }) {

  const [selectedStartDate, setSelectedStartDate] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleStartDateChange = (e) => {
    setSelectedStartDate(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filterTasks = () => {
    
    return taskList.filter((task) => {
      const isStartDateMatch =
        selectedStartDate ? task.startDate === selectedStartDate : true;

      const isCategoryMatch =
        selectedCategory === 'all' ? true : task.status === selectedCategory;

      return isStartDateMatch && isCategoryMatch;

    });
  };



  return (

    <div className="view-tasks-container">

      <h2>View Tasks</h2>

      <div className="filters-container">

        <div className="filter">
          <label>Select Start Date:</label>
          <input
            type="date"
            value={selectedStartDate}
            onChange={handleStartDateChange}
          />
        </div>

        <div className="filter">
          <label>Select Category:</label>
          <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="not completed">Not Completed</option>
            <option value="in progress">In Progress</option>
          </select>
        </div>

      </div>



      <div className="task-list">

        {filterTasks().map((task, index) => (
          <div key={index} className="task-item">
            <div>
              <strong>Start Date:</strong> {task.startDate}
            </div>
            <div>
              <strong>Start Time:</strong> {task.startTime}
            </div>
            <div>
              <strong>End Time:</strong> {task.endTime}
            </div>
            <div>
              <strong>Description:</strong> {task.description}
            </div>
            <div>
              <strong>Status:</strong> {task.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewTasks;
