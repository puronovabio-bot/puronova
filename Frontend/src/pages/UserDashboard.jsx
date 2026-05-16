import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-page">
      <div className="container dashboard-container">
        <aside className="dashboard-sidebar">
          <div className="user-profile-summary">
            <div className="avatar">{user.name.charAt(0).toUpperCase()}</div>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
          <nav className="dashboard-nav">
            <button className="active">My Orders</button>
            <button>Track Order</button>
            <button>Wishlist</button>
            <button>Address Book</button>
            <button>Account Settings</button>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </nav>
        </aside>

        <main className="dashboard-content">
          <div className="dashboard-header">
            <h2>My Orders</h2>
          </div>
          
          <div className="orders-list empty-state">
            <div className="empty-icon">📦</div>
            <h3>No orders yet</h3>
            <p>You haven't placed any orders. Start exploring our organic products!</p>
            <button className="btn btn-primary" onClick={() => navigate('/shop')}>Shop Now</button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
