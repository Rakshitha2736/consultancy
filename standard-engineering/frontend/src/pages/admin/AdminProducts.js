import React, { useState, useEffect } from 'react';
import { adminService, productService } from '../../services/api';
import Loading from '../../components/Loading';
import './AdminProducts.css';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'beams',
    description: '',
    specifications: { material: '', grade: '', dimensions: '', weight: '', finish: '' },
    unitPrice: '',
    unit: 'kg',
    stock: '',
    minStock: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getAllProducts({});
      setProducts(response.data.products);
    } catch (err) {
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('spec_')) {
      const specKey = name.replace('spec_', '');
      setFormData({
        ...formData,
        specifications: {
          ...formData.specifications,
          [specKey]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await productService.updateProduct(editingId, formData);
        setEditingId(null);
      } else {
        await productService.createProduct(formData);
      }
      setFormData({
        name: '',
        category: 'beams',
        description: '',
        specifications: { material: '', grade: '', dimensions: '', weight: '', finish: '' },
        unitPrice: '',
        unit: 'kg',
        stock: '',
        minStock: ''
      });
      setShowForm(false);
      fetchProducts();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save product');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productService.deleteProduct(id);
        fetchProducts();
      } catch (err) {
        setError('Failed to delete product');
      }
    }
  };

  const handleEdit = (product) => {
    setFormData({
      ...product,
      unitPrice: product.unitPrice || '',
      stock: product.stock || '',
      minStock: product.minStock || ''
    });
    setEditingId(product._id);
    setShowForm(true);
  };

  if (loading) return <Loading />;

  return (
    <div className="container mt-4">
      <div className="page-header">
        <h2>Manage Products</h2>
        <button className="btn btn-primary" onClick={() => {
          setShowForm(!showForm);
          setEditingId(null);
        }}>
          {showForm ? 'Cancel' : 'Add Product'}
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {showForm && (
        <form onSubmit={handleSubmit} className="product-form">
          <h3>{editingId ? 'Edit Product' : 'Add New Product'}</h3>

          <div className="form-row">
            <div className="form-group">
              <label>Name *</label>
              <input type="text" name="name" value={formData.name} onChange={handleFormChange} required />
            </div>
            <div className="form-group">
              <label>Category *</label>
              <select name="category" value={formData.category} onChange={handleFormChange} required>
                <option value="beams">Beams</option>
                <option value="rods">Rods</option>
                <option value="sheets">Sheets</option>
                <option value="pipes">Pipes</option>
                <option value="angles">Angles</option>
                <option value="channels">Channels</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={handleFormChange} rows="3"></textarea>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Material</label>
              <input type="text" name="spec_material" value={formData.specifications.material} onChange={handleFormChange} />
            </div>
            <div className="form-group">
              <label>Grade</label>
              <input type="text" name="spec_grade" value={formData.specifications.grade} onChange={handleFormChange} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Unit Price *</label>
              <input type="number" name="unitPrice" value={formData.unitPrice} onChange={handleFormChange} step="0.01" required />
            </div>
            <div className="form-group">
              <label>Unit *</label>
              <select name="unit" value={formData.unit} onChange={handleFormChange} required>
                <option value="kg">Kilogram</option>
                <option value="meter">Meter</option>
                <option value="piece">Piece</option>
                <option value="ton">Ton</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Stock</label>
              <input type="number" name="stock" value={formData.stock} onChange={handleFormChange} />
            </div>
            <div className="form-group">
              <label>Minimum Stock</label>
              <input type="number" name="minStock" value={formData.minStock} onChange={handleFormChange} />
            </div>
          </div>

          <button type="submit" className="btn btn-success">Save Product</button>
        </form>
      )}

      <div className="products-table">
        {products.length === 0 ? (
          <p>No products found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>${product.unitPrice.toFixed(2)}/{product.unit}</td>
                  <td>{product.stock}</td>
                  <td>
                    <button className="btn btn-small btn-primary" onClick={() => handleEdit(product)}>Edit</button>
                    <button className="btn btn-small btn-danger" onClick={() => handleDelete(product._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;
