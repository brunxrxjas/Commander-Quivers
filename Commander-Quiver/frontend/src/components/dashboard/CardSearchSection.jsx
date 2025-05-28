// src/components/dashboard/CardSearchSection.jsx
import React, { useState, useEffect } from 'react';
import SearchInput from './SearchInput';
import DeckSelector from './DeckSelector';
import SearchResults from './SearchResults';
import PaginationControls from './PaginationControls';
import axios from 'axios';

const CARDS_PER_PAGE = 10; // Define how many cards per page for client-side pagination

// Receives props from DashboardPage
function CardSearchSection({
    userDecks = [],
    onAddCardToDeck,
    onAddCardToCollection,
    onAddCardToWishlist,
    showAlert
}) {
    const [allResults, setAllResults] = useState([]); // Store all fetched results
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedDeckId, setSelectedDeckId] = useState(''); // Holds the ID of the selected deck
    const [showResults, setShowResults] = useState(false); // State for showing/hiding results

    // Calculate total pages based on all results and items per page
    const totalPages = Math.ceil(allResults.length / CARDS_PER_PAGE);
    // Calculate the slice of results to display for the current page
    const displayedResults = allResults.slice(
        (currentPage - 1) * CARDS_PER_PAGE,
        currentPage * CARDS_PER_PAGE
    );

    // --- Scryfall API call ---
    const fetchScryfallData = async (query) => {
        if (!query) return;
        console.log('Searching Scryfall with exact query:', query);
        setIsLoading(true);
        setError('');
        setAllResults([]);
        setCurrentPage(1);
        setShowResults(false);

       
        const exactQuery = `!"${query}"`;
        const apiUrl = `https://api.scryfall.com/cards/search?q=${encodeURIComponent(exactQuery)}&unique=cards`;

        console.log('Requesting Scryfall URL:', apiUrl); 

        try {
            const response = await axios.get(apiUrl);
            console.log('Raw Scryfall Response:', response);

            if (response.data && response.data.data && response.data.data.length > 0) {
                // Log the first result object to inspect its details
                console.log('Single Scryfall Result (Exact Match):', JSON.stringify(response.data.data[0], null, 2));
                setAllResults(response.data.data);
            } else {
                setAllResults([]); // Ensure results are cleared
                setError(`No exact match found for "${query}".`); // More specific error
            }
        } catch (err) {
            // A 404 error is expected if the exact name isn't found
            if (err.response && err.response.status === 404) {
                 setError(`No exact match found for "${query}".`);
            } else {
                 // Handle other potential errors (network, server issues)
                 console.error("Scryfall Search Error:", err);
                 setError(err.response?.data?.details || 'Failed to fetch cards. Check connection or Scryfall status.');
            }
            setAllResults([]); // Clear results on any error
        } finally {
            setIsLoading(false);
            setShowResults(true); 
        }
    };

    const handleSearch = (query) => {
        setSearchTerm(query);
        fetchScryfallData(query);
    };

    // --- Pagination Handlers ---
    const handleNextPage = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1); };
    const handlePreviousPage = () => { if (currentPage > 1) setCurrentPage(currentPage - 1); };

    // --- Handler for DeckSelector's onChange ---
    const handleDeckSelectionChange = (event) => { setSelectedDeckId(event.target.value); };

    // --- Add Handlers ---
    const handleAddToDeck = (card) => {
        if (!selectedDeckId) { showAlert("Please select a deck first!", "error"); return; }
        const targetDeckId = Number(selectedDeckId);
        // Basic type guess (can be improved)
        const cardType = card.type_line.toLowerCase().includes('creature') ? 'creatures' :
                         card.type_line.toLowerCase().includes('land') ? 'lands' :
                         card.type_line.toLowerCase().includes('artifact') ? 'artifacts' :
                         card.type_line.toLowerCase().includes('planeswalker') ? 'planeswalkers' :
                         'spells';
        onAddCardToDeck(targetDeckId, cardType, card.name);
        // Let DashboardPage handle success alerts
    };
    const handleAddToCollection = (card) => { onAddCardToCollection(card); };
    const handleAddToWishlist = (card) => { onAddCardToWishlist(card); };

    // --- Handler to Close/Hide Results ---
    const handleCloseResults = () => {
        setShowResults(false);
        setAllResults([]);
        setError('');
        setCurrentPage(1);
       
    };

    return (
        <div id="searchSection">
            <h3>Search for Cards</h3>
            <SearchInput onSearch={handleSearch} />
            <DeckSelector
                decks={userDecks}
                selectedValue={selectedDeckId}
                onChange={handleDeckSelectionChange}
             />

            {/* Conditionally render the results area */}
            {showResults && (
                <div className="search-results-area" style={{width: '100%', marginTop: '20px'}}>
                    <button onClick={handleCloseResults} style={{ float: 'right', marginBottom: '10px' }} className="close-btn"> {/* Use existing class if desired */}
                        Close Search
                    </button>
                    <div style={{ clear: 'both' }}></div>

                    {/* Display Loading or Error or Results */}
                    {isLoading ? (
                        <div style={{width: '100%', textAlign: 'center', padding: '20px'}}>Loading...</div>
                    ) : error ? (
                         <div style={{ color: 'red', width: '100%', textAlign: 'center', padding: '10px' }}>{error}</div>
                    ) : (
                        <>
                            <SearchResults
                                results={displayedResults}
                                onAddToDeck={handleAddToDeck}
                                onAddToCollection={handleAddToCollection}
                                onAddToWishlist={handleAddToWishlist}
                            />

                            <PaginationControls
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onNextPage={handleNextPage}
                                onPreviousPage={handlePreviousPage}
                            />
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default CardSearchSection;