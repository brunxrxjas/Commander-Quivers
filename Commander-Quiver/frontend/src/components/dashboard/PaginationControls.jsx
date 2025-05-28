// src/components/dashboard/PaginationControls.js
import React from 'react';

function PaginationControls({ currentPage, totalPages, onPreviousPage, onNextPage }) {
    if (totalPages <= 1) return null; 

    return (
        <div id="paginationControls">
            <button onClick={onPreviousPage} disabled={currentPage === 1}>
                Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={onNextPage} disabled={currentPage === totalPages}>
                Next
            </button>
        </div>
    );
}
export default PaginationControls;