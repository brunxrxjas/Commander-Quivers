// src/components/dashboard/DeckDetails.js
import React from 'react';

// Displays the contents of a selected deck
function DeckDetails({ deck, onDeleteCardFromDeck, onClose }) {
  if (!deck) return null;

  // Categories for the main list, excluding commander
  const mainCategories = ["creatures", "spells", "lands", "artifacts", "planeswalkers"];

  const handleRemoveCommander = () => {

    if (deck.commander) {
        onDeleteCardFromDeck(deck.id || deck.name, 'commander', deck.commander.id || deck.commander.name);
    }
  };

  return (
    <div id="deckDetails">
      <h3>{deck.name} Details</h3>

      {/* --- Commander Section --- */}
      <h4>Commander</h4>
      {deck.commander && deck.commander.name ? (
        <div className="commander-section" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', paddingBottom: '10px', borderBottom: '1px solid #ccc' }}>
          {deck.commander.imageUrl && (
            <img src={deck.commander.imageUrl} alt={deck.commander.name} className="card-thumbnail" style={{ width: '80px', marginRight: '10px' }} />
          )}
          <div style={{ flexGrow: 1 }}>
            <span className="card-name" style={{ fontWeight: 'bold', fontSize: '1.1em' }}>{deck.commander.name}</span>
          </div>
          <button onClick={handleRemoveCommander} className="delete-btn" style={{ marginLeft: '10px' }}>
            Remove Commander
          </button>
        </div>
      ) : (
        <p className="no-cards-msg">No Commander set. Use "Add Card" to set one.</p>
      )}
      {/* --- End Commander Section --- */}


      <div id="deckDetailsContent">
        {mainCategories.map(category => (
          <div key={category}>
            <h4>{category.charAt(0).toUpperCase() + category.slice(1)}</h4>
            {deck[category] && deck[category].length > 0 ? (
              <ul className="deck-cards-list">
                {deck[category].map((cardName, index) => ( // Assuming category lists store names
                  <li key={`${category}-${index}-${cardName}`}>
                    <span className="card-name">{cardName}</span>
                    <button
                      className="delete-card-btn"
                      onClick={() => onDeleteCardFromDeck(deck.id || deck.name, category, index)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-cards-msg">No {category} in this deck</p>
            )}
          </div>
        ))}
      </div>
      <button className="close-btn" onClick={onClose}>Close</button>
    </div>
  );
}

export default DeckDetails;
