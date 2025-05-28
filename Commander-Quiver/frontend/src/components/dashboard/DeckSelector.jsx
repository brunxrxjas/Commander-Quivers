import React from 'react';

// Receives props:
// - decks: Array of deck objects (should have unique id and name)
// - selectedValue: The current value (deck ID) from the parent's state
// - onChange: The handler function from the parent to call when selection changes
function DeckSelector({ decks = [], selectedValue, onChange }) {
    return (
         <select
            id="deckSelection"
            value={selectedValue} // Bind select's value to the state from parent
            onChange={onChange}   // Call the handler from parent on change
         >
            {/* Default, non-selectable option */}
            <option value="">Select a deck to add to</option>
            {/* Map over the decks array */}
            {decks.map((deck) => (
                <option key={deck.id} value={deck.id}>
                    {deck.name}
                </option>
            ))}
        </select>
    );
}

export default DeckSelector;