// src/components/dashboard/SearchInput.js
import React, { useState } from 'react';

function SearchInput({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        if (!searchTerm.trim()) return;
        onSearch(searchTerm);
    };

    return (
        <>
            <input
                type="text"
                id="searchCardName"
                placeholder="Enter card name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()} // Optional: search on Enter key
            />
            <button onClick={handleSearch}>Search</button>
        </>
    );
}
export default SearchInput;