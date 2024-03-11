// // TechnicalTasks.js
// import React, { useState, useEffect } from 'react';
// import './TechnicalTasks.css';
// import { v4 as uuidv4 } from 'uuid'; // Import UUID generator

// function TechnicalTasks({ updateAllTasks }) {
//   const [taskList, setTaskList] = useState([]);
//   const [task, setTask] = useState({
//     taskId: '', // Unique task ID
//     technicalTask: '',
//     startDate: '',
//     endDate: '',
//     startTime: '',
//     endTime: '',
//     description: '',
//     status: 'in progress',
//   });

//   const technicalTaskOptions = Array.from({ length: 19 }, (_, i) => `abc${i + 1}`);

//   useEffect(() => {
//     fetchTechTasks();
//   }, []);

//   const fetchTechTasks = async () => {
//     try {
//       const response = await fetch("http://localhost:8000/getTechTask");
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
//     const existingTaskIndex = taskList.findIndex(
//       (t) =>
//         t.technicalTask === task.technicalTask &&
//         t.startDate === task.startDate &&
//         t.endDate === task.endDate &&
//         t.startTime === task.startTime &&
//         t.endTime === task.endTime &&
//         t.description === task.description &&
//         t.status === task.status
//     );

//     if (existingTaskIndex === -1) {
//       const updatedTaskList = [...taskList, { ...task, taskId: uuidv4() }]; // Generate unique task ID
//       setTaskList(updatedTaskList);

//       fetch("http://localhost:8000/techTask", {
//         method: "POST",
//         body: JSON.stringify({
//           taskId: task.taskId,
//           taskName: task.technicalTask,
//           startDate: task.startDate,
//           endDate: task.endDate,
//           startTime: task.startTime,
//           endTime: task.endTime,
//           description: task.description,
//           status: task.status
//         }),
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       })
//       .then(response => {
//         if (!response.ok) {
//           return response.json().then(data => {
//             window.alert(data.message);
//           });
//         }
//         return response.json(); // Parse response JSON
//       })
//       .then(data => {
//         console.log('TechTask array from response:', data.TechTask); // Log TechTask array
//         window.alert('Task created successfully');
//       })
//       .catch(error => {
//         console.error('Error:', error);
//       });

//       setTask({
//         taskId: '', // Clear taskId after submission
//         technicalTask: '',
//         startDate: '',
//         endDate: '',
//         startTime: '',
//         endTime: '',
//         description: '',
//         status: '',
//       });

//       updateAllTasks(updatedTaskList);
//     }
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
//     <div className="technical-tasks-container">
//       <h2>Create Technical Task</h2>
//       <form>
//         <div className="form-group">
//           <label>Technical Task:</label>
//           <select
//             name="technicalTask"
//             value={task.technicalTask}
//             onChange={handleInputChange}
//           >
//             <option value="">Select Technical Task</option>
//             {technicalTaskOptions.map((option, index) => (
//               <option key={index} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>
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
//         <ul>
//           {taskList.map((taskItem, index) => (
//             <li key={index}>
//               <div>
//                 <strong>Task ID:</strong> {taskItem.taskId}
//               </div>
//               <div>
//                 <strong>Technical Task:</strong> {taskItem.technicalTask}
//               </div>
//               <div>
//                 <strong>Start Date:</strong> {taskItem.startDate}
//               </div>
//               <div>
//                 <strong>End Date:</strong> {taskItem.endDate}
//               </div>
//               <div>
//                 <strong>Start Time:</strong> {taskItem.startTime}
//               </div>
//               <div>
//                 <strong>End Time:</strong> {taskItem.endTime}
//               </div>
//               <div>
//                 <strong>Description:</strong> {taskItem.description}
//               </div>
//               <div>
//                 <strong>Status:</strong> {taskItem.status}
//               </div>
//               <span
//                 role="img"
//                 aria-label="completed"
//                 onClick={() => handleStatusChange(index, 'completed')}
//               >
//                 ✅
//               </span>
//               <span
//                 role="img"
//                 aria-label="not completed"
//                 onClick={() => handleStatusChange(index, 'not completed')}
//               >
//                 ❌
//               </span>
//               <span
//                 role="img"
//                 aria-label="in progress"
//                 onClick={() => handleStatusChange(index, 'in progress')}
//               >
//                 🔄
//               </span>
//               <span
//                 role="img"
//                 aria-label="Delete"
//                 onClick={() => handleTaskDelete(index)}
//               >
//                 🗑️
//               </span>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default TechnicalTasks;




import React, { useState, useEffect } from 'react';
import './TechnicalTasks.css';
import { Button, Form } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid'; // Import UUID generator
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function TechnicalTasks({ updateAllTasks }) {
  const [taskList, setTaskList] = useState([]);
  const [task, setTask] = useState({
    taskId: '', // Unique task ID
    technicalTask: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    description: '',
    status: 'in progress',
  });
  const [validationErrors, setValidationErrors] = useState({
    technicalTask: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    description: '',
  });

  const technicalTaskOptions = Array.from({ length: 19 }, (_, i) => `abc${i + 1}`);

  useEffect(() => {
    fetchTechTasks();
  }, []);

  const fetchTechTasks = async () => {
    try {
      const response = await fetch("http://localhost:8000/getTechTask");
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

  const validateForm = () => {
    let isValid = true;
    const errors = {};
    if (!task.technicalTask) {
      errors.technicalTask = 'Field is required';
      isValid = false;
    }
    if (!task.startDate) {
      errors.startDate = 'Field is required';
      isValid = false;
    }
    if (!task.endDate) {
      errors.endDate = 'Field is required';
      isValid = false;
    }
    if (!task.startTime) {
      errors.startTime = 'Field is required';
      isValid = false;
    }
    if (!task.endTime) {
      errors.endTime = 'Field is required';
      isValid = false;
    }
    if (!task.description) {
      errors.description = 'Field is required';
      isValid = false;
    }
    setValidationErrors(errors);
    return isValid;
  };

  const handleTaskcompleted = () => {
    if (!validateForm()) {
      return;
    }

    const existingTaskIndex = taskList.findIndex(
      (t) =>
        t.technicalTask === task.technicalTask &&
        t.startDate === task.startDate &&
        t.endDate === task.endDate &&
        t.startTime === task.startTime &&
        t.endTime === task.endTime &&
        t.description === task.description &&
        t.status === task.status
    );

    if (existingTaskIndex === -1) {
      const updatedTaskList = [...taskList, { ...task, taskId: uuidv4() }]; // Generate unique task ID
      setTaskList(updatedTaskList);

      fetch("http://localhost:8000/techTask", {
        method: "POST",
        body: JSON.stringify({
          taskId: task.taskId,
          taskName: task.technicalTask,
          startDate: task.startDate,
          endDate: task.endDate,
          startTime: task.startTime,
          endTime: task.endTime,
          description: task.description,
          status: task.status
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
        return response.json(); // Parse response JSON
      })
      .then(data => {
        console.log('TechTask array from response:', data.TechTask); // Log TechTask array
        toast.success('Task created successfully');
      })
      .catch(error => {
        console.error('Error:', error);
      });

      setTask({
        taskId: '', // Clear taskId after submission
        technicalTask: '',
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        description: '',
        status: '',
      });

      updateAllTasks(updatedTaskList);
    }
  };

  const handleStatusChange = (index, newStatus) => {
    const updatedTaskList = [...taskList];
    updatedTaskList[index].status = newStatus;
    setTaskList(updatedTaskList);
    updateAllTasks(updatedTaskList);
  };

  const handleTaskDelete = (index) => {
    const updatedTaskList = [...taskList];
    updatedTaskList.splice(index, 1);
    setTaskList(updatedTaskList);
    updateAllTasks(updatedTaskList);
  };

  return (
    <div className="technical-tasks-container">
     
      <Form>

      <h2>Create Technical Task</h2>


        <Form.Group controlId="formTechnicalTask">

          <ToastContainer></ToastContainer>
          <Form.Label>Technical Task:</Form.Label>


          <Form.Control as="select" name="technicalTask" value={task.technicalTask} onChange={handleInputChange} isInvalid={!!validationErrors.technicalTask}>
            <option value="">Select Technical Task</option>
            {technicalTaskOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </Form.Control>


          <Form.Control.Feedback type="invalid">{validationErrors.technicalTask}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formStartDate">
          <Form.Label>Start Date:</Form.Label>
          <Form.Control type="date" name="startDate" value={task.startDate} onChange={handleInputChange} isInvalid={!!validationErrors.startDate} />
          <Form.Control.Feedback type="invalid">{validationErrors.startDate}</Form.Control.Feedback>
        </Form.Group>


        <Form.Group controlId="formEndDate">
          <Form.Label>End Date:</Form.Label>
          <Form.Control type="date" name="endDate" value={task.endDate} onChange={handleInputChange} isInvalid={!!validationErrors.endDate} />
          <Form.Control.Feedback type="invalid">{validationErrors.endDate}</Form.Control.Feedback>
        </Form.Group>


        <Form.Group controlId="formStartTime">
          <Form.Label>Start Time:</Form.Label>
          <Form.Control type="time" name="startTime" value={task.startTime} onChange={handleInputChange} isInvalid={!!validationErrors.startTime} />
          <Form.Control.Feedback type="invalid">{validationErrors.startTime}</Form.Control.Feedback>
        </Form.Group>


        <Form.Group controlId="formEndTime">
          <Form.Label>End Time:</Form.Label>
          <Form.Control type="time" name="endTime" value={task.endTime} onChange={handleInputChange} isInvalid={!!validationErrors.endTime} />
          <Form.Control.Feedback type="invalid">{validationErrors.endTime}</Form.Control.Feedback>
        </Form.Group>


        <Form.Group controlId="formDescription">
          <Form.Label>Description:</Form.Label>
          <Form.Control as="textarea" rows={3} name="description" value={task.description} onChange={handleInputChange} isInvalid={!!validationErrors.description} />
          <Form.Control.Feedback type="invalid">{validationErrors.description}</Form.Control.Feedback>
        </Form.Group>



        <Button variant="primary" type="button" onClick={handleTaskcompleted}>
          Create Task ✓
        </Button>
      </Form>


      <div className="task-list">
        <h3>Task List</h3>
        <ul>
          {taskList.map((taskItem, index) => (
            <li key={index}>
              <div>
                <strong>Task ID:</strong> {taskItem.taskId}
              </div>
              <div>
                <strong>Technical Task:</strong> {taskItem.technicalTask}
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
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TechnicalTasks;

