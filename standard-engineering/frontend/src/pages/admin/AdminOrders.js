import React, { useState, useEffect } from 'react';
import { adminService, orderService } from '../../services/api';
import Loading from '../../components/Loading';
import './AdminOrders.css';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusUpdate, setStatusUpdate] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await orderService.getOrders();
      setOrders(response.data.orders);
    } catch (err) {
      setError('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId) => {
    if (!statusUpdate) {
      setError('Please select a status');
      return;
    }

    try {
      await orderService.updateOrder(orderId, { status: statusUpdate });
      setStatusUpdate('');
      setSelectedOrder(null);
      fetchOrders();
    } catch (err) {
      setError('Failed to update order');
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      'order_received': 'badge-warning',
      'in_production': 'badge-info',
      'completed': 'badge-primary',
      'delivered': 'badge-success',
      'cancelled': 'badge-danger'
    };
    return statusMap[status] || 'badge-primary';
  };

  if (loading) return <Loading />;

  return (
    <div className="container mt-4">
      <h2>Manage Orders</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="orders-management">
        {orders.length === 0 ? (
          <p>No orders found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Order Number</th>
                <th>Customer</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.orderNumber}</td>
                  <td>{order.userId?.firstName} {order.userId?.lastName}</td>
                  <td>${order.totalAmount.toFixed(2)}</td>
                  <td><span className={`badge ${getStatusBadge(order.status)}`}>{order.status.replace('_', ' ')}</span></td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button className="btn btn-small btn-primary" onClick={() => setSelectedOrder(order._id)}>
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Update Order Status</h3>
            <div className="form-group">
              <label>New Status</label>
              <select value={statusUpdate} onChange={(e) => setStatusUpdate(e.target.value)}>
                <option value="">Select Status</option>
                <option value="order_received">Order Received</option>
                <option value="in_production">In Production</option>
                <option value="completed">Completed</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="modal-actions">
              <button className="btn btn-success" onClick={() => handleStatusUpdate(selectedOrder)}>Update</button>
              <button className="btn btn-danger" onClick={() => setSelectedOrder(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
