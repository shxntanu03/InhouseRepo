



import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="navbar-container">
      <div className="navbar-header">
        <div className="menu-icon" onClick={toggleSidebar}>
          &#9776;
        </div>
        <h1>The Classroom App</h1>
      </div>
      {isSidebarOpen && (
        <div className="sidebar" onMouseLeave={closeSidebar}>
          <ul>
            <li>
              <NavLink to="/entry-page" onClick={closeSidebar}>
                Home page
              </NavLink>
            </li>
            <li>
              <NavLink to="/view-tasks" onClick={closeSidebar}>
                View Tasks
              </NavLink>
            </li>
            <li>
              <NavLink to="/home" onClick={closeSidebar}>
                Create Task
              </NavLink>
            </li>
            <li>
              <NavLink to="/technical-tasks" onClick={closeSidebar}>
                Technical Tasks
              </NavLink>
            </li>
            <li>
              <NavLink to="/other-tasks" onClick={closeSidebar}>
                Other Tasks
              </NavLink>
            </li>
            <li>
              <NavLink to="/personal-tasks" onClick={closeSidebar}>
                Personal Tasks
              </NavLink>
            </li>
            <li>
              <NavLink to="/generate-report" onClick={closeSidebar}>
                Generate Report
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
