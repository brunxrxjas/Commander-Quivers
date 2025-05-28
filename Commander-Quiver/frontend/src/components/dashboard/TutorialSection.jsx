// src/components/dashboard/TutorialSection.js
import React from 'react';

// --- IMPORT THE VIDEO FILE ---
import tutorialVideo from '../../assets/video/Project Movie 1.mp4'; 


const videoSrc = tutorialVideo;

function TutorialSection({ onHide }) {

  return (
    <div id="tutorialSection">
      <h3>Getting Started Tutorial</h3>
      <p>Watch this quick tutorial to learn how to use Commander's Quiver:</p>
      <div className="tutorial-video">
        <video
            controls
            loop
            muted
            aria-label="Commander's Quiver tutorial"
            style={{ maxWidth: '100%', height: 'auto' }}
        >
          {/* --- USE THE IMPORTED VARIABLE HERE --- */}
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <button onClick={onHide} className="tutorial-button">
        Hide Tutorial
      </button>
    </div>
  );
}

export default TutorialSection;