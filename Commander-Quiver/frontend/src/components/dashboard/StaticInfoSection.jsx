// src/components/dashboard/StaticInfoSection.js
import React from 'react';

function StaticInfoSection() {
  return (
    <>
      <div id="commanderRules"> 
        <h3>Commander Rules</h3>
        <p>Need a refresher on the rules? Check out the official Commander rules:</p>

        <a
          href="https://mtgcommander.net/index.php/rules/"
          target="_blank"
          rel="noopener noreferrer" 
        >
          Official Commander Rules
        </a>
      </div>

      {/* Magic The Gathering Event Finder Link */}
      <p>
        Looking for more events? Check out the{' '}
        <a
          href="https://locator.wizards.com/?utm_source=magicweb&utm_medium=referral"
          target="_blank"
          rel="noopener noreferrer"
        >
          official MTG events page
        </a>.
      </p>
    </>
  );
}

export default StaticInfoSection;