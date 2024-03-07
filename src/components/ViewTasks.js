// // // ViewTasks.js
// // import React, { useState } from 'react';
// // import './ViewTasks.css';

// // function ViewTasks({ taskList }) {

// //   const [startDate, setSelectedStartDate] = useState('');
// //   const [status, setSelectedCategory] = useState('');

// //   const handleStartDateChange = (e) => {
// //     setSelectedStartDate(e.target.value);
// //   };

// //   const handleCategoryChange = (e) => {
// //     setSelectedCategory(e.target.value);
// //   };

// //   fetch("http://localhost:8000/viewTask", {
// //     method: "POST",
// //     body: JSON.stringify({
       
// //     }),
// //     headers: {
// //       'Content-Type': 'application/json'
// //     }
// //   })
// //   .then(response => {
// //     if (!response.ok) {
// //       return response.json().then(data => {
// //         window.alert(data.message);
// //       });
// //     }
// //     window.alert('Task created successfully');
// //   })
// //   .catch(error => {
// //     console.error('Error:', error);
// //   });




// //   const filterTasks = () => {
    
// //     return taskList.filter((task) => {
// //       const isStartDateMatch =
// //         startDate ? task.startDate === startDate : true;

// //       const isCategoryMatch =
// //         status === 'all' ? true : task.status === status;

// //       return isStartDateMatch && isCategoryMatch;

// //     });
// //   };



// //   return (

// //     <div className="view-tasks-container">

// //       <h2>View Tasks</h2>

// //       <div className="filters-container">

// //         <div className="filter">
// //           <label>Select Start Date:</label>
// //           <input
// //             type="date"
// //             value={startDate}
// //             onChange={handleStartDateChange}
// //           />
// //         </div>

// //         <div className="filter">
// //           <label>Select Category:</label>
// //           <select value={status} onChange={handleCategoryChange}>
// //             <option value="all">All</option>
// //             <option value="completed">Completed</option>
// //             <option value="not completed">Not Completed</option>
// //             <option value="in progress">In Progress</option>
// //           </select>
// //         </div>

// //       </div>



// //       <div className="task-list">

// //         {filterTasks().map((task, index) => (
// //           <div key={index} className="task-item">
// //             <div>
// //               <strong>Start Date:</strong> {task.startDate}
// //             </div>
// //             <div>
// //               <strong>Start Time:</strong> {task.startTime}
// //             </div>
// //             <div>
// //               <strong>End Time:</strong> {task.endTime}
// //             </div>
// //             <div>
// //               <strong>Description:</strong> {task.description}
// //             </div>
// //             <div>
// //               <strong>Status:</strong> {task.status}
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // export default ViewTasks;


// import React, { useState } from 'react';
// import './ViewTasks.css';

// async function fetchTask(startDate, status) {
//   try {
//     const response = await fetch("http://localhost:8000/viewTasks", {
//       method: "POST",
//       body: JSON.stringify({
//         startDate: startDate,
//         status: status
//       }),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });

//     if (response.status===200) {
//       console.log(response.json);
//       window.alert('Task displayed successfully!');
//     }
//     else{
//       window.alert('Error!');
//     }

  
//   } catch (error) {
//     console.error('Error:', error.message);
//     window.alert('An error occurred while displaying the task.');
//   }
// }

// function ViewTasks({ taskList }) {


//   const [startDate, setSelectedStartDate] = useState('');
//   const [status, setSelectedCategory] = useState('');

//   const handleStartDateChange = (e) => {
//     setSelectedStartDate(e.target.value);
//   };

//   const handleCategoryChange = (e) => {
//     setSelectedCategory(e.target.value);
//   };

//   const filterTasks = () => {
//     return taskList.filter((task) => {
//       const isStartDateMatch = startDate ? task.startDate === startDate : true;
//       const isCategoryMatch = status === 'all' ? true : task.status === status;
//       return isStartDateMatch && isCategoryMatch;
//     });
//   };

//   return (
//     <div className="view-tasks-container">
//       <h2>View Tasks</h2>
//       <div className="filters-container">
//         <div className="filter">
//           <label>Select Start Date:</label>
//           <input
//             type="date"
//             value={startDate}
//             onChange={handleStartDateChange}
//           />
//         </div>
//         <div className="filter">
//           <label>Select Category:</label>
//           <select value={status} onChange={handleCategoryChange}>
//             <option value="all">All</option>
//             <option value="completed">Completed</option>
//             <option value="not completed">Not Completed</option>
//             <option value="in progress">In Progress</option>
//           </select>
//         </div>

//         <div className="form-group">
//           <button type="button" onClick={fetchTask}>
//             Submit
//           </button>
//         </div>


//       </div>


//       <div className="task-list">
//         {filterTasks().map((task, index) => (
//           <div key={index} className="task-item">
//             <div><strong>Start Date:</strong> {task.startDate}</div>
//             <div><strong>Start Time:</strong> {task.startTime}</div>
//             <div><strong>End Time:</strong> {task.endTime}</div>
//             <div><strong>Description:</strong> {task.description}</div>
//             <div><strong>Status:</strong> {task.status}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ViewTasks;

import React, { useState } from 'react';
import './ViewTasks.css';

async function fetchTask(startDate, status) {
  try {
    const response = await fetch("http://localhost:8000/viewTasks", {
      method: "POST",
      body: JSON.stringify({
        startDate: reverseString(startDate),
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
    console.log("Hello Sarthak!",responseData.tasks);
    return responseData.tasks;
  } catch (error) {
    console.error('Error:', error.message);
    window.alert('An error occurred while displaying the task.');
    return [];
  }
}


function reverseString(dateString){
  var date = "";
  var month = "";
  var year = "";

  date = dateString[0].toString()+dateString[1].toString();

  month = dateString[3].toString()+dateString[4].toString();

  year = dateString[6].toString()+dateString[7].toString()+ dateString[8].toString()+dateString[9].toString();
  const rev_date=(year.toString()+"-"+month.toString()+"-"+date.toString());

  window.alert(rev_date);

  console.log(rev_date);

  return rev_date;
}


function ViewTasks({ taskList }) {
  const [startDate, setSelectedStartDate] = useState('');
  const [status, setSelectedCategory] = useState('');
  const [displayedTasks, setDisplayedTasks] = useState([]);

  const handleStartDateChange = (e) => {
    setSelectedStartDate(e.target.value);
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
            <option value="completed">Completed</option>
            <option value="not completed">Not Completed</option>
            <option value="in progress">In Progress</option>
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewTasks;
