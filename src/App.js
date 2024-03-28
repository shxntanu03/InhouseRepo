import React, { useState, useEffect } from 'react';
import EntryPage from './components/EntryPage.js';
import Home from './components/Home.js';
import ViewTasks from './components/ViewTasks.js';
import TechnicalTasks from './components/TechnicalTasks.js';
import OtherTasks from './components/OtherTasks.js';
import Navbar from './components/Navbar.js';
import PersonalTasks from './components/PersonalTasks.js';
import Login from './components/Login.js';
import GenerateReport from './components/GenerateReport.js';
import { checkTasksAndSendReminders } from './components/TaskReminder';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn') === 'true');
  const [allTasks, setAllTasks] = useState([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setAllTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(allTasks));
  }, [allTasks]);

  const updateAllTasks = (newTasks) => {
    setAllTasks(newTasks);
  };

  const handleLogin = () => {
    setLoggedIn(true);
    localStorage.setItem('loggedIn', true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('loggedIn');
    window.location.href = '/login'; // Redirect to login page
  };

  useEffect(() => {
    const reminderInterval = setInterval(() => {
      checkTasksAndSendReminders();
    }, 6000);

    return () => clearInterval(reminderInterval);
  }, []);

  return (
    <Router>
      <div>
        <Navbar onLogout={handleLogout} />
        <Routes>
          <Route
            path="/login"
            element={loggedIn ? <Navigate to="/entry-page" /> : <Login onLogin={handleLogin} />}
          />
          <Route path="/entry-page" element={<EntryPage updateAllTasks={updateAllTasks} onLogout={handleLogout} />} />
          <Route path="/view-tasks" element={<ViewTasks taskList={allTasks} />} />
          <Route path="/home" element={<Home updateAllTasks={updateAllTasks} />} />
          <Route path="/technical-tasks" element={<TechnicalTasks updateAllTasks={updateAllTasks} />} />
          <Route path="/other-tasks" element={<OtherTasks updateAllTasks={updateAllTasks} />} />
          <Route path="/personal-tasks" element={<PersonalTasks updateAllTasks={updateAllTasks} />} />
          <Route path="/generate-report" element={<GenerateReport />} />
        
          <Route path="/" element={loggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;







