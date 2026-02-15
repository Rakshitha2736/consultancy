import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './GateDetails.css';

const GateDetails = () => {
  const navigate = useNavigate();
  const { gateId } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [showZoom, setShowZoom] = useState(false);

  // Gate data mapping based on ID
  const gateDatabase = {
    '1': {
      name: 'Main Steel Gate',
      images: [
        'https://i.etsystatic.com/20483291/r/il/00a451/4307835574/il_fullxfull.4307835574_f1eu.jpg',
        'https://www.avon-barrier.com/wp-content/uploads/2016/08/Cantilever-gate-copy.jpg'
      ],
      description: 'Heavy-duty main entrance gates with reinforced security features',
      features: [
        'Heavy-duty galvanized steel construction',
        'Powder-coated finish for weather resistance',
        'Reinforced frame for maximum strength',
        'Smooth operation with quality hinges',
        'Customizable designs available',
        'Professional installation service'
      ],
      specifications: {
        material: 'Galvanized Steel',
        finish: 'Powder Coated',
        warranty: '10 Years',
        thickness: '2mm - 3mm'
      },
      basePrice: 1200
    },
    '2': {
      name: 'Sliding Gate',
      images: [
        'https://www.avon-barrier.com/wp-content/uploads/2016/08/Cantilever-gate-copy.jpg',
        'https://i.etsystatic.com/20483291/r/il/00a451/4307835574/il_fullxfull.4307835574_f1eu.jpg'
      ],
      description: 'Space-saving sliding gate systems with automated opening',
      features: [
        'Automatic sliding mechanism',
        'Weather-resistant materials',
        'Remote control operation',
        'Safety sensors included',
        'Low maintenance design',
        'Quiet operation'
      ],
      specifications: {
        material: 'Aluminum & Steel',
        finish: 'Powder Coated',
        warranty: '8 Years',
        thickness: '2.5mm - 3.5mm'
      },
      basePrice: 2000
    },
    '3': {
      name: 'Swing Gate',
      images: [
        'https://allsecurityequipment.com/cdn/shop/articles/7-common-mistakes-to-avoid-when-installing-a-driveway-swing-gate.jpg?v=1731685689',
        'https://www.avon-barrier.com/wp-content/uploads/2016/08/Cantilever-gate-copy.jpg'
      ],
      description: 'Traditional swing-style gates with customizable designs',
      features: [
        'Classic swing mechanism',
        'Custom design options',
        'Durable construction',
        'Manual or automatic operation',
        'Decorative elements available',
        'Easy maintenance'
      ],
      specifications: {
        material: 'Wrought Iron',
        finish: 'Powder Coated',
        warranty: '7 Years',
        thickness: '1.5mm - 2.5mm'
      },
      basePrice: 800
    },
    '4': {
      name: 'Collapsible Gate',
      images: [
        'https://www.industrialdoorcompany.com/wp-content/uploads/2024/09/maxresdefault-1.jpg',
        'https://i.etsystatic.com/20483291/r/il/00a451/4307835574/il_fullxfull.4307835574_f1eu.jpg'
      ],
      description: 'Expandable security gates for temporary installations',
      features: [
        'Expandable design',
        'Portable and removable',
        'Quick installation',
        'High security features',
        'Weather resistant',
        'Cost-effective solution'
      ],
      specifications: {
        material: 'Steel Frame',
        finish: 'Galvanized',
        warranty: '5 Years',
        thickness: '2mm - 3mm'
      },
      basePrice: 400
    },
    '5': {
      name: 'Stainless Steel Gate',
      images: [
        'https://2.wlimg.com/product_images/bc-full/dir_63/1877701/image-01_p_1739597_369586.jpg',
        'https://allsecurityequipment.com/cdn/shop/articles/7-common-mistakes-to-avoid-when-installing-a-driveway-swing-gate.jpg?v=1731685689'
      ],
      description: 'Rust-resistant stainless steel gates for coastal areas',
      features: [
        'Corrosion-resistant stainless steel',
        'Ideal for coastal environments',
        'Low maintenance requirements',
        'Premium finish and appearance',
        'Long-lasting durability',
        'Professional installation'
      ],
      specifications: {
        material: 'Grade 304 Stainless',
        finish: 'Brushed Stainless',
        warranty: '12 Years',
        thickness: '1.5mm - 2mm'
      },
      basePrice: 1500
    },
    '6': {
      name: 'Iron Safety Gate',
      images: [
        'https://www.99acres.com/microsite/wp-content/blogs.dir/6161/files/2023/07/Minimalistic-Elegance-Single-Door-Iron-Main-Gate.jpg',
        'https://www.avon-barrier.com/wp-content/uploads/2016/08/Cantilever-gate-copy.jpg'
      ],
      description: 'Heavy iron security gates with ornamental patterns',
      features: [
        'Ornamental iron design',
        'Maximum security protection',
        'Custom pattern options',
        'Heavy-duty construction',
        'Professional craftsmanship',
        'Long-term durability'
      ],
      specifications: {
        material: 'Cast Iron',
        finish: 'Powder Coated',
        warranty: '9 Years',
        thickness: '3mm - 4mm'
      },
      basePrice: 1000
    },
    '7': {
      name: 'Grill Gate',
      images: [
        'https://5.imimg.com/data5/QN/NN/UP/SELLER-4178442/grill-gate-1000x1000.jpg',
        'https://2.wlimg.com/product_images/bc-full/dir_63/1877701/image-01_p_1739597_369586.jpg'
      ],
      description: 'Decorative grill-style gates with artistic designs',
      features: [
        'Artistic grill patterns',
        'Decorative aesthetic appeal',
        'Ventilation and visibility',
        'Custom design possibilities',
        'Quality craftsmanship',
        'Weather-resistant materials'
      ],
      specifications: {
        material: 'Mild Steel',
        finish: 'Powder Coated',
        warranty: '6 Years',
        thickness: '1.2mm - 2mm'
      },
      basePrice: 600
    },
    '8': {
      name: 'Compound Wall Gate',
      images: [
        'https://coohom-biz-sg-s3.coohom.com/ins/static/article/modern-gate-compound-1758932167426699900.jpg',
        'https://www.99acres.com/microsite/wp-content/blogs.dir/6161/files/2023/07/Minimalistic-Elegance-Single-Door-Iron-Main-Gate.jpg'
      ],
      description: 'Gates for compound walls with matching design',
      features: [
        'Compound wall integration',
        'Matching design elements',
        'Security and aesthetics',
        'Custom size options',
        'Professional installation',
        'Long-term durability'
      ],
      specifications: {
        material: 'MS Steel',
        finish: 'Powder Coated',
        warranty: '8 Years',
        thickness: '2mm - 3mm'
      },
      basePrice: 1200
    }
  };

  // Get gate data based on ID, fallback to default if not found
  const gateData = gateDatabase[gateId] || {
    name: 'Premium Steel Gate',
    images: [
      'https://i.etsystatic.com/20483291/r/il/00a451/4307835574/il_fullxfull.4307835574_f1eu.jpg'
    ],
    description: 'Premium steel gate solution',
    features: ['High quality materials', 'Professional craftsmanship'],
    specifications: {
      material: 'Steel',
      finish: 'Standard',
      warranty: '5 Years',
      thickness: '2mm'
    },
    basePrice: 1000
  };
  
  // Set the gate ID in the data
  gateData.id = gateId;

  const handleSizeChange = () => {
    if (width && height) {
      const area = parseFloat(width) * parseFloat(height);
      const price = area * 50 + gateData.basePrice; // $50 per sq ft + base price
      setEstimatedPrice(price);
    } else {
      setEstimatedPrice(0);
    }
  };

  const handleBuyNow = () => {
    if (!width || !height) {
      alert('Please enter both width and height measurements');
      return;
    }
    
    // In a real app, this would redirect to checkout or order page
    alert(`Added to cart: ${gateData.name}\nSize: ${width}ft x ${height}ft\nEstimated Price: $${estimatedPrice.toFixed(2)}`);
  };

  return (
    <div className="gate-details-page">
      <div className="container">
        <div className="back-button-container">
          <button onClick={() => navigate(-1)} className="back-btn">
            ← Back to Gates & Grills
          </button>
        </div>

        <div className="gate-details-content">
          <div className="gate-gallery">
            <div className="main-image-container">
              <img 
                src={gateData.images[selectedImage] || gateData.images[0]} 
                alt={gateData.name}
                className="main-image"
                onClick={() => setShowZoom(true)}
              />
              <div className="zoom-indicator">Click to zoom</div>
            </div>
            
            <div className="thumbnail-container">
              {gateData.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </div>

          <div className="gate-info">
            <h1>{gateData.name}</h1>
            <p className="gate-description">{gateData.description}</p>

            <div className="gate-features">
              <h3>Key Features</h3>
              <ul>
                {gateData.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="gate-specs">
              <h3>Specifications</h3>
              <div className="specs-grid">
                <div className="spec-item">
                  <span className="spec-label">Material:</span>
                  <span className="spec-value">{gateData.specifications.material}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Finish:</span>
                  <span className="spec-value">{gateData.specifications.finish}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Warranty:</span>
                  <span className="spec-value">{gateData.specifications.warranty}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Thickness:</span>
                  <span className="spec-value">{gateData.specifications.thickness}</span>
                </div>
              </div>
            </div>

            <div className="pricing-calculator">
              <h3>Custom Size Calculator</h3>
              <div className="size-inputs">
                <div className="input-group">
                  <label>Width (feet):</label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => {
                      setWidth(e.target.value);
                      handleSizeChange();
                    }}
                    min="3"
                    max="20"
                    placeholder="Enter width"
                  />
                </div>
                <div className="input-group">
                  <label>Height (feet):</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => {
                      setHeight(e.target.value);
                      handleSizeChange();
                    }}
                    min="6"
                    max="15"
                    placeholder="Enter height"
                  />
                </div>
              </div>
              
              {estimatedPrice > 0 && (
                <div className="price-estimate">
                  <h4>Estimated Price: ${estimatedPrice.toFixed(2)}</h4>
                  <p>Includes installation and standard warranty</p>
                </div>
              )}

              <button 
                className="btn btn-primary btn-buy" 
                onClick={handleBuyNow}
                disabled={!estimatedPrice}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {showZoom && (
        <div className="image-zoom-overlay" onClick={() => setShowZoom(false)}>
          <div className="zoom-content">
            <img 
              src={gateData.images[selectedImage] || gateData.images[0]} 
              alt="Zoomed view"
              className="zoomed-image"
            />
            <button className="close-zoom" onClick={() => setShowZoom(false)}>
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GateDetails;