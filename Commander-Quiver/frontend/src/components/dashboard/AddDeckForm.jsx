import React, { useState } from 'react';

// Form specifically for adding a new deck
function AddDeckForm({ onAddDeck }) { // Expects onAddDeck handler from parent
  const [deckName, setDeckName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!deckName.trim()) {
      alert("Deck name cannot be empty"); // Replace with better feedback (e.g., Alert component)
      return;
    }
    // Call the handler passed from parent (DashboardPage via DeckSection)
    onAddDeck(deckName);
    setDeckName(''); // Clear input after submission
  };

  return (
    <div id="addDeckForm"> {/* Matches ID from dashboard.html */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="deckName" // Matches ID from dashboard.html
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