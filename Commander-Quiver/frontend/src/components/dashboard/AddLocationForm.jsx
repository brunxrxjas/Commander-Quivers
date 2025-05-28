import React, { useState } from 'react';

function AddLocationForm({ onAddLocation, onCancel, showAlert }) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !address.trim()) {
      showAlert("Location name and address are required.", "error");
      return;
    }
    onAddLocation({ name: name.trim(), address: address.trim(), notes: notes.trim() });
    setName('');
    setAddress('');
    setNotes('');
    if (onCancel) onCancel(); 
  };

  return (
    <div className="form-container" style={{marginBottom: '20px', background: '#f0f0f0'}}>
      <h4>Add New Location</h4>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="locationName">Location Name:</label>
          <input
            type="text"
            id="locationName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{width: '100%', boxSizing: 'border-box'}}
          />
        </div>
        <div>
          <label htmlFor="locationAddress">Address:</label>
          <input
            type="text"
            id="locationAddress"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            style={{width: '100%', boxSizing: 'border-box'}}
          />
        </div>
        <div>
          <label htmlFor="locationNotes">Notes (optional):</label>
          <textarea
            id="locationNotes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows="3"
            style={{width: '100%', boxSizing: 'border-box', padding: '10px', border: '2px solid #ddd', borderRadius: '6px'}}
          />
        </div>
        <div style={{ marginTop: '10px', textAlign: 'right' }}>
          {onCancel && <button type="button" onClick={onCancel} style={{ marginRight: '10px' }}>Cancel</button>}
          <button type="submit">Add Location</button>
        </div>
      </form>
    </div>
  );
}

export default AddLocationForm;
