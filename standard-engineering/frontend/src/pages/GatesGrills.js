import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CategoryPage.css';

const GatesGrills = () => {
  const navigate = useNavigate();

  const products = [
    {
      name: 'Main Steel Gate',
      image: 'https://i.etsystatic.com/20483291/r/il/00a451/4307835574/il_fullxfull.4307835574_f1eu.jpg',
      description: 'Heavy-duty main entrance gates with reinforced security features'
    },
    {
      name: 'Sliding Gate',
      image: 'https://www.avon-barrier.com/wp-content/uploads/2016/08/Cantilever-gate-copy.jpg',
      description: 'Space-saving sliding gate systems with automated opening'
    },
    {
      name: 'Swing Gate',
      image: 'https://allsecurityequipment.com/cdn/shop/articles/7-common-mistakes-to-avoid-when-installing-a-driveway-swing-gate.jpg?v=1731685689',
      description: 'Traditional swing-style gates with customizable designs'
    },
    {
      name: 'Collapsible Gate',
      image: 'https://www.industrialdoorcompany.com/wp-content/uploads/2024/09/maxresdefault-1.jpg',
      description: 'Expandable security gates for temporary installations'
    },
    {
      name: 'Stainless Steel Gate',
      image: 'https://2.wlimg.com/product_images/bc-full/dir_63/1877701/image-01_p_1739597_369586.jpg',
      description: 'Rust-resistant stainless steel gates for coastal areas'
    },
    {
      name: 'Iron Safety Gate',
      image: 'https://www.99acres.com/microsite/wp-content/blogs.dir/6161/files/2023/07/Minimalistic-Elegance-Single-Door-Iron-Main-Gate.jpg',
      description: 'Heavy iron security gates with ornamental patterns'
    },
    {
      name: 'Grill Gate',
      image: 'https://5.imimg.com/data5/QN/NN/UP/SELLER-4178442/grill-gate-1000x1000.jpg',
      description: 'Decorative grill-style gates with artistic designs'
    },
    {
      name: 'Compound Wall Gate',
      image: 'https://coohom-biz-sg-s3.coohom.com/ins/static/article/modern-gate-compound-1758932167426699900.jpg',
      description: 'Gates for compound walls with matching design'
    }
  ];

  return (
    <div className="category-page">
      <div className="category-header">
        <div className="container">
          <button onClick={() => navigate(-1)} className="back-btn">
            ← Back to Categories
          </button>
          <h1> Gates & Grills</h1>
          <p>Secure and durable gate solutions for residential and commercial properties</p>
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
                <div className="product-actions">
                  <button 
                    className="btn btn-primary" 
                    onClick={() => navigate(`/gate/${index + 1}`)}
                  >
                    View Details
                  </button>
                  <button className="btn btn-outline">Request Quote</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GatesGrills;
