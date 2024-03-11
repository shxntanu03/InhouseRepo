// // 






// // PersonalTasks.js
// import React, { useState, useEffect } from 'react';
// import './PersonalTasks.css';

// function PersonalTasks({ updateAllTasks }) {
//   const [taskList, setTaskList] = useState([]);
//   const [task, setTask] = useState({
//     taskName: '',
//     startDate: '',
//     endDate: '',
//     startTime: '',
//     endTime: '',
//     description: '',
//     status: 'in progress',
//   });

//   useEffect(() => {
//     fetchPersonalTasks();
//   }, []);

//   const fetchPersonalTasks = async () => {
//     try {
//       const response = await fetch("http://localhost:8000/getPersonalTask");
//       if (!response.ok) {
//         throw new Error('Failed to fetch tasks');
//       }
//       const tasks = await response.json();
//       setTaskList(tasks);
//     } catch (error) {
//       console.error('Error fetching tasks:', error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setTask({
//       ...task,
//       [name]: value,
//     });
//   };

//   const handleTaskcompleted = () => {
//     const updatedTaskList = [...taskList, { ...task }];
//     setTaskList(updatedTaskList);

//     fetch("http://localhost:8000/personalTask", {
//       method: "POST",
//       body: JSON.stringify({
//         taskName: task.taskName,
//         startTime: task.startTime,
//         endTime: task.endTime,
//         startDate: task.startDate,
//         endDate: task.endDate,
//         description: task.description,
//         status: task.status
//       }),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     })
//     .then(response => {
//       if (!response.ok) {
//         return response.json().then(data => {
//           window.alert(data.message);
//         });
//       }
//       window.alert('Task created successfully');
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });

//     setTask({
//       taskName: '',
//       startDate: '',
//       endDate: '',
//       startTime: '',
//       endTime: '',
//       description: '',
//       status: '',
//     });

//     updateAllTasks(updatedTaskList);
//   };

//   const handleStatusChange = (index, newStatus) => {
//     const updatedTaskList = [...taskList];
//     updatedTaskList[index].status = newStatus;
//     setTaskList(updatedTaskList);
//     updateAllTasks(updatedTaskList);
//   };

//   const handleTaskDelete = (index) => {
//     const updatedTaskList = [...taskList];
//     updatedTaskList.splice(index, 1);
//     setTaskList(updatedTaskList);
//     updateAllTasks(updatedTaskList);
//   };

//   return (
//     <div className="personal-task-container">
//       <h2>Create Personal Task</h2>
//       <form>
//         <div className="form-group">
//           <label>Task Name:</label>
//           <input
//             type="text"
//             name="taskName"
//             value={task.taskName}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div className="form-group">
//           <label>Start Date:</label>
//           <input
//             type="date"
//             name="startDate"
//             value={task.startDate}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div className="form-group">
//           <label>End Date:</label>
//           <input
//             type="date"
//             name="endDate"
//             value={task.endDate}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div className="form-group">
//           <label>Start Time:</label>
//           <input
//             type="time"
//             name="startTime"
//             value={task.startTime}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div className="form-group">
//           <label>End Time:</label>
//           <input
//             type="time"
//             name="endTime"
//             value={task.endTime}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div className="form-group">
//           <label>Description:</label>
//           <textarea
//             name="description"
//             value={task.description}
//             onChange={handleInputChange}
//           ></textarea>
//         </div>
//         <div className="form-group">
//           <button type="button" onClick={handleTaskcompleted}>
//             Create Task ✓
//           </button>
//         </div>
//       </form>
//       <div className="task-list">
//         <h3>Task List</h3>
//         {taskList.map((taskItem, index) => (
//           <div key={index} className="task-item">
//             <div>
//               <strong>Task Name:</strong> {taskItem.taskName}
//             </div>
//             <div>
//               <strong>Start Date:</strong> {taskItem.startDate}
//             </div>
//             <div>
//               <strong>End Date:</strong> {taskItem.endDate}
//             </div>
//             <div>
//               <strong>Start Time:</strong> {taskItem.startTime}
//             </div>
//             <div>
//               <strong>End Time:</strong> {taskItem.endTime}
//             </div>
//             <div>
//               <strong>Description:</strong> {taskItem.description}
//             </div>
//             <div>
//               <strong>Status:</strong> {taskItem.status}
//             </div>
//             <span
//               role="img"
//               aria-label="completed"
//               onClick={() => handleStatusChange(index, 'completed')}
//             >
//               ✅
//             </span>
//             <span
//               role="img"
//               aria-label="not completed"
//               onClick={() => handleStatusChange(index, 'not completed')}
//             >
//               ❌
//             </span>
//             <span
//               role="img"
//               aria-label="in progress"
//               onClick={() => handleStatusChange(index, 'in progress')}
//             >
//               🔄
//             </span>
//             <span
//               role="img"
//               aria-label="Delete"
//               onClick={() => handleTaskDelete(index)}
//             >
//               🗑️
//             </span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default PersonalTasks;



// PersonalTasks.js
import React, { useState, useEffect } from 'react';
import './PersonalTasks.css';
import { toast, ToastContainer } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid'; // Import UUID generator
import 'react-toastify/dist/ReactToastify.css';

function PersonalTasks({ updateAllTasks }) {
  const [taskList, setTaskList] = useState([]);
  const [task, setTask] = useState({
    taskName: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    description: '',
    status: 'in progress',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchPersonalTasks();
  }, []);

  const fetchPersonalTasks = async () => {
    try {
      const response = await fetch("http://localhost:8000/getPersonalTask");
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
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      const taskId = generateTaskId(); // Generate taskId
      const updatedTaskList = [...taskList, { ...task, taskId }]; // Use generated taskId
      setTaskList(updatedTaskList);
      updateAllTasks(updatedTaskList);
  
      fetch("http://localhost:8000/personalTask", {
        method: "POST",
        body: JSON.stringify({
          taskId: taskId, // Use generated taskId
          taskName: task.taskName,
          startTime: task.startTime,
          endTime: task.endTime,
          startDate: task.startDate,
          endDate: task.endDate,
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
            toast.error(data.message);
          });
        }
        toast.success('Task created successfully');
      })
      .catch(error => {
        console.error('Error:', error);
      });
  
      setTask({
        taskName: '',
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        description: '',
        status: '',
      });
  
      updateAllTasks(updatedTaskList);
    } else {
      setErrors(errors);
    }
  };
  
  const validateForm = () => {
    let errors = {};
    if (!task.taskName.trim()) {
      errors.taskName = 'Task name is required';
    }
    if (!task.startDate) {
      errors.startDate = 'Start date is required';
    }
    if (!task.endDate) {
      errors.endDate = 'End date is required';
    }
    if (!task.startTime) {
      errors.startTime = 'Start time is required';
    }
    if (!task.endTime) {
      errors.endTime = 'End time is required';
    }
    return errors;
  };

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
        category: 'personalTask' // Assuming the category is 'techTask'
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
    <div className="personal-task-container">
      <h2>Create Personal Task</h2>
      <form>
      <ToastContainer />
        <div className="form-group">
          <label>Task Name:</label>
          <input
            type="text"
            name="taskName"
            value={task.taskName}
            onChange={handleInputChange}
            className={errors.taskName ? 'form-control is-invalid' : 'form-control'}
          />
          {errors.taskName && <div className="invalid-feedback">{errors.taskName}</div>}
        </div>
        <div className="form-group">
          <label>Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={task.startDate}
            onChange={handleInputChange}
            className={errors.startDate ? 'form-control is-invalid' : 'form-control'}
          />
          {errors.startDate && <div className="invalid-feedback">{errors.startDate}</div>}
        </div>
        <div className="form-group">
          <label>End Date:</label>
          <input
            type="date"
            name="endDate"
            value={task.endDate}
            onChange={handleInputChange}
            className={errors.endDate ? 'form-control is-invalid' : 'form-control'}
          />
          {errors.endDate && <div className="invalid-feedback">{errors.endDate}</div>}
        </div>
        <div className="form-group">
          <label>Start Time:</label>
          <input
            type="time"
            name="startTime"
            value={task.startTime}
            onChange={handleInputChange}
            className={errors.startTime ? 'form-control is-invalid' : 'form-control'}
          />
          {errors.startTime && <div className="invalid-feedback">{errors.startTime}</div>}
        </div>
        <div className="form-group">
          <label>End Time:</label>
          <input
            type="time"
            name="endTime"
            value={task.endTime}
            onChange={handleInputChange}
            className={errors.endTime ? 'form-control is-invalid' : 'form-control'}
          />
          {errors.endTime && <div className="invalid-feedback">{errors.endTime}</div>}
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={task.description}
            onChange={handleInputChange}
            className="form-control"
          ></textarea>
        </div>
        <div className="form-group">
          <button type="button" onClick={handleTaskcompleted} className="btn btn-primary">
            Create Task ✓
          </button>
        </div>
      </form>
      <div className="task-list">
        <h3>Task List</h3>
        {taskList.map((taskItem, index) => (
          <div key={index} className="task-item">
            <div>
              <strong>Task Name:</strong> {taskItem.taskName}
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
          </div>
        ))}
      </div>
    </div>
  );
}


export default PersonalTasks;

