import React, { useState } from "react";
import './ProductCard.css'
import axios from "axios";

const ObjectDetection = ({ onSearchClick ,onDisplayText }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/detect/", // Your API endpoint
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      let mergedString = '';

    if (response.data[0] && response.data[1]) {
    mergedString = `${response.data[0]} ${response.data[1]}`;
    } else if (response.data[0]) {
    mergedString = response.data[0];
    } else if (response.data[1]) {
    mergedString = response.data[1];
    }
      onDisplayText(mergedString); // Assuming the response contains the detection results
      onSearchClick(mergedString);
      setError(null); // Clear any previous errors
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred while uploading."); // Clear previous results
    }
  };

  return (
    <div className="search-bar">
      <input type="file" onChange={handleFileChange} />
      <button className="btn" onClick={handleUpload}>Detect</button>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default ObjectDetection;
