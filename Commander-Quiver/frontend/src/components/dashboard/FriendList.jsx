// src/components/dashboard/FriendsList.js
import React from 'react';

function FriendsList({ friends = [], onViewSharedData }) {
    return (
        <ul id="friendsList">
            {friends.length === 0 ? (
                <li>No friends added yet.</li>
            ) : (
                friends.map((friend, index) => (
                    <li key={index} className="friend-item"> 
                        {friend}
                        
                        <button onClick={() => onViewSharedData(friend)}>
                            View Shared Data (Needs Implementation)
                        </button>
                    </li>
                ))
            )}
        </ul>
    );
}
export default FriendsList;