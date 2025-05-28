import React, { useState } from 'react';

function AddEventForm({ locations, onAddEvent, onCancel, showAlert }) {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [locationId, setLocationId] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!eventName.trim() || !eventDate || !locationId) {
      showAlert("Event name, date, and location are required.", "error");
      return;
    }
    onAddEvent({
      name: eventName.trim(),
      date: eventDate,
      time: eventTime,
      locationId: Number(locationId),
      description: description.trim() 
    });
    // Reset form
    setEventName('');
    setEventDate('');
    setEventTime('');
    setLocationId('');
    setDescription('');
    if (onCancel) onCancel(); 
  };

  return (
    <div className="form-container" style={{marginBottom: '20px', background: '#f0f0f0'}}>
      <h4>Add New Event</h4>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="eventName">Event Name:</label>
          <input
            type="text"
            id="eventName"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
            style={{width: '100%', boxSizing: 'border-box'}}
          />
        </div>
        <div>
          <label htmlFor="eventDate">Date:</label>
          <input
            type="date"
            id="eventDate"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            required
            style={{width: '100%', boxSizing: 'border-box'}}
          />
        </div>
        <div>
          <label htmlFor="eventTime">Time (optional):</label>
          <input
            type="time"
            id="eventTime"
            value={eventTime}
            onChange={(e) => setEventTime(e.target.value)}
            style={{width: '100%', boxSizing: 'border-box'}}
          />
        </div>
        <div>
          <label htmlFor="eventLocation">Location:</label>
          <select
            id="eventLocation"
            value={locationId}
            onChange={(e) => setLocationId(e.target.value)}
            required
            style={{width: '100%', boxSizing: 'border-box', padding: '12px 15px', border: '2px solid #ddd', borderRadius: '6px'}}
          >
            <option value="">Select a location</option>
            {locations.map(loc => (
              <option key={loc.id} value={loc.id}>{loc.name} - {loc.address}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="eventDescription">Description (optional):</label>
          <textarea
            id="eventDescription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
            style={{width: '100%', boxSizing: 'border-box', padding: '10px', border: '2px solid #ddd', borderRadius: '6px'}}
          />
        </div>
        <div style={{ marginTop: '10px', textAlign: 'right' }}>
          {onCancel && <button type="button" onClick={onCancel} style={{ marginRight: '10px' }}>Cancel</button>}
          <button type="submit">Add Event</button>
        </div>
      </form>
    </div>
  );
}

export default AddEventForm;
