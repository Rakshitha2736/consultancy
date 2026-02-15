import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/api';
import Loading from '../../components/Loading';
import '../Dashboard.css';

const AdminDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const response = await adminService.getDashboard();
      setDashboard(response.data.dashboard);
    } catch (err) {
      setError('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!dashboard) return <div>No data available</div>;

  return (
    <div className="container mt-4">
      <h2>Admin Dashboard</h2>

      <div className="dashboard-cards">
        <div className="card stat-card">
          <h4>{dashboard.totalUsers}</h4>
          <p>Total Users</p>
        </div>
        <div className="card stat-card">
          <h4>{dashboard.totalProducts}</h4>
          <p>Products</p>
        </div>
        <div className="card stat-card">
          <h4>{dashboard.totalOrders}</h4>
          <p>Total Orders</p>
        </div>
        <div className="card stat-card">
          <h4>{dashboard.totalQuotations}</h4>
          <p>Quotations</p>
        </div>
      </div>

      <div className="dashboard-section">
        <h3>Quick Stats</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <p>Pending Quotations</p>
            <h3 className="warning">{dashboard.pendingQuotations}</h3>
          </div>
          <div className="stat-item">
            <p>Pending Requirements</p>
            <h3 className="info">{dashboard.pendingRequirements}</h3>
          </div>
          <div className="stat-item">
            <p>Orders in Production</p>
            <h3 className="primary">{dashboard.orderStats.inProduction}</h3>
          </div>
          <div className="stat-item">
            <p>Delivered Orders</p>
            <h3 className="success">{dashboard.orderStats.delivered}</h3>
          </div>
        </div>
      </div>

      <div className="dashboard-section">
        <h3>Recent Orders</h3>
        {dashboard.recentOrders.length === 0 ? (
          <p>No recent orders</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Order Number</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {dashboard.recentOrders.map((order) => (
                <tr key={order._id}>
                  <td>{order.orderNumber}</td>
                  <td>{order.userId?.firstName} {order.userId?.lastName}</td>
                  <td>${order.totalAmount.toFixed(2)}</td>
                  <td><span className="badge badge-info">{order.status.replace('_', ' ')}</span></td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
