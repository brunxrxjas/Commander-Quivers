// src/components/dashboard/Tabs.js
import React from 'react';

function Tabs({ activeTab, onTabChange, tabNames = ['Decks', 'Collection', 'Wishlist'] }) {
  

  return (
    <div className="tabs">
      {tabNames.map(tabName => (
        <button
          key={tabName}
          id={`${tabName.toLowerCase()}Tab`}
          onClick={() => onTabChange(tabName)}
          className={activeTab === tabName ? 'active-tab' : ''}
        >
          {tabName}
        </button>
      ))}
    </div>
  );
}

export default Tabs;
