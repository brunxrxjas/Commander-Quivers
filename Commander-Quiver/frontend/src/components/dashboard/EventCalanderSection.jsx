import React, { useState } from 'react';
import AddEventForm from './AddEventForm';
import AddLocationForm from './AddLocationForm';
import CalendarView from './CalendarView'; // Placeholder for actual calendar

function EventCalendarSection({ eventsData, locationsData, onAddEvent, onAddLocation, showAlert }) {
  // Potentially state for showing/hiding forms
  const [showAddEventForm, setShowAddEventForm] = useState(false);
  const [showAddLocationForm, setShowAddLocationForm] = useState(false);

  return (
    <div id="eventCalendarSection">
      <h3>Events & Locations</h3>

      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <button onClick={() => setShowAddLocationForm(prev => !prev)}>
          {showAddLocationForm ? 'Hide Add Location Form' : 'Add New Location'}
        </button>
        <button onClick={() => setShowAddEventForm(prev => !prev)}>
          {showAddEventForm ? 'Hide Add Event Form' : 'Add New Event'}
        </button>
      </div>

      {showAddLocationForm && (
        <AddLocationForm
          onAddLocation={onAddLocation}
          onCancel={() => setShowAddLocationForm(false)}
          showAlert={showAlert}
        />
      )}

      {showAddEventForm && (
        <AddEventForm
          locations={locationsData} // Pass locations for the dropdown
          onAddEvent={onAddEvent}
          onCancel={() => setShowAddEventForm(false)}
          showAlert={showAlert}
        />
      )}

      <h4>Upcoming Events</h4>
      <CalendarView events={eventsData} locations={locationsData} />

     
      <div style={{marginTop: '30px'}}>
        <h4>Managed Locations</h4>
        {locationsData.length === 0 ? (
            <p>No locations added yet.</p>
        ) : (
            <ul id="locationsList">
                {locationsData.map(loc => (
                    <li key={loc.id} style={{borderBottom: '1px solid #eee', padding: '5px 0'}}>
                        <strong>{loc.name}</strong> - {loc.address}
                    </li>
                ))}
            </ul>
        )}
      </div>
    </div>
  );
}

export default EventCalendarSection;

