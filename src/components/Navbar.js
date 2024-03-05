// Navbar.js
import React, { useState } from 'react';

// Navlink - react hook aahe jyamule tu links deu shakto
import { NavLink } from 'react-router-dom';
import './Navbar.css'; // Import your CSS file for styling

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

          &#9776; {/* This is the Unicode character for the menu icon */}
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
            {/* Add more items as needed */}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
