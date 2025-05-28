import React, { useState } from 'react';
import AddDeckForm from './AddDeckForm';
import DeckList from './DeckList';
import AddCardForm from './AddCardForm';
import DeckDetails from './DeckDetails';

// Main component for the Deck Tab
function DeckSection({ decksData = [], onAddDeck, onDeleteDeck, onAddCard, onDeleteCard }) {
  // State to manage which deck's "Add Card" form is shown
  const [selectedDeckIdForAdd, setSelectedDeckIdForAdd] = useState(null);
  // State to manage which deck's details are shown
  const [selectedDeckIdForView, setSelectedDeckIdForView] = useState(null);

  // Helper function to find a deck object by its ID (or name/index as fallback)
  const getDeckById = (id) => decksData.find(d => (d.id || d.name) === id);

  // Get the full deck objects based on the selected IDs
  const selectedDeckForAdd = getDeckById(selectedDeckIdForAdd);
  const selectedDeckForView = getDeckById(selectedDeckIdForView);

  // --- Handlers to Show/Hide Forms/Details ---
  const handleShowAddCard = (deckId) => {
    setSelectedDeckIdForView(null); // Close details view if open
    setSelectedDeckIdForAdd(deckId); // Set ID to show AddCardForm for this deck
  };

  const handleCancelAddCard = () => {
    setSelectedDeckIdForAdd(null); // Hide AddCardForm
  };

  const handleShowViewDeck = (deckId) => {
     setSelectedDeckIdForAdd(null); // Close AddCardForm if open
     setSelectedDeckIdForView(deckId); // Set ID to show DeckDetails for this deck
  };

  const handleCloseViewDeck = () => {
     setSelectedDeckIdForView(null); // Hide DeckDetails
  };

   // --- Handlers to Call Parent Logic ---
   // Called when AddCardForm is submitted
   const handleAddCardSubmit = (cardType, cardName) => {
       // Call the onAddCard handler passed from DashboardPage
       onAddCard(selectedDeckIdForAdd, cardType, cardName);
   };

    // Called when delete button in DeckDetails is clicked
    const handleDeleteCardSubmit = (deckId, cardType, cardIndex) => {
        // Call the onDeleteCard handler passed from DashboardPage
        onDeleteCard(deckId, cardType, cardIndex);
        // DeckDetails will automatically re-render with updated deck data from parent
    };


  return (
    // Main container div for the deck section
    <div id="deckSection" style={{ display: 'block' }}> {/* Manage visibility via parent state */}
      <h3>Decks</h3>

      {/* Form to add a new deck */}
      <AddDeckForm onAddDeck={onAddDeck} />

      {/* List of existing decks */}
      <DeckList
          decks={decksData} // Pass the deck data down
          onShowAddCard={handleShowAddCard} // Pass handlers for list item buttons
          onViewDeck={handleShowViewDeck}
          onDeleteDeck={onDeleteDeck} // Pass delete handler directly
       />

      {/* Conditionally Render AddCardForm */}
      {/* Only show if a deck has been selected for adding cards */}
      {selectedDeckForAdd && (
        <AddCardForm
          // Pass the selected deck's name to display in the form header
          deckName={selectedDeckForAdd.name}
          // Pass the submit handler
          onAddCardToDeck={handleAddCardSubmit}
          // Pass the cancel handler
          onCancel={handleCancelAddCard}
        />
      )}

      {/* Conditionally Render DeckDetails */}
      {/* Only show if a deck has been selected for viewing */}
      {selectedDeckForView && (
          <DeckDetails
              // Pass the full deck object to display
              deck={selectedDeckForView}
              // Pass the card deletion handler
              onDeleteCardFromDeck={handleDeleteCardSubmit}
              // Pass the close handler
              onClose={handleCloseViewDeck}
          />
      )}
    </div>
  );
}

export default DeckSection;