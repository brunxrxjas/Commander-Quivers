// src/components/dashboard/AddCardForm.js
import React, { useState } from 'react';

// This form appears when 'Add Card' is clicked for a specific deck
function AddCardForm({ deckName, onAddCardToDeck, onCancel }) {
  const [cardType, setCardType] = useState('commander'); // <<< Default to Commander or creatures
  const [cardName, setCardName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cardName.trim()) {
      // Consider using the showAlert prop from DashboardPage if passed down this far
      alert("Card name cannot be empty");
      return;
    }
    // Call handler passed from parent, providing card details
    // onAddCardToDeck will now receive the card name (string)
    onAddCardToDeck(cardType, cardName.trim());
    setCardName(''); // Clear input
    // Optionally close the form via onCancel or parent state change
    // onCancel();
  };

  return (
    <div id="addCardForm"> {/* Conditionally rendered by parent */}
      <h3>Add/Set Card for {deckName}</h3>
      <form onSubmit={handleSubmit}>
        <select id="cardType" value={cardType} onChange={(e) => setCardType(e.target.value)}>
          <option value="commander">Commander</option> {/* <<< ADDED OPTION */}
          <option value="creatures">Creatures</option>
          <option value="spells">Spells</option>
          <option value="lands">Lands</option>
          <option value="artifacts">Artifacts</option>
          <option value="planeswalkers">Planeswalkers</option>
        </select>
        <input
          type="text"
          id="cardName"
          placeholder="Card Name"
          required
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
        />
        <button type="submit">{cardType.toLowerCase() === 'commander' ? 'Set Commander' : 'Add Card'}</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default AddCardForm;
