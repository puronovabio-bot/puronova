import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Filter, Eye, Edit, Download } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminOrders = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('https://puronova.onrender.com/api/admin/orders', { 
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

  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await axios.put(`https://puronova.onrender.com/api/admin/orders/${orderId}/status`, { status: newStatus }, { 
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        fetchOrders();
      }
    } catch (err) {
      console.error("Error updating order status:", err);
      alert("Failed to update status");
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (order.user?.name || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.orderStatus === statusFilter;
    
    let matchesDate = true;
    if (startDate) {
      matchesDate = matchesDate && new Date(order.createdAt) >= new Date(startDate);
    }
    if (endDate) {
      const end = new Date(endDate);
      end.setDate(end.getDate() + 1);
      matchesDate = matchesDate && new Date(order.createdAt) < end;
    }
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const exportToCSV = () => {
    if (filteredOrders.length === 0) {
      alert("No orders to export");
      return;
    }

    const headers = ['Order ID', 'Customer Name', 'Customer Email', 'Date', 'Total Amount', 'Payment Status', 'Payment Method', 'Order Status', 'Items'];
    
    const csvData = filteredOrders.map(order => {
      const itemsString = order.items.map(item => `${item.name} (${item.quantity}x${item.size})`).join('; ');
      return [
        order.orderNumber,
        order.user?.name || 'N/A',
        order.user?.email || 'N/A',
        new Date(order.createdAt).toLocaleDateString(),
        order.total,
        order.paymentStatus,
        order.paymentMethod,
        order.orderStatus,
        `"${itemsString}"`
      ];
    });

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `orders_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <div className="admin-loading">Loading orders...</div>;

  return (
    <div className="admin-orders-section">
      <div className="admin-section-header">
        <h3>Order Management</h3>
        <div className="admin-actions">
          <div className="admin-search">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search by Order ID or Customer..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="admin-filter" style={{ display: 'flex', gap: '8px' }}>
            <input 
              type="date" 
              value={startDate} 
              onChange={(e) => setStartDate(e.target.value)} 
              title="Start Date"
              style={{ border: 'none', background: 'transparent', outline: 'none', color: '#334155', fontSize: '13px' }}
            />
            <span style={{color: '#94a3b8'}}>-</span>
            <input 
              type="date" 
              value={endDate} 
              onChange={(e) => setEndDate(e.target.value)} 
              title="End Date"
              style={{ border: 'none', background: 'transparent', outline: 'none', color: '#334155', fontSize: '13px' }}
            />
          </div>
          <div className="admin-filter">
            <Filter size={18} />
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">All Status</option>
              <option value="placed">Placed</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <button onClick={exportToCSV} className="btn-action btn-success" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map(order => (
                <tr key={order._id}>
                  <td><strong>{order.orderNumber}</strong></td>
                  <td>
                    <div className="customer-cell">
                      <span>{order.user?.name || 'Guest'}</span>
                      <small className="text-muted">{order.user?.email || order.shippingAddress?.email}</small>
                    </div>
                  </td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>₹{order.total.toLocaleString()}</td>
                  <td>
                    <span className={`badge payment-${order.paymentStatus}`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td>
                    <select 
                      className={`status-select status-${order.orderStatus}`}
                      value={order.orderStatus}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    >
                      <option value="placed">Placed</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="icon-btn-small" title="View Details" onClick={() => setSelectedOrder(order)}>
                        <Eye size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '30px' }}>
                  No orders found matching your criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedOrder && (
        <div className="admin-modal-overlay">
          <div className="admin-modal" style={{ maxWidth: '600px' }}>
            <div className="admin-modal-header">
              <h3>Order Details: {selectedOrder.orderNumber}</h3>
              <button className="close-btn" onClick={() => setSelectedOrder(null)}>&times;</button>
            </div>
            <div className="admin-modal-body">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <h4>Customer Info</h4>
                  <p><strong>Name:</strong> {selectedOrder.user?.name || 'Guest'}</p>
                  <p><strong>Email:</strong> {selectedOrder.user?.email || selectedOrder.shippingAddress?.email}</p>
                  <p><strong>Phone:</strong> {selectedOrder.shippingAddress?.phone}</p>
                </div>
                <div>
                  <h4>Shipping Address</h4>
                  <p>{selectedOrder.shippingAddress?.street}</p>
                  <p>{selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state} {selectedOrder.shippingAddress?.zipCode}</p>
                  <p>{selectedOrder.shippingAddress?.country}</p>
                </div>
              </div>
              
              <h4>Items</h4>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '20px', borderTop: '1px solid #eee', paddingTop: '10px' }}>
                {selectedOrder.items.map((item, index) => (
                  <li key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #eee' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      {item.image && <img src={item.image} alt={item.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />}
                      <div>
                        <p style={{ margin: 0, fontWeight: '500' }}>{item.name}</p>
                        <small className="text-muted">Qty: {item.quantity}</small>
                      </div>
                    </div>
                    <strong>₹{(item.price * item.quantity).toLocaleString()}</strong>
                  </li>
                ))}
              </ul>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ width: '250px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>Subtotal:</span>
                    <span>₹{selectedOrder.subtotal?.toLocaleString()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>Shipping:</span>
                    <span>₹{selectedOrder.shippingCharge?.toLocaleString()}</span>
                  </div>
                  {selectedOrder.discount > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: '#e53e3e' }}>
                      <span>Discount:</span>
                      <span>-₹{selectedOrder.discount?.toLocaleString()}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #eee', paddingTop: '8px', fontWeight: 'bold', fontSize: '1.1rem' }}>
                    <span>Total:</span>
                    <span>₹{selectedOrder.total?.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
            </div>
            <div className="admin-modal-footer">
              <button className="btn-outline" onClick={() => setSelectedOrder(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
