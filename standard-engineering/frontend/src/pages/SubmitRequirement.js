import React, { useState, useContext } from 'react';
import { requirementService } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import './Submissions.css';

const SubmitRequirement = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    materialType: '',
    dimensions: '',
    quantity: '',
    unit: 'kg',
    designNotes: '',
    deliveryDate: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const { isAuthenticated } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      await requirementService.submitRequirement(formData);
      setMessage('Requirement submitted successfully! Our team will review it soon.');
      setFormData({
        title: '',
        description: '',
        materialType: '',
        dimensions: '',
        quantity: '',
        unit: 'kg',
        designNotes: '',
        deliveryDate: ''
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit requirement');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container">
        <div className="alert alert-info">Please login to submit custom requirements.</div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Submit Custom Fabrication Requirements</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}

      <form onSubmit={handleSubmit} className="requirement-form">
        <div className="form-group">
          <label>Project Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
          ></textarea>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Material Type *</label>
            <input
              type="text"
              name="materialType"
              value={formData.materialType}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Dimensions *</label>
            <input
              type="text"
              name="dimensions"
              value={formData.dimensions}
              onChange={handleChange}
              required
              placeholder="e.g., 100x50x10mm"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Quantity *</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              min="1"
            />
          </div>
          <div className="form-group">
            <label>Unit *</label>
            <select name="unit" value={formData.unit} onChange={handleChange}>
              <option value="kg">Kilogram (kg)</option>
              <option value="meter">Meter (m)</option>
              <option value="piece">Piece</option>
              <option value="ton">Ton</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Design Notes</label>
          <textarea
            name="designNotes"
            value={formData.designNotes}
            onChange={handleChange}
            rows="4"
            placeholder="Any specific requirements or notes..."
          ></textarea>
        </div>

        <div className="form-group">
          <label>Required Delivery Date</label>
          <input
            type="date"
            name="deliveryDate"
            value={formData.deliveryDate}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Requirement'}
        </button>
      </form>
    </div>
  );
};

export default SubmitRequirement;
