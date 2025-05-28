// src/components/dashboard/AddDeckForm.js
import React, { useState } from 'react';

function AddDeckForm({ onAddDeck }) { // Expects a handler function from parent
  const [deckName, setDeckName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!deckName.trim()) {
      // Add user feedback (e.g., using the Alert system)
      console.error("Deck name cannot be empty");
      return;
    }
    // Call the handler passed from DashboardPage/DeckSection
    onAddDeck(deckName);
    setDeckName(''); 
  };

  return (
    <div id="addDeckForm"> 
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="deckName"
          placeholder="Deck Name"
          required
          value={deckName}
          onChange={(e) => setDeckName(e.target.value)}
        />
        <button type="submit">Add Deck</button>
      </form>
    </div>
  );
}

export default AddDeckForm;