import React, { useState, useEffect } from 'react';
import './OtherTasks.css';
import { v4 as uuidv4 } from 'uuid'; // Import UUID generator

function OtherTasks({ updateAllTasks }) {
  const [taskList, setTaskList] = useState([]);
  const [task, setTask] = useState({
    taskId:"",
    session: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    subject: '',
    description: '',
    status: 'in progress',
  });

  const sessionOptions = ['Conducted', 'Attended', 'Organised'];

  useEffect(() => {
    fetchOtherTasks();
  }, []);

  const fetchOtherTasks = async () => {
    try {
      const response = await fetch("http://localhost:8000/getOtherTask");
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const tasks = await response.json();
      setTaskList(tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({
      ...task,
      [name]: value,
    });
  };

  const generateTaskId = () => {
    return uuidv4();
  }

  const handleTaskcompleted = () => {
    const existingTask = taskList.find(
      (t) => t.session === task.session && t.startDate === task.startDate
    );
  
    if (existingTask) {
      const updatedTaskList = taskList.map((t) =>
        t === existingTask ? { ...t, status: task.status } : t
      );
      setTaskList(updatedTaskList);
      updateAllTasks(updatedTaskList);
    } else {
      const taskId = generateTaskId(); // Generate taskId
      const updatedTaskList = [...taskList, { ...task, taskId }]; // Use generated taskId
      setTaskList(updatedTaskList);
      updateAllTasks(updatedTaskList);
  
      fetch("http://localhost:8000/otherTask", {
        method: "POST",
        body: JSON.stringify({
          taskId: taskId, // Use generated taskId
          session: task.session,
          startTime: task.startTime,
          endTime: task.endTime,
          startDate: task.startDate,
          endDate: task.endDate,
          subject: task.subject,
          description: task.description,
          status: "in progress"
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (!response.ok) {
          return response.json().then(data => {
            window.alert(data.message);
          });
        }
        window.alert('Task created successfully');
      })
      .catch(error => {
        console.error('Error:', error);
      });
  
      setTask({
        taskId: taskId, // Use generated taskId
        session: '',
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        subject: '',
        description: '',
        status: '', // Clear status after submission
      });
    }
  };
  

  // const handleStatusChange = (index, newStatus) => {
  //   const updatedTaskList = [...taskList];
  //   updatedTaskList[index].status = newStatus;
  //   setTaskList(updatedTaskList);
  //   updateAllTasks(updatedTaskList);
  // };
  const handleStatusChange = (index, newStatus) => {
    const updatedTaskList = [...taskList];
    updatedTaskList[index].status = newStatus;
    setTaskList(updatedTaskList);
    updateAllTasks(updatedTaskList);
  
    // Send POST request to update task status
    fetch("http://localhost:8000/updateTask", {
      method: "POST",
      body: JSON.stringify({
        taskId: updatedTaskList[index].taskId, // Pass taskId of the updated task
        status: newStatus, // Pass newStatus to update task status
        category: 'otherTask' // Assuming the category is 'techTask'
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(data => {
          console.error(data.error);
        });
      }
      console.log('Task status updated successfully');
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  const handleTaskDelete = (index) => {
    const updatedTaskList = [...taskList];
    updatedTaskList.splice(index, 1);
    setTaskList(updatedTaskList);
    updateAllTasks(updatedTaskList);
  };

  return (
    <div className="other-tasks-container">
    
        <h2>Create Other Task</h2>
      
      <form>
        <div className="form-group">
          <label>Session</label>
          <select
            name="session"
            value={task.session}
            onChange={handleInputChange}
            className='select'
          >
            <option value="">Select Session</option>
            {sessionOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={task.startDate}
            onChange={handleInputChange}
            className='select'
          />
        </div>
        <div className="form-group">
          <label>End Date:</label>
          <input
            type="date"
            name="endDate"
            value={task.endDate}
            onChange={handleInputChange}
            className='select'
          />
        </div>
        <div className="form-group">
          <label>Start Time:</label>
          <input
            type="time"
            name="startTime"
            value={task.startTime}
            onChange={handleInputChange}
            className='select'
          />
        </div>
        <div className="form-group">
          <label>End Time:</label>
          <input
            type="time"
            name="endTime"
            value={task.endTime}
            onChange={handleInputChange}
            className='select'
          />
        </div>
        <div className="form-group">
          <label>Subject:</label>
          <input
            type="text"
            name="subject"
            value={task.subject}
            onChange={handleInputChange}
            className='select'
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={task.description}
            onChange={handleInputChange}
            className='select'
          ></textarea>
        </div>
        <div className="form-group">
          <button type="button" onClick={handleTaskcompleted}>
            Create Task ✓
          </button>
        </div>
      </form>

      <div/>
      <div className="task-list">
        <h3>Task List</h3>
        <ul>
          {taskList.map((taskItem, index) => (
            <li key={index} className='task-item'>
              <div>
                <strong>Session:</strong> {taskItem.session}
              </div>
              <div>
                <strong>Start Date:</strong> {taskItem.startDate}
              </div>
              <div>
                <strong>End Date:</strong> {taskItem.endDate}
              </div>
              <div>
                <strong>Start Time:</strong> {taskItem.startTime}
              </div>
              <div>
                <strong>End Time:</strong> {taskItem.endTime}
              </div>
              <div>
                <strong>Subject:</strong> {taskItem.subject}
              </div>
              <div>
                <strong>Description:</strong> {taskItem.description}
              </div>
              <div>
                <strong>Status:</strong> {taskItem.status}
              </div>
              <span
                role="img"
                aria-label="completed"
                onClick={() => handleStatusChange(index, 'completed')}
              >
                ✅
              </span>
              <span
                role="img"
                aria-label="not completed"
                onClick={() => handleStatusChange(index, 'not completed')}
              >
                ❌
              </span>
              <span
                role="img"
                aria-label="in progress"
                onClick={() => handleStatusChange(index, 'in progress')}
              >
                🔄
              </span>
              <span
                role="img"
                aria-label="Delete"
                onClick={() => handleTaskDelete(index)}
              >
                🗑️
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default OtherTasks;
