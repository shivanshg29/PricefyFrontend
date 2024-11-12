// src/components/SearchBar.js
import React, { useState } from 'react';
import './ProductCard.css'

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query) onSearch(query);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
        placeholder="Search for a product..."
      />
      <button className="btn"onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
