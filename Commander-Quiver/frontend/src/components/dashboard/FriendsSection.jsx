// src/components/dashboard/FriendsSection.js
import React, { useState } from 'react';
import AddFriendForm from './AddFriendForm';
import FriendsList from './FriendList';
import SharedDataDisplay from './SharedDataDisplay';

// Manages the Friends tab content
function FriendsSection({ initialFriends = [] }) { // Friends data likely needs backend
    const [friends, setFriends] = useState(initialFriends);
    const [viewingFriend, setViewingFriend] = useState(null);
    const [sharedData, setSharedData] = useState({}); // Placeholder

    const handleAddFriend = (username) => {
        if (!friends.includes(username)) {
             // In real app, POST to backend to add friend relationship
            setFriends([...friends, username]);
             // Show feedback
        } else {
            // Show feedback: already friends
             console.warn("Friend already exists");
        }
    };

    const handleViewSharedData = (username) => {
        // In real app, fetch shared data from backend for this user
        setViewingFriend(username);
        setSharedData({ // Replace with actual fetched data
             decks: [{name: `${username}'s Deck 1`}],
             collection: [`${username}'s Card A`],
             wishlist: [`${username}'s Wanted Card`]
        });
    };

    const handleCloseSharedData = () => {
        setViewingFriend(null);
        setSharedData({});
    };

    return (
        <div id="friendsSection">
            <h3>Friends</h3>
            <AddFriendForm onAddFriend={handleAddFriend} />
            <FriendsList friends={friends} onViewSharedData={handleViewSharedData} />

            {/* Conditional display of shared data */}
            {viewingFriend && (
                 <SharedDataDisplay
                    friendUsername={viewingFriend}
                    sharedData={sharedData}
                    onClose={handleCloseSharedData}
                />
            )}
        </div>
    );
}

export default FriendsSection;