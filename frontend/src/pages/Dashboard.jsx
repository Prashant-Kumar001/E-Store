import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <h2>Dashboard</h2>
      <nav>
        <ul>
          <li><Link to="/dashboard">Dashboard Home</Link></li>
          <li><Link to="/dashboard/settings">Settings</Link></li>
          <li><Link to="/dashboard/profile">Profile</Link></li>
        </ul>
      </nav>
      
      {/* Nested dashboard routes will render here */}
      <Outlet />
    </div>
  );
};

export default Dashboard;
