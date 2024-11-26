import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import ProductGrid from './components/ProductGrid';
import RecentSearches from './components/RecentSearches';
import ObjectDetection from './components/ObjectDetect';
import './App.css';

const Home = () => {
  const [amazonProducts, setAmazonProducts] = useState([]);
  const [flipkartProducts, setFlipkartProducts] = useState([]);
  const [hasSearched, setHasSearched] = useState(false); // Track if search has been triggered
  const [displayText, setDisplayText] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const [animationStep, setAnimationStep] = useState(0); // To track where in the animation process we are
  const [loading, setLoading] = useState(false); // Add loading state
  const [showObjectDetection, setShowObjectDetection] = useState(false); // Track whether to show ObjectDetection

  //HANDLE SEARCH
  const handleSearch = async (query) => {
    setHasSearched(true); // Update state to indicate search is initiated
    setLoading(true); // Set loading to true when search is initiated
    setDisplayText(query);
    setRecentSearches(prevSearches => {
      const updatedSearches = [query, ...prevSearches.filter(item => item !== query)].slice(0, 5);
      return updatedSearches;
    });

    try {
      const amazonResponse = await axios.get(`https://d66e-112-196-126-3.ngrok-free.app/api/amazon/?item=${query}`);
      const flipkartResponse = await axios.get(`https://d66e-112-196-126-3.ngrok-free.app/api/flipkart/?item=${query}`);
      setAmazonProducts(amazonResponse.data);
      setFlipkartProducts(flipkartResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Set loading to false when the request is complete
    }
  };

  // Animation TEXT
  useEffect(() => {
    const typeText = 'Hi...';
    const searchText = 'Search the product';
    let currentText = '';
    let index = 0;
    let timeoutId;

    const animateText = () => {
      if (animationStep === 0) {
        // Typing "PRICEFY"
        if (index < typeText.length) {
          timeoutId = setTimeout(() => {
            currentText += typeText[index];
            setDisplayText(currentText);
            index += 1;
            animateText(); // Continue typing
          }, 150);
        } else {
          setAnimationStep(2); // Move to next step (backspace)
          typeText.length; // Reset index for backspacing
        }
      } 
      else if (animationStep === 2) {
        // Typing "Search the product"
        if (index < searchText.length) {
          timeoutId = setTimeout(() => {
            currentText += searchText[index];
            setDisplayText(currentText);
            index += 1;
            animateText(); // Continue typing "Search the product"
          }, 150);
        } else {
          setTimeout(() => {
            // setAnimationStep(0); // Reset to start the animation over
          }, 600);
        }
      }
    };

    animateText();

    return () => {
      clearTimeout(timeoutId); // Clear timeout on cleanup
    };
  }, [animationStep]);

  return (
    <div className={`app ${hasSearched ? 'searched' : ''}`}>
      <h1 className='dtext'>{displayText}</h1>
      <SearchBar onSearch={handleSearch} />
      
      {/* Button to toggle Object Detection */}
      <button className="btn"onClick={() => setShowObjectDetection(!showObjectDetection)}>
        {showObjectDetection ? 'Hide ' : 'AI Detection'}
      </button>

      {/* Conditionally render Object Detection component */}
      {showObjectDetection && <ObjectDetection onSearchClick={handleSearch} onDisplayText={setDisplayText} />}
      
      {/* Show loading animation if data is loading */}
      {loading && (
        <div className="loader-wrapper">
          <div className="loader">
            <span className="loader-text">loading</span>
            <span className="load"></span>
          </div>
        </div>
      )}
      
      {!loading && (
        <RecentSearches searches={recentSearches} onSearchClick={handleSearch} onDisplayText={setDisplayText} />
      )}
      
      {!loading && (
        <div className="product-section">
          <ProductGrid products={amazonProducts} title="From Amazon" />
          <ProductGrid products={flipkartProducts} title="From Flipkart" />
        </div>
      )}
    </div>
  );
};

export default Home;
