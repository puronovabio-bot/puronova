import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Menu, X } from 'lucide-react';
import './AdminDashboard.css';

import AdminOverview from '../components/admin/AdminOverview';
import AdminOrders from '../components/admin/AdminOrders';
import AdminCustomers from '../components/admin/AdminCustomers';
import AdminBlogs from '../components/admin/AdminBlogs';

const AdminDashboard = () => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  const fetchDashboardStats = React.useCallback(async () => {
    try {
      const res = await axios.get('https://puronova.onrender.com/api/admin/dashboard', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setStats(res.data.stats);
      }
    } catch (err) {
      console.error("Error fetching admin stats", err);
    }
  }, [token]);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/admin-login');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (activeTab === 'dashboard' && user && user.role === 'admin') {
      fetchDashboardStats();
    }
  }, [activeTab, user, fetchDashboardStats]);

  if (!user || user.role !== 'admin') {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminOverview stats={stats} />;
      case 'orders':
        return <AdminOrders />;
      case 'customers':
        return <AdminCustomers />;
      case 'blogs':
        return <AdminBlogs />;
      default:
        return <div className="admin-placeholder">Feature coming soon in next phase!</div>;
    }
  };

  return (
    <div className="admin-dashboard-page">
      {/* Overlay to click-away to close sidebar on mobile */}
      {isMobileMenuOpen && (
        <div className="admin-sidebar-overlay" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}
      
      <aside className={`admin-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="admin-brand" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div>
            <h2>PURO NOVA</h2>
            <span>Admin Portal</span>
          </div>
          <button className="admin-mobile-close" onClick={toggleMobileMenu}><X size={24} /></button>
        </div>
        <nav className="admin-nav">
          <button className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => handleTabChange('dashboard')}>Dashboard</button>
          <button className={activeTab === 'orders' ? 'active' : ''} onClick={() => handleTabChange('orders')}>Orders</button>
          <button className={activeTab === 'customers' ? 'active' : ''} onClick={() => handleTabChange('customers')}>Customers</button>
          <button className={activeTab === 'blogs' ? 'active' : ''} onClick={() => handleTabChange('blogs')}>Blogs</button>
          <button className={activeTab === 'products' ? 'active' : ''} onClick={() => handleTabChange('products')}>Products</button>
          <button className={activeTab === 'categories' ? 'active' : ''} onClick={() => handleTabChange('categories')}>Categories</button>
          <button className={activeTab === 'coupons' ? 'active' : ''} onClick={() => handleTabChange('coupons')}>Coupons</button>
        </nav>
        <button className="admin-logout" onClick={handleLogout}>Log Out</button>
      </aside>

      <main className="admin-content">
        <header className="admin-header">
          <button className="admin-mobile-toggle" onClick={toggleMobileMenu}>
            <Menu size={24} />
          </button>
          <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
          <div className="admin-profile">
            <span>Admin User</span>
            <div className="admin-avatar">A</div>
          </div>
        </header>

        <div className="admin-main-view">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
