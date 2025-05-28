// src/components/dashboard/AddCardToCollectionForm.js
import React, { useState } from 'react';

function AddCardToCollectionForm({ onAddCard }) {
  const [cardName, setCardName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cardName.trim()) return;
    onAddCard(cardName);
    setCardName('');
  };

  return (
    <div id="addCardToCollectionForm">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="collectionCardName"
          placeholder="Card Name"
          required
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
        />
        <button type="submit">Add Card</button>
      </form>
    </div>
   );
}
export default AddCardToCollectionForm;