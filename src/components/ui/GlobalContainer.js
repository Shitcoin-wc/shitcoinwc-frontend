// GlobalContainer.js

const GlobalContainer = ({ children }) => {
  return (

    // Utilise md:max-w-maxWidth1200 pour appliquer cette largeur maximale seulement � partir du breakpoint md et au-del�.
    <div className="flex flex-col max-w-full md:max-w-maxWidth1200 mx-auto px-4 ">
      {children}
    </div>
    
  );
};

export default GlobalContainer;