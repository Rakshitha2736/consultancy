import React, { useState, useEffect } from 'react';
import { productService } from '../services/api';
import Loading from '../components/Loading';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getAllProducts({ category, search });
      setProducts(response.data.products);
      setError('');
    } catch (err) {
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = () => {
    fetchProducts();
  };

  if (loading) return <Loading />;

  return (
    <div className="container mt-4">
      <h2>Steel Products</h2>

      <div className="filter-section">
        <div className="filter-group">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            <option value="beams">Beams</option>
            <option value="rods">Rods</option>
            <option value="sheets">Sheets</option>
            <option value="pipes">Pipes</option>
            <option value="angles">Angles</option>
            <option value="channels">Channels</option>
          </select>
          <button className="btn btn-primary" onClick={handleFilter}>Filter</button>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {products.length === 0 ? (
        <p className="text-center">No products found</p>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              <h3>{product.name}</h3>
              <p className="category">
                <span className="badge badge-info">{product.category}</span>
              </p>
              <p className="description">{product.description}</p>
              <div className="specs">
                <p><strong>Material:</strong> {product.specifications?.material}</p>
                <p><strong>Grade:</strong> {product.specifications?.grade}</p>
                <p><strong>Price:</strong> ${product.unitPrice}/{product.unit}</p>
              </div>
              <p className={`stock ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                Stock: {product.stock} {product.unit}
              </p>
              <button className="btn btn-primary">View Details</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
