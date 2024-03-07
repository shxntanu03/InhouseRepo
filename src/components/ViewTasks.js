import React, { useState } from 'react';
import './ViewTasks.css';

async function fetchTask(startDate, status) {
  try {
    // const formattedStartDate = formatDate(startDate); // Format the start date
    const response = await fetch("http://localhost:8000/viewTasks", {
      method: "POST",
      body: JSON.stringify({
        startDate: startDate, // Use the formatted start date
        status: status
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message);
    }

    const responseData = await response.json();
    console.log("Tasks:", responseData.tasks);
    return responseData.tasks;
  } catch (error) {
    console.error('Error:', error.message);
    window.alert('An error occurred while displaying the task.');
    return [];
  }
}

// function formatDate(inputDate) {
//   // Split the input date string by "-"
//   const parts = inputDate.split("-");
  
//   // Reorder the parts to "yyyy-mm-dd" format
//   const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
  
  
//   return formattedDate;
// }

function ViewTasks({ taskList }) {
  const [startDate, setSelectedStartDate] = useState('');
  const [status, setSelectedCategory] = useState('');
  const [displayedTasks, setDisplayedTasks] = useState([]);

  const handleStartDateChange = (e) => {
    const inputDate = e.target.value.toString();
    console.log(typeof inputDate);
    console.log(inputDate);
    setSelectedStartDate(inputDate);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleViewTask = async () => {
    const tasks = await fetchTask(startDate, status);
    setDisplayedTasks(tasks);
  };

  return (
    <div className="view-tasks-container">
      <h2>View Tasks</h2>
      <div className="filters-container">
        <div className="filter">
          <label>Select Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
          />
        </div>
        <div className="filter">
          <label>Select Category:</label>
          <select value={status} onChange={handleCategoryChange}>
            <option value="all">All</option>
            <option value="completed">completed</option>
            <option value="not completed">not completed</option>
            <option value="in progress">in progress</option>
          </select>
        </div>
      </div>
      <div className="submit-button-container">
        <button onClick={handleViewTask}>View Task</button>
      </div>
      <div className="task-list">
        {displayedTasks.map((task, index) => (
          <div key={index} className="task-item">
            <div><strong>Task Name:</strong> {task.taskName}</div>
            <div><strong>Status:</strong> {task.status}</div>
            <div><strong>Start Date:</strong> {task.startDate}</div>
            <div><strong>End Date:</strong> {task.endDate}</div>
            <div><strong>Start Time:</strong> {task.startTime}</div>
            <div><strong>End Time:</strong> {task.endTime}</div>
            <div><strong>Description:</strong> {task.description}</div> 

          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewTasks;