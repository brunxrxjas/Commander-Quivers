import React from 'react';

function WishlistList({ wishlistItems = [], onMoveToCollection, onDeleteCard }) {
 return (
    <ul id="wishlistItems">
      {wishlistItems.length === 0 ? (
        <li>Your wishlist is empty.</li>
      ) : (
        wishlistItems.map((card, index) => (

          <li key={card.id || index} className="wishlist-item">

            {card.imageUrl ? (
                <img src={card.imageUrl} alt={card.name} className="card-thumbnail" />
            ) : (
            
                <div className="card-thumbnail-placeholder">No Image</div>
            )}
            <span className="card-name">{card.name}</span>
            <div className="wishlist-actions">
              <button
                className="move-to-collection-btn"
                onClick={() => onMoveToCollection(card.id || index)}
              >
                Move to Collection
              </button>
              <button
                className="delete-btn"
                onClick={() => onDeleteCard(card.id || index)}
              >
                Delete
              </button>
            </div>
          </li>
        ))
      )}
    </ul>
  );
}
export default WishlistList;