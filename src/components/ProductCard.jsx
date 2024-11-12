// src/components/ProductCard.js
import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card" onClick={() => window.open(product.link, '_blank')}>
      <img src={product.img} alt={product.title} />
      <div className="product-info">
        <h3>{product.title}</h3>
        <p className="price">Price: {product.price}</p>  {/* Apply the 'price' class here */}
      </div>
    </div>
  );
};

export default ProductCard;
