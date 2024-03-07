// // Home.js

// import React, { useState } from 'react';
// import './Home.css';

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
//   });

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

//     fetch("http://localhost:8000/generalTask", {
//       method: "POST",
//       body: JSON.stringify({
//         taskName:taskForm.name,
//         startTime:taskForm.startTime,
//         endTime:taskForm.endTime,
//         date:taskForm.startDate,
//         subject:taskForm.subject,
//         batch:taskForm.batch,
//         className:taskForm.class,
//         description:taskForm.description,
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
     
//       window.alert('Task created successfull');
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
      

//       <form className="task-form">
//         <label>
//           Task Name:
//           <input type="text" name="name" value={taskForm.name} onChange={handleTaskFormChange} />
//         </label>
//         <label>
//           Start Time:
//           <input type="time" name="startTime" value={taskForm.startTime} onChange={handleTaskFormChange} />
//         </label>
//         <label>
//           End Time:
//           <input type="time" name="endTime" value={taskForm.endTime} onChange={handleTaskFormChange} />
//         </label>
//         <label>
//           Date:
//           <input type="date" name="startDate" value={taskForm.startDate} onChange={handleTaskFormChange} />
//         </label>
//         <label>
//           Subject:
//           <input type="text" name="subject" value={taskForm.subject} onChange={handleTaskFormChange} />
//         </label>
//         <label>
//           Batch:
//           <input type="text" name="batch" value={taskForm.batch} onChange={handleTaskFormChange} />
//         </label>
//         <label>
//           Class:
//           <input type="text" name="class" value={taskForm.class} onChange={handleTaskFormChange} />
//         </label>
//         <label>
//           Task Description:
//           <textarea name="description" value={taskForm.description} onChange={handleTaskFormChange}></textarea>
//         </label>
//         <button type="button" onClick={handleCreateTask}>
//           Create Task ✓
//         </button>
//       </form>

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
//               <span onClick={() => handleTaskAction(task.id, 'Review')}>🗑️</span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Home;














// Home.js
import React, { useState, useEffect } from 'react';
import './Home.css';

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
    status:"in progress"
  });

  useEffect(() => {
    fetchGeneralTasks();
  }, []);

  const fetchGeneralTasks = async () => {
    try {
      const response = await fetch("http://localhost:8000/getGeneralTask");
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

  function handleCreateTask() {
    const newTask = {
      id: tasks.length + 1,
      ...taskForm,
      status: 'not completed',
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);

    fetch("http://localhost:8000/generalTask", {
      method: "POST",
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
          window.alert(data.message);
        });
      }
      window.alert('Task created successfully');
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
      status:""
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

  return (
    <div className="home-container">
      <div className="heading">
        <h2>Create Task</h2>
      </div>
      <form className="task-form">
        <label>
          Task Name:
          <input type="text" name="name" value={taskForm.name} onChange={handleTaskFormChange} />
        </label>
        <label>
          Start Time:
          <input type="time" name="startTime" value={taskForm.startTime} onChange={handleTaskFormChange} />
        </label>
        <label>
          End Time:
          <input type="time" name="endTime" value={taskForm.endTime} onChange={handleTaskFormChange} />
        </label>
        <label>
          Date:
          <input type="date" name="startDate" value={taskForm.startDate} onChange={handleTaskFormChange} />
        </label>
        <label>
          Subject:
          <input type="text" name="subject" value={taskForm.subject} onChange={handleTaskFormChange} />
        </label>
        <label>
          Batch:
          <input type="text" name="batch" value={taskForm.batch} onChange={handleTaskFormChange} />
        </label>
        <label>
          Class:
          <input type="text" name="class" value={taskForm.class} onChange={handleTaskFormChange} />
        </label>
        <label>
          Task Description:
          <textarea name="description" value={taskForm.description} onChange={handleTaskFormChange}></textarea>
        </label>
        <button type="button" onClick={handleCreateTask}>
          Create Task ✓
        </button>
      </form>
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
              {/* <span onClick={() => handleTaskAction(task.id, 'Review')}>🗑️</span> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;

