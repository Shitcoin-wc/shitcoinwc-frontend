// Popup.js

import React, { useEffect } from 'react';
import './popup.css';
import PopupMenuContent from '../../../pages/sections/PopupMenuContent';

function Popup({ onClose, children, isOpen }) {
  const handleContentClick = (e) => e.stopPropagation();
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    // Nettoyage de l'effet
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (

    <div className={`popup-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className={`relative flex flex-col popup-content ${isOpen ? 'open' : ''} pr-4 pt-4 mx-4 md:mx-0`} onClick={handleContentClick}>
        <div className="absolute top-0 right-0 pt-0 pr-3">
          <button onClick={onClose} className="text-2xl font-bold">&times;</button>
        </div>
        <PopupMenuContent />
      </div>
    </div>

  );
}

export default Popup;
