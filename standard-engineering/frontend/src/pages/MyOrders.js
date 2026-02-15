import React, { useState, useEffect } from 'react';
import { orderService } from '../services/api';
import Loading from '../components/Loading';
import './MyOrders.css';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  const getStatusBadge = (status) => {
    const statusMap = {
      'order_received': 'badge-warning',
      'in_production': 'badge-info',
      'completed': 'badge-success',
      'delivered': 'badge-success',
      'cancelled': 'badge-danger'
    };
    return statusMap[status] || 'badge-primary';
  };

  if (loading) return <Loading />;

  return (
    <div className="container mt-4">
      <h2>My Orders</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      {orders.length === 0 ? (
        <p className="text-center">No orders found</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <h3>{order.orderNumber}</h3>
                <span className={`badge ${getStatusBadge(order.status)}`}>
                  {order.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>

              <div className="order-details">
                <p><strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}</p>
                <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                {order.estimatedDelivery && (
                  <p><strong>Estimated Delivery:</strong> {new Date(order.estimatedDelivery).toLocaleDateString()}</p>
                )}
                {order.actualDelivery && (
                  <p><strong>Delivered:</strong> {new Date(order.actualDelivery).toLocaleDateString()}</p>
                )}
              </div>

              <div className="order-items">
                <h5>Items</h5>
                <table>
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th>Quantity</th>
                      <th>Unit Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.description}</td>
                        <td>{item.quantity}</td>
                        <td>${item.unitPrice.toFixed(2)}</td>
                        <td>${item.totalPrice.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {order.invoiceNumber && (
                <div className="invoice-section">
                  <p><strong>Invoice:</strong> {order.invoiceNumber}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
