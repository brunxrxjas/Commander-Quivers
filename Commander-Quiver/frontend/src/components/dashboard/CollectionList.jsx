import React from 'react';

function CollectionList({ collectionItems = [], onDeleteCard }) {
  return (
    <ul id="collectionItems">
      {collectionItems.length === 0 ? (
        <li>Your collection is empty.</li>
      ) : (
        collectionItems.map((card, index) => (
          // Use unique card.id if available from data source (like Scryfall)
          <li key={card.id || index} className="collection-item">
            {card.imageUrl ? (
                <img src={card.imageUrl} alt={card.name} className="card-thumbnail" />
            ) : (
                <div className="card-thumbnail-placeholder">No Image</div>
            )}
            <span className="card-name">{card.name}</span>
            {/* Ensure onDeleteCard receives a unique identifier (preferably id) */}
            <button className="delete-btn" onClick={() => onDeleteCard(card.id || index)}>
              Delete
            </button>
          </li>
        ))
      )}
    </ul>
  );
}
export default CollectionList;