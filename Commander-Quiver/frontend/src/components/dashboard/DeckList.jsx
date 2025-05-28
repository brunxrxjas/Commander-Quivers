// src/components/dashboard/DeckList.js
import React from 'react';

// Represents a single deck in the list
function DeckItem({ deck, onShowAddCard, onViewDeck, onDeleteDeck }) {
   const deckId = deck.id || deck.name; // Use name as fallback ID if no id

  return (
    <li>
      <strong>{deck.name}</strong>
      {/* Pass deck identifier (ID or index) to handlers */}
      <button onClick={() => onShowAddCard(deckId)}>Add Card</button>
      <button onClick={() => onViewDeck(deckId)}>View</button>
      <button onClick={() => onDeleteDeck(deckId)}>Delete</button>
    </li>
  );
}

// The list container
function DeckList({ decks = [], onShowAddCard, onViewDeck, onDeleteDeck }) {
  return (
    <ul id="decks">
      {decks.length === 0 ? (
        <li>No decks yet. Add one above!</li>
      ) : (
        decks.map((deck, index) => (
          <DeckItem
            // Use a stable key, preferably a unique deck ID from data
            key={deck.id || index}
            deck={deck}
            onShowAddCard={onShowAddCard}
            onViewDeck={onViewDeck}
            onDeleteDeck={onDeleteDeck}
          />
        ))
      )}
    </ul>
  );
}

export default DeckList;