import React, { useState } from "react";
import "./SidePanel.css"; // Import the CSS for the side panel

const SidePanel = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the panel open/close
  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Toggle button to open/close the panel */}
      <button className="toggle-btn" onClick={togglePanel}>
        {isOpen ? "Close Panel" : "Open Panel"}
      </button>

      {/* The side panel */}
      <div className={`side-panel ${isOpen ? "open" : ""}`}>
        <div className="panel-content">
          <h2>ChatGPT Panel</h2>
          <p>This is a side panel like ChatGPT's that can slide in and out.</p>
          {/* Add your custom content here */}
        </div>
      </div>
    </div>
  );
};

export default SidePanel;
