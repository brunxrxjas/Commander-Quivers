import React, { useState, useEffect } from 'react';

function Alert({ message, type = 'info', duration = 3000 }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);

      const timer = setTimeout(() => {
        setIsVisible(false);
      }, duration);

      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [message, duration]); 

  if (!isVisible) {
    return null; 
  }


  const alertClasses = `show ${type}`;

  return (

    <div id="custom-alert" className={alertClasses}>
      {message}
    </div>
  );
}

export default Alert;