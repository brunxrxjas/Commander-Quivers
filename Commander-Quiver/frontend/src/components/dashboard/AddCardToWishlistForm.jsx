// src/components/dashboard/AddCardToWishlistForm.js
import React, { useState } from 'react';

function AddCardToWishlistForm({ onAddCard }) {
    const [cardName, setCardName] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!cardName.trim()) return;
        onAddCard(cardName);
        setCardName('');
    };
  return (
    <div id="addCardToWishlistForm">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="wishlistCardName"
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
export default AddCardToWishlistForm;