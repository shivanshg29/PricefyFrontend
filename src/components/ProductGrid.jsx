// src/components/ProductGrid.js
import React from 'react';
import ProductCard from './ProductCard.jsx';
import './ProductCard.css'

const ProductGrid = ({ products, title }) => (
  <div className="product-grid">
    {products.length?(
        <h2>{title}</h2>
      ):(<p></p>)
      }
    <div className="product-grid-cards">
      {products.length ? (
        products.map((product, index) => <ProductCard key={index} product={product} />
      )
      ) : (
        null
      )}
    </div>
  </div>
);

export default ProductGrid;
