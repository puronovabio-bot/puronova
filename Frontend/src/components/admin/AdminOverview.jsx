import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { IndianRupee, ShoppingBag, Package, Users, AlertCircle, CheckCircle, Clock, XCircle } from 'lucide-react';

const AdminOverview = ({ stats }) => {
  if (!stats) return <div className="admin-loading">Loading dashboard...</div>;

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const formattedMonthlySales = stats.monthlySales?.map(m => ({
    name: monthNames[m._id - 1] || m._id,
    revenue: m.revenue,
    orders: m.count
  })) || [];

  return (
    <div className="admin-overview">
      <div className="admin-stats-grid">
        <div className="stat-card">
          <div className="stat-icon-wrapper revenue">
            <IndianRupee size={24} />
          </div>
          <div className="stat-info">
            <h3>Total Revenue</h3>
            <p className="stat-value">₹{stats.totalRevenue?.toLocaleString() || 0}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-wrapper orders">
            <ShoppingBag size={24} />
          </div>
          <div className="stat-info">
            <h3>Total Orders</h3>
            <p className="stat-value">{stats.totalOrders || 0}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-wrapper products">
            <Package size={24} />
          </div>
          <div className="stat-info">
            <h3>Products</h3>
            <p className="stat-value">{stats.totalProducts || 0}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-wrapper customers">
            <Users size={24} />
          </div>
          <div className="stat-info">
            <h3>Customers</h3>
            <p className="stat-value">{stats.totalCustomers || 0}</p>
          </div>
        </div>
      </div>

      <div className="admin-secondary-stats">
        <div className="stat-mini-card">
          <Clock className="text-warning" size={20} />
          <span>Pending Orders</span>
          <strong>{stats.pendingOrders || 0}</strong>
        </div>
        <div className="stat-mini-card">
          <CheckCircle className="text-success" size={20} />
          <span>Delivered</span>
          <strong>{stats.deliveredOrders || 0}</strong>
        </div>
        <div className="stat-mini-card">
          <XCircle className="text-danger" size={20} />
          <span>Cancelled</span>
          <strong>{stats.cancelledOrders || 0}</strong>
        </div>
        <div className="stat-mini-card">
          <AlertCircle className="text-warning" size={20} />
          <span>Low Stock</span>
          <strong>{stats.lowStockAlerts?.length || 0}</strong>
        </div>
      </div>

      <div className="admin-charts-section">
        <div className="chart-container">
          <h3>Revenue Analytics</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={formattedMonthlySales} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `₹${value}`} />
                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Line type="monotone" dataKey="revenue" stroke="#1a5336" strokeWidth={3} dot={{ r: 4, fill: '#1a5336', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-container">
          <h3>Best Selling Products</h3>
          <div className="best-selling-list">
            {stats.bestSelling?.length > 0 ? (
              stats.bestSelling.map((item, index) => (
                <div key={index} className="best-selling-item">
                  <div className="bs-info">
                    <span className="bs-rank">#{index + 1}</span>
                    <span className="bs-name">{item._id}</span>
                  </div>
                  <div className="bs-stats">
                    <span className="bs-sold">{item.totalSold} sold</span>
                    <span className="bs-rev">₹{item.revenue.toLocaleString()}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-data">No sales data available yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
