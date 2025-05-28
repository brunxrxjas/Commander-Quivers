// src/components/dashboard/CollectionSection.js
import React from 'react';
import AddCardToCollectionForm from './AddCardToCollection';
import CollectionList from './CollectionList';

// Accepts collection data and handlers from DashboardPage
function CollectionSection({ collectionData = [], onAddCard, onDeleteCard }) {
  return (
    <div id="collectionSection" style={{ display: 'block' }}> {/* Manage visibility via parent */}
      <h3>Collection</h3>
      <AddCardToCollectionForm onAddCard={onAddCard} />
      <CollectionList collectionItems={collectionData} onDeleteCard={onDeleteCard} />
    </div>
  );
}

export default CollectionSection;