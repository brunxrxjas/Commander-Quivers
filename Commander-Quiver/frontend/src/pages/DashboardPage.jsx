import React, { useState, useEffect } from 'react';
import axios from 'axios'; 

// Import sections
import Tabs from '../components/dashboard/Tabs';
import DeckSection from '../components/dashboard/DeckSection';
import CollectionSection from '../components/dashboard/CollectionSection';
import WishlistSection from '../components/dashboard/WishlistSection';
import CardSearchSection from '../components/dashboard/CardSearchSection';
import StaticInfoSection from '../components/dashboard/StaticInfoSection';
import FriendsSection from '../components/dashboard/FriendsSection';
import TutorialSection from '../components/dashboard/TutorialSection';

// Import reusable components
import Alert from '../components/Alert';
import NavigationButton from '../components/NavigationButton';

function DashboardPage() {
  // --- State Variables ---
  const [activeTab, setActiveTab] = useState('Decks');
  const [alertInfo, setAlertInfo] = useState({ message: '', type: '' });
  const [showTutorial, setShowTutorial] = useState(true);
  const [decks, setDecks] = useState([]);
  const [collection, setCollection] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // --- Alert Function ---
  const showAlert = (message, type = 'info', duration = 3000) => {
    setAlertInfo({ message, type });
    setTimeout(() => setAlertInfo(currentAlert =>
        (currentAlert.message === message && currentAlert.type === type)
            ? { message: '', type: '' }
            : currentAlert
    ), duration);
  };

  // --- Load Initial Data / Auth Check on Mount ---
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.warn("User not logged in, should redirect.");
      showAlert('Please log in to access the dashboard.', 'error', 5000);
      return;
    }
    const hideTutorialPref = localStorage.getItem("hideTutorial") === "true";
    setShowTutorial(!hideTutorialPref);
    console.log("Dashboard loaded for user:", userId);
    
  }, []);

  // --- Deck Management Handlers ---
  const handleAddDeck = (deckName) => {
    if (!deckName.trim()) { showAlert("Deck name cannot be empty.", "error"); return; }
    if (decks.some((deck) => deck.name.toLowerCase() === deckName.toLowerCase())) { showAlert("A deck with this name already exists.", "error"); return; }
    const newDeck = {
      id: Date.now(),
      name: deckName,
      commander: null, // <<< Initialize commander slot
      creatures: [],
      spells: [],
      lands: [],
      artifacts: [],
      planeswalkers: [],
    };
    setDecks(prevDecks => [...prevDecks, newDeck]);
    showAlert(`Deck "${deckName}" created successfully!`, "success");
  };

  const handleDeleteDeck = (deckId) => {
    const deckToDelete = decks.find(d => d.id === deckId);
    if (deckToDelete) { setDecks(prevDecks => prevDecks.filter(deck => deck.id !== deckId)); showAlert(`Deck "${deckToDelete.name}" deleted.`, "success"); }
    else { showAlert(`Could not find deck to delete.`, "error"); }
  };

  // Updated to handle "Commander" card type
  const handleAddCardToDeck = async (deckId, cardType, cardOrName) => {
    if (!cardOrName || !cardType || !deckId) {
      showAlert("Missing information to add card to deck.", "error");
      return;
    }

    let cardDataForDeck = { name: null, id: null, imageUrl: null };
    let isCommanderType = cardType.toLowerCase() === 'commander';

    try {
      // Determine card data (name, id, imageUrl)
      if (typeof cardOrName === 'object' && cardOrName !== null && cardOrName.name) {
        // Full card object (likely from search)
        cardDataForDeck.name = cardOrName.name;
        cardDataForDeck.id = cardOrName.id || Date.now();
        cardDataForDeck.imageUrl = cardOrName.image_uris?.small || cardOrName.card_faces?.[0]?.image_uris?.small || null;
      } else if (typeof cardOrName === 'string' && cardOrName.trim() !== '') {
        // Name string (manual add) - fetch details from Scryfall
        const cardNameStr = cardOrName.trim();
        cardDataForDeck.name = cardNameStr;
        cardDataForDeck.id = Date.now(); // Temp ID, Scryfall ID will override

        showAlert(`Searching Scryfall for "${cardNameStr}"...`, 'info', 1500);
        const response = await axios.get(`https://api.scryfall.com/cards/named?exact=${encodeURIComponent(cardNameStr)}`);
        if (response.data) {
          cardDataForDeck.imageUrl = response.data.image_uris?.small || response.data.card_faces?.[0]?.image_uris?.small || null;
          cardDataForDeck.id = response.data.id; // Use real Scryfall ID
        } else {
           showAlert(`Could not find details for "${cardNameStr}". Added with name only.`, 'warning');
        }
      } else {
        showAlert("Invalid card data provided for deck.", "error");
        return;
      }

      if (!cardDataForDeck.name) {
        showAlert("Cannot add card without a name to deck.", "error");
        return;
      }

      // Update the decks state
      let deckFoundAndUpdated = false;
      const targetDeck = decks.find(d => d.id === deckId); // Find name for alert
      let currentDeckName = targetDeck ? targetDeck.name : 'deck';

      setDecks(prevDecks =>
        prevDecks.map(deck => {
          if (deck.id === deckId) {
            deckFoundAndUpdated = true;
            if (isCommanderType) {
              // Set or replace the commander
              return { ...deck, commander: cardDataForDeck };
            } else {
              // Add to regular category
              const currentCategory = Array.isArray(deck[cardType]) ? deck[cardType] : [];
              const updatedCategory = [...currentCategory, cardDataForDeck.name]; // Store only name in category lists for now
              return { ...deck, [cardType]: updatedCategory };
            }
          }
          return deck;
        })
      );

      if (deckFoundAndUpdated) {
        const typeDisplay = isCommanderType ? "Commander" : cardType;
        showAlert(`"${cardDataForDeck.name}" added as ${typeDisplay} to "${currentDeckName}"`, "success");
      } else {
        showAlert(`Could not find deck with ID ${deckId}`, "error");
      }

    } catch (error) {
      console.error("Error adding card to deck (Scryfall lookup?):", error);
      showAlert(`Failed to add "${cardOrName.name || cardOrName}". Card not found or API error.`, "error");
      // Optionally, if it was a manual add and Scryfall failed, add with name only
      if (typeof cardOrName === 'string' && isCommanderType) {
          setDecks(prevDecks => prevDecks.map(deck => {
              if(deck.id === deckId) return {...deck, commander: {name: cardOrName.trim(), id: Date.now(), imageUrl: null}};
              return deck;
          }));
          showAlert(`Added "${cardOrName.trim()}" as Commander to "${currentDeckName}" (no image).`, 'warning');
      } else if (typeof cardOrName === 'string' && !isCommanderType) {
          // This part is tricky if Scryfall fails for a regular category card
          // For now, we'll just show the error.
      }
    }
  };

  // Updated to handle removing the commander
  const handleDeleteCardFromDeck = (deckId, cardTypeOrCommander, cardIdentifier) => {
    // cardIdentifier could be index for category lists, or specific value for commander
    let cardName = '';
    let cardFoundAndRemoved = false;

    if (cardTypeOrCommander.toLowerCase() === 'commander') {
        const targetDeck = decks.find(d => d.id === deckId);
        if (targetDeck && targetDeck.commander) {
            cardName = targetDeck.commander.name;
        }
        setDecks(prevDecks => prevDecks.map(deck => {
            if (deck.id === deckId) {
                if (deck.commander) { // Check if commander exists before trying to remove
                    cardFoundAndRemoved = true;
                    return { ...deck, commander: null }; // Set commander to null
                }
            }
            return deck;
        }));
        if (cardFoundAndRemoved) {
            showAlert(`Commander "${cardName}" removed from deck.`, "success");
        } else if (targetDeck && !targetDeck.commander) {
            showAlert('No commander set to remove.', 'info');
        } else {
            showAlert('Could not find deck to remove commander from.', 'error');
        }
    } else {
        // Regular card deletion
        const cardType = cardTypeOrCommander;
        const cardIndex = cardIdentifier; // Assuming cardIdentifier is the index here
        setDecks(prevDecks =>
            prevDecks.map(deck => {
                if (deck.id === deckId) {
                    const category = deck[cardType];
                    if (Array.isArray(category) && category.length > cardIndex && cardIndex >= 0) {
                         cardName = category[cardIndex]; // Assuming category stores names
                         cardFoundAndRemoved = true;
                         const updatedCategory = [ ...category.slice(0, cardIndex), ...category.slice(cardIndex + 1) ];
                         return { ...deck, [cardType]: updatedCategory };
                    }
                }
                return deck;
            })
        );
        if (cardFoundAndRemoved && cardName) {
             showAlert(`"${cardName}" removed from ${cardType}.`, "success");
        } else {
             showAlert(`Could not remove card from deck ${deckId}.`, "error");
        }
    }
  };


  // --- Collection Management Handlers (with Scryfall lookup for manual adds) ---
  const handleAddCardToCollection = async (cardOrName) => { 
    let newCardData = { name: null, id: null, imageUrl: null };
    try {
      if (typeof cardOrName === 'object' && cardOrName !== null && cardOrName.name) {
          newCardData.name = cardOrName.name;
          newCardData.id = cardOrName.id || Date.now();
          newCardData.imageUrl = cardOrName.imageUrl || cardOrName.image_uris?.small || cardOrName.card_faces?.[0]?.image_uris?.small || null;
      } else if (typeof cardOrName === 'string' && cardOrName.trim() !== '') {
          const cardName = cardOrName.trim();
          newCardData.name = cardName; newCardData.id = Date.now();
          showAlert(`Searching Scryfall for "${cardName}"...`, 'info', 1500);
          const response = await axios.get(`https://api.scryfall.com/cards/named?exact=${encodeURIComponent(cardName)}`);
          if (response.data) {
              newCardData.imageUrl = response.data.image_uris?.small || response.data.card_faces?.[0]?.image_uris?.small || null;
              newCardData.id = response.data.id;
          }
      } else { showAlert("Invalid card data provided.", "error"); return; }
      if (!newCardData.name) { showAlert("Cannot add card without a name.", "error"); return; }
      if (collection.some(c => (c.id && newCardData.id && c.id === newCardData.id) || c.name === newCardData.name)) { showAlert(`${newCardData.name} is already in your collection.`, 'warning'); return; }
      setCollection(prev => [...prev, newCardData]);
      showAlert(`${newCardData.name} added to collection${newCardData.imageUrl ? ' with image' : ''}`, 'success');
    } catch (error) {
        console.error("Error adding card to collection:", error);
        if (typeof cardOrName === 'string' && newCardData.name) {
            showAlert(`Could not find image for "${newCardData.name}". Added without image.`, 'warning');
            if (!collection.some(c => c.name === newCardData.name)) { setCollection(prev => [...prev, { name: newCardData.name, id: newCardData.id, imageUrl: null }]);}
        } else if (typeof cardOrName === 'object' && newCardData.name) {
             showAlert(`Failed to process "${newCardData.name}". Added to collection with available data.`, 'warning');
             if (!collection.some(c => (c.id && newCardData.id && c.id === newCardData.id) || c.name === newCardData.name)) {setCollection(prev => [...prev, newCardData]);}
        } else { showAlert("Failed to add card to collection.", "error");}
    }
  };
  const handleDeleteCardFromCollection = (cardIdentifier) => { 
    let cardName = ''; let initialLength = collection.length;
    setCollection(prev => prev.filter((card, index) => {
        const match = (card.id === cardIdentifier || card.name === cardIdentifier || index === cardIdentifier);
        if (match) cardName = card.name;
        return !match;
    }));
     if (collection.length < initialLength && cardName) { showAlert(`${cardName} removed from collection`, 'success'); }
     else if (initialLength > 0) { showAlert('Card not found in collection to remove.', 'error'); }
  };

  // --- Wishlist Management Handlers (with Scryfall lookup for manual adds) ---
  const handleAddCardToWishlist = async (cardOrName) => { 
    let newCardData = { name: null, id: null, imageUrl: null };
    try {
        if (typeof cardOrName === 'object' && cardOrName !== null && cardOrName.name) {
            newCardData.name = cardOrName.name; newCardData.id = cardOrName.id || Date.now();
            newCardData.imageUrl = cardOrName.imageUrl || cardOrName.image_uris?.small || cardOrName.card_faces?.[0]?.image_uris?.small || null;
        } else if (typeof cardOrName === 'string' && cardOrName.trim() !== '') {
            const cardName = cardOrName.trim();
            newCardData.name = cardName; newCardData.id = Date.now();
            showAlert(`Searching Scryfall for "${cardName}"...`, 'info', 1500);
            const response = await axios.get(`https://api.scryfall.com/cards/named?exact=${encodeURIComponent(cardName)}`);
            if (response.data) {
                newCardData.imageUrl = response.data.image_uris?.small || response.data.card_faces?.[0]?.image_uris?.small || null;
                newCardData.id = response.data.id;
            }
        } else { showAlert("Invalid card data provided.", "error"); return; }
        if (!newCardData.name) { showAlert("Cannot add card without a name.", "error"); return; }
        if (wishlist.some(c => (c.id && newCardData.id && c.id === newCardData.id) || c.name === newCardData.name)) { showAlert(`${newCardData.name} is already on your wishlist.`, 'warning'); return; }
        setWishlist(prev => [...prev, newCardData]);
        showAlert(`${newCardData.name} added to wishlist${newCardData.imageUrl ? ' with image' : ''}`, 'success');
    } catch (error) {
        console.error("Error adding card to wishlist:", error);
        if (typeof cardOrName === 'string' && newCardData.name) {
            showAlert(`Could not find image for "${newCardData.name}". Added without image.`, 'warning');
            if (!wishlist.some(c => c.name === newCardData.name)) { setWishlist(prev => [...prev, { name: newCardData.name, id: newCardData.id, imageUrl: null }]);}
        } else { showAlert("Failed to add card to wishlist.", "error"); }
    }
  };
  const handleDeleteCardFromWishlist = (cardIdentifier) => { 
     let cardName = ''; let initialLength = wishlist.length;
     setWishlist(prev => prev.filter((card, index) => {
         const match = (card.id === cardIdentifier || card.name === cardIdentifier || index === cardIdentifier);
         if (match) cardName = card.name;
         return !match;
     }));
      if (wishlist.length < initialLength && cardName) { showAlert(`${cardName} removed from wishlist`, 'success'); }
      else if (initialLength > 0) { showAlert('Card not found on wishlist to remove.', 'error'); }
  };
  const handleMoveToCollection = (cardIdentifier) => { 
    let cardToMove = null;
    cardToMove = wishlist.find((card, index) =>
        (card.id && card.id === cardIdentifier) || (card.name === cardIdentifier) || (index === cardIdentifier && cardIdentifier !== null && typeof cardIdentifier === 'number')
    );
    if (cardToMove) {
        handleAddCardToCollection(cardToMove);
        setWishlist(prev => prev.filter((card, index) => {
            const match = (card.id && card.id === cardIdentifier) || (card.name === cardIdentifier) || (index === cardIdentifier && cardIdentifier !== null && typeof cardIdentifier === 'number');
            return !match;
        }));
    } else {
        showAlert("Could not find card on wishlist to move (identifier mismatch?).", "error");
        console.error("Failed to find card in wishlist with identifier:", cardIdentifier);
    }
  };

  // --- Tab and Tutorial Visibility ---
  const handleTabChange = (tabName) => setActiveTab(tabName);
  const handleHideTutorial = () => { setShowTutorial(false); localStorage.setItem("hideTutorial", "true"); };
  const handleShowTutorial = () => { setShowTutorial(true); localStorage.removeItem("hideTutorial"); };

  // --- Render ---
  return (
    <div className="page">
      <h2>Dashboard</h2>
      <Tabs activeTab={activeTab} onTabChange={handleTabChange} />
      <div className="tab-content">
          {activeTab === 'Decks' && (
            <DeckSection
              decksData={decks}
              onAddDeck={handleAddDeck}
              onDeleteDeck={handleDeleteDeck}
              onAddCard={handleAddCardToDeck} // This now handles commander type
              onDeleteCard={handleDeleteCardFromDeck} // This now handles commander type
            />
          )}
          {activeTab === 'Collection' && ( <CollectionSection collectionData={collection} onAddCard={handleAddCardToCollection} onDeleteCard={handleDeleteCardFromCollection} /> )}
          {activeTab === 'Wishlist' && ( <WishlistSection wishlistData={wishlist} onAddCard={handleAddCardToWishlist} onMoveToCollection={handleMoveToCollection} onDeleteCard={handleDeleteCardFromWishlist} /> )}
      </div>
      <CardSearchSection userDecks={decks} onAddCardToDeck={handleAddCardToDeck} onAddCardToCollection={handleAddCardToCollection} onAddCardToWishlist={handleAddCardToWishlist} showAlert={showAlert} />
      <StaticInfoSection />
      <FriendsSection />
      {showTutorial ? ( <TutorialSection onHide={handleHideTutorial} /> ) : ( <div className="tutorial-button-container"> <button onClick={handleShowTutorial} className="show-tutorial-button">Show Tutorial</button> </div> )}
      <NavigationButton to="/">Back to Landing</NavigationButton>
      <Alert message={alertInfo.message} type={alertInfo.type} />
    </div>
  );
}
export default DashboardPage;

