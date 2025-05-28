// src/components/dashboard/WishlistSection.js
import React from 'react';
import AddCardToWishlistForm from './AddCardToWishlistForm';
import WishlistList from './WishlistList';

// Accepts wishlist data and handlers from DashboardPage
function WishlistSection({ wishlistData = [], onAddCard, onMoveToCollection, onDeleteCard }) {
  return (
    <div id="wishlistSection" style={{ display: 'block' }}> {/* Manage visibility via parent */}
      <h3>Wishlist</h3>
      <AddCardToWishlistForm onAddCard={onAddCard} />
      <WishlistList
        wishlistItems={wishlistData}
        onMoveToCollection={onMoveToCollection}
        onDeleteCard={onDeleteCard}
      />
    </div>
  );
}

export default WishlistSection;