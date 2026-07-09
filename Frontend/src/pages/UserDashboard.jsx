import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const UserDashboard = () => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('orders');

  useEffect(() => {
    if (user && token) {
      fetchOrders();
    } else if (!user && !loading) {
      navigate('/login');
    }
  }, [user, token]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('https://puronova.onrender.com/api/orders/myorders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setOrders(res.data.orders);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
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
            <div className="user-info-text">
              <h3>{user.name}</h3>
              <p>{user.email}</p>
            </div>
          </div>
          <nav className="dashboard-nav">
            <button className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>My Orders</button>
            <button className={activeTab === 'payments' ? 'active' : ''} onClick={() => setActiveTab('payments')}>Payments</button>
            <button className={activeTab === 'track' ? 'active' : ''} onClick={() => setActiveTab('track')}>Track Order</button>
            <button className={activeTab === 'wishlist' ? 'active' : ''} onClick={() => navigate('/wishlist')}>Wishlist</button>
            <button className={activeTab === 'address' ? 'active' : ''} onClick={() => setActiveTab('address')}>Address Book</button>
            <button className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}>Account Settings</button>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </nav>
        </aside>

        <main className="dashboard-content">
          {activeTab === 'orders' && (
            <>
              <div className="dashboard-header">
                <h2>My Orders</h2>
              </div>
              
              {loading ? (
                <div style={{ padding: '20px', textAlign: 'center' }}>Loading orders...</div>
              ) : orders.length > 0 ? (
                <div className="orders-list">
                  {orders.map(order => (
                    <div key={order._id} className="order-card" style={{border: '1px solid #eaeaea', padding: '20px', marginBottom: '20px', borderRadius: '10px', backgroundColor: '#fff'}}>
                      <div className="order-header" style={{borderBottom: '1px solid #eaeaea', paddingBottom: '15px', marginBottom: '15px'}}>
                        <div>
                          <h4 style={{margin: '0 0 5px 0', color: '#1e4d3b', wordBreak: 'break-all'}}>Order #{order.orderNumber}</h4>
                          <p style={{margin: 0, fontSize: '14px', color: '#666'}}>Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="order-status-badge">
                          <span className={`status-badge ${order.orderStatus}`} style={{padding: '6px 12px', borderRadius: '20px', background: '#f0fdf4', color: '#166534', fontSize: '13px', fontWeight: '600', textTransform: 'capitalize', display: 'inline-block'}}>{order.orderStatus}</span>
                        </div>
                      </div>
                      
                      <div className="order-items">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="order-item" style={{marginBottom: '15px'}}>
                            <img src={item.image} alt={item.name} style={{width: '60px', height: '60px', objectFit: 'cover', borderRadius: '6px', marginRight: '15px', border: '1px solid #eee'}} />
                            <div className="order-item-details" style={{flex: 1}}>
                              <p style={{margin: '0 0 4px 0', fontWeight: '600', color: '#333'}}>{item.name}</p>
                              <p style={{margin: 0, fontSize: '13px', color: '#777'}}>Qty: {item.quantity} | Size: {item.size}</p>
                            </div>
                            <div className="order-item-price" style={{fontWeight: '600', color: '#1e4d3b'}}>₹{item.price * item.quantity}</div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="order-footer" style={{borderTop: '1px solid #eaeaea', paddingTop: '15px', marginTop: '5px'}}>
                        <div>
                          <p style={{margin: 0, fontSize: '14px', color: '#555'}}>Payment: <strong style={{color: order.paymentStatus === 'paid' ? '#166534' : (order.paymentStatus === 'failed' ? '#dc2626' : '#d97706'), textTransform: 'capitalize'}}>{order.paymentStatus}</strong> ({order.paymentMethod.toUpperCase()})</p>
                        </div>
                        <div>
                          <h4 style={{margin: 0, color: '#1e4d3b', fontSize: '18px'}}>Total: ₹{order.total}</h4>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="orders-list empty-state">
                  <div className="empty-icon">📦</div>
                  <h3>No orders yet</h3>
                  <p>You haven't placed any orders. Start exploring our natural products!</p>
                  <button className="btn btn-primary" onClick={() => navigate('/shop')}>Shop Now</button>
                </div>
              )}
            </>
          )}

          {activeTab === 'payments' && (
            <>
              <div className="dashboard-header">
                <h2>Payment History</h2>
              </div>
              {loading ? (
                <div style={{ padding: '20px', textAlign: 'center' }}>Loading payments...</div>
              ) : orders.length > 0 ? (
                <div className="orders-list">
                  <table className="payment-table">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Method</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(order => (
                        <tr key={order._id}>
                          <td data-label="Order ID" className="fw-500">{order.orderNumber}</td>
                          <td data-label="Date" className="text-muted">{new Date(order.createdAt).toLocaleDateString()}</td>
                          <td data-label="Amount" className="fw-600">₹{order.total}</td>
                          <td data-label="Method" className="text-uppercase">{order.paymentMethod}</td>
                          <td data-label="Status">
                             <span className={`status-badge payment-${order.paymentStatus}`}>{order.paymentStatus}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="orders-list empty-state">
                  <div className="empty-icon">💳</div>
                  <h3>No payment history</h3>
                  <p>You haven't made any payments yet.</p>
                </div>
              )}
            </>
          )}

          {['track', 'address', 'settings'].includes(activeTab) && (
             <>
               <div className="dashboard-header">
                 <h2 style={{textTransform: 'capitalize'}}>{activeTab === 'track' ? 'Track Order' : activeTab === 'address' ? 'Address Book' : 'Account Settings'}</h2>
               </div>
               <div style={{ padding: '40px 20px', textAlign: 'center', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eaeaea' }}>
                 <div style={{ fontSize: '40px', marginBottom: '15px' }}>🚧</div>
                 <h3 style={{ marginBottom: '10px', color: '#1e4d3b' }}>Coming Soon</h3>
                 <p style={{ color: '#666' }}>This feature is currently under development. Please check back later!</p>
               </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
