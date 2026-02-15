import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Standard Engineering</h1>
            <p>Online Steel & Steel Works Management System</p>
            <p className="subtitle">Your trusted partner for quality steel products and custom fabrication</p>
            <div className="hero-buttons">
              <Link to="/products" className="btn btn-primary">Browse Products</Link>
              <Link to="/contact" className="btn btn-outline">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Why Choose Us */}
      <section className="features">
        <div className="container">
          <h2>Why Choose Us</h2>
          <p className="section-subtitle">Discover the advantages that set us apart in the steel industry</p>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <span>🏆</span>
              </div>
              <h3>Quality Products</h3>
              <p>Premium steel products sourced from certified suppliers with rigorous quality control measures</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <span>🔧</span>
              </div>
              <h3>Custom Solutions</h3>
              <p>Tailored fabrication services for your specific needs with expert engineering support</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <span>📱</span>
              </div>
              <h3>Real-time Tracking</h3>
              <p>Monitor your orders from production to delivery with our advanced tracking system</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <span>👨‍💼</span>
              </div>
              <h3>Expert Team</h3>
              <p>Experienced engineers and support staff with decades of industry expertise</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <span>⚡</span>
              </div>
              <h3>Fast Quotes</h3>
              <p>Quick quotation generation for your projects with competitive pricing</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <span>📞</span>
              </div>
              <h3>24/7 Support</h3>
              <p>Dedicated customer support team ready to assist you anytime</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Category Section */}
      <section className="categories">
        <div className="container">
          <h2>Our Product Categories</h2>
          <p className="categories-subtitle">Explore our premium steel products with detailed images and specifications</p>

          <div className="categories-grid">
            <Link to="/category/gates-grills" className="category-card">
              <div className="category-image">
                <img src="https://stylesatlife.com/wp-content/uploads/2023/08/Main-Gate-Grill-Design-For-Home.jpg" alt="Gates & Grills" />
              </div>
              <div className="category-content">
                <h4>Gates & Grills</h4>
                <p>Secure and durable gate solutions with premium finishes</p>
              </div>
            </Link>

            <Link to="/category/grills-railings" className="category-card">
              <div className="category-image">
                <img src="https://thearchitecturedesigns.com/wp-content/uploads/2020/03/grill-design-for-balcony-18-759x500.jpg" alt="Grills & Railings" />
              </div>
              <div className="category-content">
                <h4>Grills & Railings</h4>
                <p>Elegant protection for homes and offices with custom designs</p>
              </div>
            </Link>

            <Link to="/category/structural-steel" className="category-card">
              <div className="category-image">
                <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=80" alt="Structural Steel Works" />
              </div>
              <div className="category-content">
                <h4>Structural Steel Works</h4>
                <p>Industrial and infrastructure-grade steel solutions</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <h2>Ready to Get Started?</h2>
          <p>Browse our products or submit your custom requirements today</p>
          <Link to="/register" className="btn btn-primary">Create Account</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
