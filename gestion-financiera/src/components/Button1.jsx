import React from 'react';

const Button1 = ({ type, onClick, children }) => (
  <button type={type} onClick={onClick}>
    {children}
  </button>
);

export default Button1;
