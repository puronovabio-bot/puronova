import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Uncomment when auth context starts giving admin role properly
  // if (!user || user.role !== 'admin') {
  //   navigate('/');
  //   return null;
  // }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="admin-dashboard-page">
      <aside className="admin-sidebar">
        <div className="admin-brand">PURO NOVA ADMIN</div>
        <nav className="admin-nav">
          <button className="active">📊 Dashboard</button>
          <button>📦 Products</button>
          <button>📋 Orders</button>
          <button>👥 Customers</button>
          <button>🏷️ Categories</button>
          <button>🎟️ Coupons</button>
        </nav>
        <button className="admin-logout" onClick={handleLogout}>Log Out</button>
      </aside>

      <main className="admin-content">
        <header className="admin-header">
          <h2>Overview</h2>
          <div className="admin-profile">
            <span>Admin User</span>
            <div className="admin-avatar">A</div>
          </div>
        </header>

        <div className="admin-stats-grid">
          <div className="stat-card">
            <h3>Total Revenue</h3>
            <p className="stat-value">₹0</p>
          </div>
          <div className="stat-card">
            <h3>Total Orders</h3>
            <p className="stat-value">0</p>
          </div>
          <div className="stat-card">
            <h3>Total Products</h3>
            <p className="stat-value">12</p>
          </div>
          <div className="stat-card">
            <h3>Total Customers</h3>
            <p className="stat-value">0</p>
          </div>
        </div>

        <div className="admin-recent-orders">
          <h3>Recent Orders</h3>
          <div className="table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                    No orders found
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
