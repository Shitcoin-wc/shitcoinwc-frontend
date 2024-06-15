import React from 'react';
// import './footer.css'; // Importe le fichier CSS

function Footer() {
  return (
    <footer className="w-full bg-header-bg  px-0 py-4 text-center text-button-bg ">
      <p className="text-sm ">Copyright © {new Date().getFullYear()} - Skyrocketing to the Moon, Fueled by Degen Life and Handcrafted with Diamond Hands.</p>
    </footer>
  );
}

export default Footer;