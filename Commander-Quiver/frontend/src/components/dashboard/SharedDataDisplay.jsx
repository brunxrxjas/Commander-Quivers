// src/components/dashboard/SharedDataDisplay.js
import React from 'react';

// Displays shared data (needs backend integration for real data)
function SharedDataDisplay({ friendUsername, sharedData = {}, onClose }) {
     if (!friendUsername) return null; // Don't render if no friend selected

     // Placeholder data structure - replace with actual data format
     const { decks = [], collection = [], wishlist = [] } = sharedData;

    return (
        <div id="sharedDataSection">
            <h4>Shared Data from {friendUsername}</h4>
            <div id="sharedDecks">
                <h5>Decks</h5>
                {decks.length > 0 ? (
                    <ul>{decks.map((deck, i) => <li key={i}>{deck.name}</li>)}</ul>
                 ) : <p>No shared decks.</p>}
            </div>
            <div id="sharedCollection">
                 <h5>Collection</h5>
                 {collection.length > 0 ? (
                     <ul>{collection.map((card, i) => <li key={i}>{card.name || card}</li>)}</ul>
                 ) : <p>No shared collection.</p>}
            </div>
            <div id="sharedWishlist">
                 <h5>Wishlist</h5>
                 {wishlist.length > 0 ? (
                     <ul>{wishlist.map((card, i) => <li key={i}>{card.name || card}</li>)}</ul>
                 ) : <p>No shared wishlist.</p>}
            </div>
            <button onClick={onClose}>Close</button>
        </div>
    );
}
export default SharedDataDisplay;