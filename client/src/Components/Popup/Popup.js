import React from 'react';
import './Popup.css';
import { useNavigate } from 'react-router-dom'



const Popup = ({ message, setShowPopup, heading, showPopupAndNavigate, path }) => {
  let navigate = useNavigate()
  const closePopup = () => {
    setShowPopup(false);
    if (showPopupAndNavigate) {
      navigate(path)
    }
  };


  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <div className="popup-header">
          <h2>{heading}</h2>
          <button className="close-button" onClick={closePopup}>
            &times;
          </button>
        </div>
        <div className="popup-content">
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Popup;