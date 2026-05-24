import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Ban, CheckCircle, Mail, MapPin } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminCustomers = () => {
  const { token } = useAuth();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchCustomers = async () => {
    try {
      const res = await axios.get('https://puronova.onrender.com/api/admin/customers', { 
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setCustomers(res.data.customers);
      }
    } catch (err) {
      console.error("Error fetching customers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchCustomers();
  }, [token]);

  const handleToggleBlock = async (customerId) => {
    try {
      const res = await axios.put(`https://puronova.onrender.com/api/admin/customers/${customerId}/block`, {}, { 
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        fetchCustomers();
      }
    } catch (err) {
      console.error("Error toggling customer block status:", err);
      alert("Failed to update status");
    }
  };

  const filteredCustomers = customers.filter(c => {
    return c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
           c.email.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (loading) return <div className="admin-loading">Loading customers...</div>;

  return (
    <div className="admin-customers-section">
      <div className="admin-section-header">
        <h3>Customer Management</h3>
        <div className="admin-actions">
          <div className="admin-search">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact Info</th>
              <th>Joined Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map(customer => (
                <tr key={customer._id} className={!customer.isActive ? 'row-inactive' : ''}>
                  <td>
                    <div className="customer-name-avatar">
                      <div className="avatar-circle">{customer.name.charAt(0).toUpperCase()}</div>
                      <strong>{customer.name}</strong>
                    </div>
                  </td>
                  <td>
                    <div className="contact-cell">
                      <span className="contact-item"><Mail size={14} /> {customer.email}</span>
                      {customer.phone && <span className="contact-item"><MapPin size={14} /> {customer.phone}</span>}
                    </div>
                  </td>
                  <td>{new Date(customer.createdAt).toLocaleDateString()}</td>
                  <td>
                    <span className={`badge ${customer.isActive ? 'badge-success' : 'badge-danger'}`}>
                      {customer.isActive ? 'Active' : 'Blocked'}
                    </span>
                  </td>
                  <td>
                    <button 
                      className={`btn-action ${customer.isActive ? 'btn-danger' : 'btn-success'}`}
                      onClick={() => handleToggleBlock(customer._id)}
                    >
                      {customer.isActive ? <><Ban size={16} /> Block</> : <><CheckCircle size={16} /> Unblock</>}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '30px' }}>
                  No customers found matching your criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCustomers;
