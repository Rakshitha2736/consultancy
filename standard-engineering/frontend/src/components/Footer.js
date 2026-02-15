import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-section">
            <h4>About Standard Engineering</h4>
            <p>Leading provider of quality steel and steel works management solutions.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/products">Products</a></li>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/">Home</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact Info</h4>
            <p>Email: info@standardengineering.com</p>
            <p>Phone: +1-800-STEEL-01</p>
          </div>
          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="#facebook">Facebook</a>
              <a href="#twitter">Twitter</a>
              <a href="#linkedin">LinkedIn</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {currentYear} Standard Engineering. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
