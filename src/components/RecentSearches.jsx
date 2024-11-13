import React from 'react';
import './RecentSearches.css';

const RecentSearches = ({ searches, onSearchClick ,onDisplayText }) => {
  return (
    <div className="recent-searches">
      <h2>Recent Searches</h2>
      <div className="recent-searches-grid">
        {searches.map((search, index) => (
          <div
            key={index}
            className="recent-search-box"
            onClick={() => {onSearchClick(search);onDisplayText(search)}}
          >
            {search}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentSearches;
