import React, { useEffect, useState } from 'react';

function InclinedSeparator({ angle, topColorVar, bottomColorVar }) {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [svgHeight, setSvgHeight] = useState(
    Math.round(window.innerWidth * Math.tan(Math.abs(angle) * (Math.PI / 180)))
  );

  useEffect(() => {
    // Define a function that will calculate the SVG height
    const calculateSvgHeight = (width) =>
      Math.round(width * Math.tan(Math.abs(angle) * (Math.PI / 180)));

    // This function handles the resize event
    const handleResize = () => {
      const width = Math.round(document.documentElement.clientWidth);
      setViewportWidth(width);
      setSvgHeight(calculateSvgHeight(width));
    };

    // Call the resize handler once to set the initial width and height
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [angle]); // Dependency array only needs angle since that's all calculateSvgHeight depends on

  // Calculate the points for polygons based on the angle
  const pointsTop = angle > 0 
    ? `0,0 ${viewportWidth},${svgHeight} ${viewportWidth},0`
    : `0,${svgHeight} ${viewportWidth},0 0,0`;

  const pointsBottom = angle > 0 
    ? `0,${svgHeight} ${viewportWidth},${svgHeight} 0,0`
    : `${viewportWidth},0 ${viewportWidth},${svgHeight} 0,${svgHeight}`;

  return (
    <svg
      width="100%"
      height={`${svgHeight}px`}
      viewBox={`0 0 ${viewportWidth} ${svgHeight}`}
      preserveAspectRatio="none"
      style={{ display: 'block', overflow: 'hidden', position: 'absolute' }}
    >
      <polygon points={pointsTop} style={{ fill: `var(${topColorVar})` }} />
      <polygon points={pointsBottom} style={{ fill: `var(${bottomColorVar})` }} />
    </svg>
  );
}

export default InclinedSeparator;
