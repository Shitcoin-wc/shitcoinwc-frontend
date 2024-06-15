// BackToTopButton.js

import React, { useState, useEffect } from 'react';

const BackToTopButton = () => {
  // État pour suivre si le bouton doit être affiché
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Fonction pour vérifier le défilement de la page
    const checkScroll = () => {
      if (window.scrollY > 80) {  // Remplacement de pageYOffset par scrollY
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    // Écouter l'événement de défilement
    window.addEventListener('scroll', checkScroll);
    
    // Nettoyage de l'écouteur d'événements
    return () => {
      window.removeEventListener('scroll', checkScroll);
    };
  }, []);

  // Fonction pour ramener l'utilisateur en haut de la page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // pour un effet de défilement doux
    });
  };

  return (
      <button
        onClick={scrollToTop}
        className={`fixed bottom-5 right-5 p-3 bg-misty-lavender rounded-full text-sm hover:bg-frosty-lavender transition-opacity duration-300 ease-in-out ${showButton ? 'opacity-100' : 'opacity-0'}`}
        aria-label="Retour en haut"
        style={{ transition: 'opacity 500ms ease-in-out' }}
      >
        <span className="flex justify-center items-center h-6 w-6 rounded-full cursor-pointer">
          ↑
        </span>
      </button>
  );
};

export default BackToTopButton;
