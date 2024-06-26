// UserLarge.js

import React from 'react';

const UserLarge= ({ className }) => (

<svg className={className} fill="currentColor"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <path d="M256 288A144 144 0 1 0 256 0a144 144 0 1 0 0 288zm-94.7 32C72.2 320 0 392.2 0 481.3c0 17 13.8 30.7 30.7 30.7H481.3c17 0 30.7-13.8 30.7-30.7C512 392.2 439.8 320 350.7 320H161.3z"/>
</svg>

);

UserLarge.defaultProps = {
  className: "UserLargeSvg", // This is the default class name
};

export default UserLarge;