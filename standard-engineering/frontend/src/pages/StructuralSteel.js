import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CategoryPage.css';

const StructuralSteel = () => {
  const navigate = useNavigate();

  const products = [
    {
      name: 'Steel Beams',
      image: 'https://daks2k3a4ib2z.cloudfront.net/55c93f332795b0501c8e826f/5936f9ab5b0b327621f91a10_steel_i_beams_as_106083035.jpeg',
      description: 'Heavy-duty I-beams and H-beams'
    },
    {
      name: 'Steel Columns',
      image: 'https://cedarforestproducts.com/wp-content/uploads/2018/10/option-steel-columns.jpg',
      description: 'Load-bearing steel columns'
    },
    {
      name: 'Steel Angles',
      image: 'https://www.steelsupplylp.com/uploads/general/Angle-Iron.jpg',
      description: 'L-shaped steel profiles'
    },
    {
      name: 'Steel Channels',
      image: 'https://stainlessandalloy.com/images/jpg/stainless-steel-channel.jpg',
      description: 'C-channel and U-channel sections'
    },
    {
      name: 'Trusses',
      image: 'https://global-uploads.webflow.com/62de3a2033b75e22ac30bee1/63f3a366b13a11ff97a3e538_The%20queen%20post%20truss.jpg',
      description: 'Pre-fabricated steel trusses'
    },
    {
      name: 'PEB Structures',
      image: 'https://mgsarchitecture.in/images/Precast-PEB/254-Pre-engineered-BuildingSystems.jpg',
      description: 'Pre-engineered building structures'
    },
    {
      name: 'Industrial Sheds',
      image: 'https://www.aussiesheds.com.au/wp-content/uploads/Baker-Street-Geraldton-.jpg',
      description: 'Complete industrial shed solutions'
    },
    {
      name: 'Mezzanine Floors',
      image: 'https://witheys.co.uk/wp-content/uploads/2018/02/MEZZANINE-PAGE-NEXT-TO-TEXT-shutterstock_89635594.jpg',
      description: 'Space-efficient mezzanine systems'
    }
  ];

  return (
    <div className="category-page">
      <div className="category-header">
        <div className="container">
          <button onClick={() => navigate(-1)} className="back-btn">
            ← Back to Categories
          </button>
          <h1> Structural Steel Works</h1>
          <p>Industrial and infrastructure-grade steel solutions</p>
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

export default StructuralSteel;
