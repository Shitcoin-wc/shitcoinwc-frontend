import React from 'react';
import { Link } from 'react-router-dom';
import './buttonwithicon.css';

const ButtonWithIcon = ({ SvgIcon, ImgIcon, text, linkTo, size = '', tailwindClass = '', headbandText, openInNewTab = false }) => {

  let paddingClasses = 'px-4 py-2';
  let textClasses = 'text-sm';
  let svgSizeClass = 'h-4 w-4';

  switch (size) {
    case 'xs':
      paddingClasses = 'px-4 py-2';
      textClasses = 'text-xs';
      svgSizeClass = 'h-4 w-4';
      break;
    case 'base':
      paddingClasses = 'px-4 py-3';
      textClasses = 'text-base';
      svgSizeClass = 'h-7 w-7';
      break;
    case 'lg':
      paddingClasses = 'px-8 py-4';
      textClasses = 'text-lg';
      svgSizeClass = 'h-8 w-8';
      break;
    default:
      break;
  }

  const commonClasses = `button-container inline-flex items-center justify-center shadow hover:shadow-lg whitespace-nowrap font-medium rounded-full text-button-text bg-button-bg hover:bg-button-text hover:text-button-bg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${paddingClasses} transition ease-in-out duration-500 ${tailwindClass}`;

  const buttonContent = (
    <>
      {SvgIcon && <SvgIcon className={`${svgSizeClass} mr-3`} />}
      {ImgIcon && <img src={ImgIcon} alt="icon" className={`${svgSizeClass} mr-3`} />}
      <span className={textClasses}>{text}</span>
    </>
  );

  const renderButton = (Component, props = {}) => (
    <div className={commonClasses}>
      {headbandText && <div className="button-headband">{headbandText}</div>}
      <Component className="relative inline-flex items-center z-1" {...props}>
        {buttonContent}
      </Component>
    </div>
  );

  if (linkTo) {
    return linkTo.startsWith('/')
      ? renderButton(Link, { to: linkTo })
      : renderButton('a', { href: linkTo, target: openInNewTab ? "_blank" : "_self", rel: openInNewTab ? "noopener noreferrer" : undefined });
  }

  return renderButton('button');
};

export default ButtonWithIcon;
