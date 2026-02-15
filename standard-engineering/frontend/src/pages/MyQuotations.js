import React, { useState, useEffect } from 'react';
import { quotationService } from '../services/api';
import Loading from '../components/Loading';
import './Quotations.css';

const MyQuotations = () => {
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchQuotations();
  }, []);

  const fetchQuotations = async () => {
    try {
      setLoading(true);
      const response = await quotationService.getQuotations();
      setQuotations(response.data.quotations);
    } catch (err) {
      setError('Failed to fetch quotations');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      'pending': 'badge-warning',
      'approved': 'badge-success',
      'rejected': 'badge-danger'
    };
    return statusMap[status] || 'badge-primary';
  };

  if (loading) return <Loading />;

  return (
    <div className="container mt-4">
      <h2>My Quotations</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      {quotations.length === 0 ? (
        <p className="text-center">No quotations found</p>
      ) : (
        <div className="quotations-list">
          {quotations.map((quotation) => (
            <div key={quotation._id} className="quotation-card">
              <div className="quotation-header">
                <h3>{quotation.quotationNumber}</h3>
                <span className={`badge ${getStatusBadge(quotation.status)}`}>
                  {quotation.status.toUpperCase()}
                </span>
              </div>

              <div className="quotation-details">
                <p><strong>Status:</strong> {quotation.status}</p>
                <p><strong>Created:</strong> {new Date(quotation.createdAt).toLocaleDateString()}</p>
                {quotation.validUntil && (
                  <p><strong>Valid Until:</strong> {new Date(quotation.validUntil).toLocaleDateString()}</p>
                )}
              </div>

              <div className="quotation-items">
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
                    {quotation.items.map((item, idx) => (
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

              <div className="quotation-total">
                <p><strong>Subtotal:</strong> ${quotation.subtotal?.toFixed(2) || '0.00'}</p>
                <p><strong>Tax:</strong> ${quotation.tax?.toFixed(2) || '0.00'}</p>
                <p className="grand-total"><strong>Total Amount:</strong> ${quotation.totalAmount.toFixed(2)}</p>
              </div>

              {quotation.notes && (
                <div className="quotation-notes">
                  <p><strong>Notes:</strong> {quotation.notes}</p>
                </div>
              )}

              {quotation.status === 'approved' && (
                <button className="btn btn-success">Proceed to Order</button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyQuotations;
