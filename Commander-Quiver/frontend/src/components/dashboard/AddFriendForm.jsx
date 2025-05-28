// src/components/dashboard/AddFriendForm.js
import React, { useState } from 'react';

function AddFriendForm({ onAddFriend }) {
    const [username, setUsername] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username.trim()) return;
        onAddFriend(username);
        setUsername('');
    };

    return (
        <div id="addFriendForm">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="friendUsername"
                    placeholder="Friend's Username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button type="submit">Add Friend</button>
            </form>
        </div>
    );
}
export default AddFriendForm;