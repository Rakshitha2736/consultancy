import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CategoryPage.css';

const GrillsRailings = () => {
  const navigate = useNavigate();

  const products = [
    {
      name: 'Window Grills',
      image: 'https://i.pinimg.com/originals/bb/8b/e7/bb8be71af36f2cb0b8c43b278c578f51.jpg',
      description: 'Decorative and secure window protection'
    },
    {
      name: 'Balcony Railings',
      image: 'https://thearchitecturedesigns.com/wp-content/uploads/2020/06/balcony-reiling-13.jpg',
      description: 'Modern balcony safety railings'
    },
    {
      name: 'Staircase Railings',
      image: 'https://www.bhg.com/thmb/ExT-cjxitFtOwDS3pipW3i2BlbY=/1244x0/filters:no_upscale():strip_icc()/decorative-iron-railing-spiral-stairs-daad86e8-eb1f9962b99e44c581eec7ce5f4e44ca.jpg',
      description: 'Elegant staircase handrails'
    },
    {
      name: 'Handrails',
      image: 'https://m.media-amazon.com/images/I/61IwZwjLALL.jpg',
      description: 'Safety handrails for all applications'
    },
    {
      name: 'Stainless Steel Railings',
      image: 'https://famaluminium.com/wp-content/uploads/2022/07/Stainless-Stairs-scaled.jpg',
      description: 'Premium stainless steel railings'
    }
  ];

  return (
    <div className="category-page">
      <div className="category-header">
        <div className="container">
          <button onClick={() => navigate(-1)} className="back-btn">
            ← Back to Categories
          </button>
          <h1> Grills & Railings</h1>
          <p>Elegant protection for homes and offices</p>
        </div>
      </div>

      <div className="container">
        <div className="products-grid">
          {products.map((product, index) => (
            <div key={index} className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <button className="btn btn-primary">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GrillsRailings;
