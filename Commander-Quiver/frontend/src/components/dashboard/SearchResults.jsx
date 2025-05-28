// src/components/dashboard/SearchResults.js
import React from 'react';

// Formats mana cost (simple version, enhance as needed)
function formatManaCost(manaCost) {
  if (!manaCost) return "";
   // Basic replacements - consider using a library or regex for complex costs
  return manaCost
    .replace(/{W}/g, "⚪")
    .replace(/{U}/g, "🔵")
    .replace(/{B}/g, "⚫")
    .replace(/{R}/g, "🔴")
    .replace(/{G}/g, "🟢")
    .replace(/{C}/g, "◯")
    .replace(/\{(\d+)\}/g, '$1') // Numbers
    .replace(/{X}/g, 'X');
}

// Displays a single card result
function CardResult({ card, onAddToDeck, onAddToCollection, onAddToWishlist }) {
    const imageUrl = card.image_uris?.small || card.card_faces?.[0]?.image_uris?.small || ''; // Handle flip cards

    return (
        <div className="card-result">
             {imageUrl && <img src={imageUrl} alt={card.name} />}
            <h4>{card.name}</h4>
            <p>{formatManaCost(card.mana_cost)}</p>
            <p>{card.type_line}</p>
            <div className="search-actions">
                 {/* Pass the full card object to handlers */}
                <button onClick={() => onAddToDeck(card)}>Add to Deck</button>
                <button onClick={() => onAddToCollection(card)}>Add to Collection</button>
                <button onClick={() => onAddToWishlist(card)}>Add to Wishlist</button>
            </div>
        </div>
    );
}


// Container for search results
function SearchResults({ results = [], onAddToDeck, onAddToCollection, onAddToWishlist, isLoading }) {

    if (isLoading) {
        return <div id="searchResults">Loading...</div>;
    }

    if (results.length === 0) {
         return <div id="searchResults">No results found.</div>;
    }

    return (
        <div id="searchResults">
            {results.map(card => (
                <CardResult
                    key={card.id} // Scryfall provides unique IDs
                    card={card}
                    onAddToDeck={onAddToDeck}
                    onAddToCollection={onAddToCollection}
                    onAddToWishlist={onAddToWishlist}
                 />
            ))}
        </div>
    );
}
export default SearchResults;