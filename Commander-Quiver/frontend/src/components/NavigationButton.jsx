import React from 'react';
import { Link } from 'react-router-dom';

function NavigationButton({ to, children, className = 'back-button', onClick }) {
  if (to) {
    return (
      <Link to={to}>
        <button className={className}>
          {children}
        </button>
      </Link>
    );
  }

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}

export default NavigationButton;