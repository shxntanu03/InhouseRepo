// App.js
import React, { useState, useEffect } from 'react';
import EntryPage from './components/EntryPage.js';
import Home from './components/Home.js';
import ViewTasks from './components/ViewTasks.js';
import TechnicalTasks from './components/TechnicalTasks.js';
import OtherTasks from './components/OtherTasks.js';
import Navbar from './components/Navbar.js';
import PersonalTasks from './components/PersonalTasks.js';
import Login from './components/Login.js'; // Import the Login component
import { checkTasksAndSendReminders } from './components/TaskReminder';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const [loggedIn, setLoggedIn] = useState(false); // State to track login status
  const [allTasks, setAllTasks] = useState([]); // State to store all tasks

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setAllTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever allTasks state changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(allTasks));
  }, [allTasks]);

  // Function to update tasks list
  const updateAllTasks = (newTasks) => {
    setAllTasks(newTasks);
  };

  // Function to handle login
  const handleLogin = () => {
    setLoggedIn(true);
  };

  // Function to handle logout
  const handleLogout = () => {
    setLoggedIn(false);
  };

  // Call the reminder logic when the component mounts
  useEffect(() => {
    const reminderInterval = setInterval(() => {
      checkTasksAndSendReminders(); // Check tasks and send reminders
    }, 6000); // Run every minute (adjust as needed)

    // Clean up the interval when the component unmounts
    return () => clearInterval(reminderInterval);
  }, []); // Empty dependency array to run only once when the component mounts
  
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          {/* Route to the Login page */}
          <Route
            path="/login"
            element={loggedIn ? <Navigate to="/entry-page" /> : <Login onLogin={handleLogin} />}
          />
          {/* Routes protected by login */}
          {loggedIn ? (
            <>
              <Route path="/" element={<Navigate to="/entry-page" />} /> {/* Redirect to Home */}
              <Route path="/entry-page" element={<EntryPage updateAllTasks={updateAllTasks} onLogout={handleLogout} />} />
              <Route path="/view-tasks" element={<ViewTasks taskList={allTasks} />} />
              <Route path="/home" element={<Home updateAllTasks={updateAllTasks} />} />
              <Route path="/technical-tasks" element={<TechnicalTasks updateAllTasks={updateAllTasks} />} />
              <Route path="/other-tasks" element={<OtherTasks updateAllTasks={updateAllTasks} />} />
              <Route path="/personal-tasks" element={<PersonalTasks updateAllTasks={updateAllTasks} />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Navigate to="/login" />} /> {/* Redirect to Login */}
              <Route path="/entry-page" element={<EntryPage />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
