// // Home.js

// import React, { useState, useEffect } from 'react';
// import './Home.css';
// import { Button, Form } from 'react-bootstrap';

// function Home({ updateAllTasks }) {
//   const [tasks, setTasks] = useState([]);
//   const [taskForm, setTaskForm] = useState({
//     name: '',
//     startTime: '',
//     endTime: '',
//     startDate: '',
//     subject: '',
//     batch: '',
//     class: '',
//     description: '',
//     status: 'in progress'
//   });

//   useEffect(() => {
//     fetchGeneralTasks();
//   }, []);

//   const fetchGeneralTasks = async () => {
//     try {
//       const response = await fetch('http://localhost:8000/getGeneralTask');
//       if (!response.ok) {
//         throw new Error('Failed to fetch tasks');
//       }
//       const tasks = await response.json();
//       setTasks(tasks);
//     } catch (error) {
//       console.error('Error fetching tasks:', error);
//     }
//   };

//   function handleTaskFormChange(event) {
//     const { name, value } = event.target;
//     setTaskForm((prevForm) => ({ ...prevForm, [name]: value }));
//   }

//   function handleCreateTask() {
//     const newTask = {
//       id: tasks.length + 1,
//       ...taskForm,
//       status: 'not completed',
//     };

//     setTasks((prevTasks) => [...prevTasks, newTask]);

//     fetch('http://localhost:8000/generalTask', {
//       method: 'POST',
//       body: JSON.stringify({
//         taskName: taskForm.name,
//         startTime: taskForm.startTime,
//         endTime: taskForm.endTime,
//         date: taskForm.startDate,
//         subject: taskForm.subject,
//         batch: taskForm.batch,
//         className: taskForm.class,
//         description: taskForm.description,
//         status: taskForm.status
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

//     setTaskForm({
//       name: '',
//       startTime: '',
//       endTime: '',
//       startDate: '',
//       subject: '',
//       batch: '',
//       class: '',
//       description: '',
//       status: ''
//     });

//     updateAllTasks([...tasks, newTask]);
//   }

//   function handleTaskAction(taskId, action) {
//     const updatedTasks = tasks.map((task) =>
//       task.id === taskId ? { ...task, status: action } : task
//     );
//     setTasks(updatedTasks);
//     updateAllTasks(updatedTasks);
//   }

//   return (
//     <div className="home-container">
//       <div className="heading">
//         <h2>Create Task</h2>
//       </div>
//       <Form className="task-form">
//         <Form.Group controlId="formTaskName">
//           <Form.Label>Task Name:</Form.Label>
//           <Form.Control type="text" name="name" value={taskForm.name} onChange={handleTaskFormChange} />
//         </Form.Group>
//         <Form.Group controlId="formStartTime">
//           <Form.Label>Start Time:</Form.Label>
//           <Form.Control type="time" name="startTime" value={taskForm.startTime} onChange={handleTaskFormChange} />
//         </Form.Group>
//         <Form.Group controlId="formEndTime">
//           <Form.Label>End Time:</Form.Label>
//           <Form.Control type="time" name="endTime" value={taskForm.endTime} onChange={handleTaskFormChange} />
//         </Form.Group>
//         <Form.Group controlId="formStartDate">
//           <Form.Label>Date:</Form.Label>
//           <Form.Control type="date" name="startDate" value={taskForm.startDate} onChange={handleTaskFormChange} />
//         </Form.Group>
//         <Form.Group controlId="formSubject">
//           <Form.Label>Subject:</Form.Label>
//           <Form.Control type="text" name="subject" value={taskForm.subject} onChange={handleTaskFormChange} />
//         </Form.Group>
//         <Form.Group controlId="formBatch">
//           <Form.Label>Batch:</Form.Label>
//           <Form.Control type="text" name="batch" value={taskForm.batch} onChange={handleTaskFormChange} />
//         </Form.Group>
//         <Form.Group controlId="formClass">
//           <Form.Label>Class:</Form.Label>
//           <Form.Control type="text" name="class" value={taskForm.class} onChange={handleTaskFormChange} />
//         </Form.Group>
//         <Form.Group controlId="formDescription">
//           <Form.Label>Task Description:</Form.Label>
//           <Form.Control as="textarea" rows={3} name="description" value={taskForm.description} onChange={handleTaskFormChange} />
//         </Form.Group>
//         <Button variant="primary" type="button" onClick={handleCreateTask}>
//           Create Task ✓
//         </Button>
//       </Form>
//       <div className="task-list">
//         <h3>Task List</h3>
//         {tasks.map((task) => (
//           <div key={task.id} className="task-item">
//             <div>
//               <strong>Task Name:</strong> {task.name}
//             </div>
//             <div>
//               <strong>Start Time:</strong> {task.startTime}
//             </div>
//             <div>
//               <strong>End Time:</strong> {task.endTime}
//             </div>
//             <div>
//               <strong>Date:</strong> {task.startDate}
//             </div>
//             <div>
//               <strong>Subject:</strong> {task.subject}
//             </div>
//             <div>
//               <strong>Batch:</strong> {task.batch}
//             </div>
//             <div>
//               <strong>Class:</strong> {task.class}
//             </div>
//             <div>
//               <strong>Task Description:</strong> {task.description}
//             </div>
//             <div>
//               <strong>Status:</strong> {task.status}
//             </div>
//             <div className="task-icons">
//               <span onClick={() => handleTaskAction(task.id, 'completed')}>✅</span>
//               <span onClick={() => handleTaskAction(task.id, 'not completed')}>❌</span>
//               <span onClick={() => handleTaskAction(task.id, 'in progress')}>🔄</span>
//               {/* <span onClick={() => handleTaskAction(task.id, 'Review')}>🗑️</span> */}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Home;

import React, { useState, useEffect } from 'react';
import './Home.css';
import { Button, Form } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Home({ updateAllTasks }) {
  const [tasks, setTasks] = useState([]);
  const [taskForm, setTaskForm] = useState({
    name: '',
    startTime: '',
    endTime: '',
    startDate: '',
    subject: '',
    batch: '',
    class: '',
    description: '',
    status: 'in progress'
  });
  const [validationErrors, setValidationErrors] = useState({
    name: '',
    startTime: '',
    endTime: '',
    startDate: '',
    subject: '',
    batch: '',
    class: '',
    description: ''
  });

  useEffect(() => {
    fetchGeneralTasks();
  }, []);

  const fetchGeneralTasks = async () => {
    try {
      const response = await fetch('http://localhost:8000/getGeneralTask');
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const tasks = await response.json();
      setTasks(tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  function handleTaskFormChange(event) {
    const { name, value } = event.target;
    setTaskForm((prevForm) => ({ ...prevForm, [name]: value }));
  }

  function validateForm() {
    let isValid = true;
    const errors = {};
    if (!taskForm.name) {
      errors.name = 'Field is required';
      isValid = false;
    }
    if (!taskForm.startTime) {
      errors.startTime = 'Field is required';
      isValid = false;
    }
    if (!taskForm.endTime) {
      errors.endTime = 'Field is required';
      isValid = false;
    }
    if (!taskForm.startDate) {
      errors.startDate = 'Field is required';
      isValid = false;
    }
    if (!taskForm.subject) {
      errors.subject = 'Field is required';
      isValid = false;
    }
    if (!taskForm.batch) {
      errors.batch = 'Field is required';
      isValid = false;
    }
    if (!taskForm.class) {
      errors.class = 'Field is required';
      isValid = false;
    }
    if (!taskForm.description) {
      errors.description = 'Field is required';
      isValid = false;
    }
    setValidationErrors(errors);
    return isValid;
  }

  function handleCreateTask() {
    if (!validateForm()) {
      return;
    }

    const newTask = {
      id: tasks.length + 1,
      ...taskForm,
      status: 'not completed',
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);




    fetch('http://localhost:8000/generalTask', {
      method: 'POST',
      body: JSON.stringify({
        taskName: taskForm.name,
        startTime: taskForm.startTime,
        endTime: taskForm.endTime,
        date: taskForm.startDate,
        subject: taskForm.subject,
        batch: taskForm.batch,
        className: taskForm.class,
        description: taskForm.description,
        status: taskForm.status
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

    setTaskForm({
      name: '',
      startTime: '',
      endTime: '',
      startDate: '',
      subject: '',
      batch: '',
      class: '',
      description: '',
      status: ''
    });

    updateAllTasks([...tasks, newTask]);

  }




  function handleTaskAction(taskId, action) {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: action } : task
    );
    setTasks(updatedTasks);
    updateAllTasks(updatedTasks);
  }

  function handleDeleteTask(taskId) {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    updateAllTasks(updatedTasks);
  }

  return (
    <div className="home-container">
      
      <Form className="task-form">

      <div className="heading">
        <h2>Create Task</h2>
        <ToastContainer/>
      </div>

        <Form.Group controlId="formTaskName">
          <Form.Label>Task Name:</Form.Label>
          <Form.Control type="text" name="name" value={taskForm.name} onChange={handleTaskFormChange} isInvalid={!!validationErrors.name} />
          <Form.Control.Feedback type="invalid">{validationErrors.name}</Form.Control.Feedback>
        </Form.Group>


        <Form.Group controlId="formStartTime">
          <Form.Label>Start Time:</Form.Label>
          <Form.Control type="time" name="startTime" value={taskForm.startTime} onChange={handleTaskFormChange} isInvalid={!!validationErrors.startTime} />
          <Form.Control.Feedback type="invalid">{validationErrors.startTime}</Form.Control.Feedback>
        </Form.Group>


        <Form.Group controlId="formEndTime">
          <Form.Label>End Time:</Form.Label>
          <Form.Control type="time" name="endTime" value={taskForm.endTime} onChange={handleTaskFormChange} isInvalid={!!validationErrors.endTime} />
          <Form.Control.Feedback type="invalid">{validationErrors.endTime}</Form.Control.Feedback>
        </Form.Group>


        <Form.Group controlId="formStartDate">
          <Form.Label>Date:</Form.Label>
          <Form.Control type="date" name="startDate" value={taskForm.startDate} onChange={handleTaskFormChange} isInvalid={!!validationErrors.startDate} />
          <Form.Control.Feedback type="invalid">{validationErrors.startDate}</Form.Control.Feedback>
        </Form.Group>


        <Form.Group controlId="formSubject">
          <Form.Label>Subject:</Form.Label>
          <Form.Control type="text" name="subject" value={taskForm.subject} onChange={handleTaskFormChange} isInvalid={!!validationErrors.subject} />
          <Form.Control.Feedback type="invalid">{validationErrors.subject}</Form.Control.Feedback>
        </Form.Group>


        <Form.Group controlId="formBatch">
          <Form.Label>Batch:</Form.Label>
          <Form.Control type="text" name="batch" value={taskForm.batch} onChange={handleTaskFormChange} isInvalid={!!validationErrors.batch} />
          <Form.Control.Feedback type="invalid">{validationErrors.batch}</Form.Control.Feedback>
        </Form.Group>


        <Form.Group controlId="formClass">
          <Form.Label>Class:</Form.Label>
          <Form.Control type="text" name="class" value={taskForm.class} onChange={handleTaskFormChange} isInvalid={!!validationErrors.class} />
          <Form.Control.Feedback type="invalid">{validationErrors.class}</Form.Control.Feedback>
        </Form.Group>


        <Form.Group controlId="formDescription">
          <Form.Label>Task Description:</Form.Label>
          <Form.Control as="textarea" rows={3} name="description" value={taskForm.description} onChange={handleTaskFormChange} isInvalid={!!validationErrors.description} />
          <Form.Control.Feedback type="invalid">{validationErrors.description}</Form.Control.Feedback>
        </Form.Group>


        <Button variant="primary" type="button" onClick={handleCreateTask}>
          Create Task ✓
        </Button>
      </Form>



      <div className="task-list">
        <h3>Task List</h3>
        {tasks.map((task) => (
          <div key={task.id} className="task-item">
            <div>
              <strong>Task Name:</strong> {task.name}
            </div>
            <div>
              <strong>Start Time:</strong> {task.startTime}
            </div>
            <div>
              <strong>End Time:</strong> {task.endTime}
            </div>
            <div>
              <strong>Date:</strong> {task.startDate}
            </div>
            <div>
              <strong>Subject:</strong> {task.subject}
            </div>
            <div>
              <strong>Batch:</strong> {task.batch}
            </div>
            <div>
              <strong>Class:</strong> {task.class}
            </div>
            <div>
              <strong>Task Description:</strong> {task.description}
            </div>
            <div>
              <strong>Status:</strong> {task.status}
            </div>
            <div className="task-icons">
              <span onClick={() => handleTaskAction(task.id, 'completed')}>✅</span>
              <span onClick={() => handleTaskAction(task.id, 'not completed')}>❌</span>
              <span onClick={() => handleTaskAction(task.id, 'in progress')}>🔄</span>
              <span onClick={() => handleDeleteTask(task.id)}>🗑️</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;

