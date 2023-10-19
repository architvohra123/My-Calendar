let hasEvent=null;
let eventData=null;

const eventsList = document.getElementById('events-list');

function saveToLocalStorage() {
    localStorage.setItem('hasEvent', JSON.stringify(hasEvent));
    localStorage.setItem('eventData', JSON.stringify(eventData));
}
function loadFromLocalStorage() {
    const hasEventData = localStorage.getItem('hasEvent');
    const eventDataData = localStorage.getItem('eventData');

    if (hasEventData) {
        hasEvent = JSON.parse(hasEventData);
    }

    if (eventDataData) {
        eventData = JSON.parse(eventDataData);
    }
}

// Load data from local storage when the page loads
loadFromLocalStorage();

// Update local storage whenever 'hasEvent' or 'eventData' change
function updateLocalStorage() {
    saveToLocalStorage();
}



// Function to display the list of events
function displayEvents() {
    eventsList.innerHTML = '';

    if (Object.keys(eventData).length === 0) {
        eventsList.textContent = 'No events till now.';
        return;
    }

    for (const date in eventData) {
        const event = eventData[date];
        const eventItem = document.createElement('div');
        eventItem.innerHTML = `
            <div style="background-color: #D3D3D3; border-radius:2%; height:125px; width:75%; margin-left:3%; padding: 5px;">
                <h5>Date: ${date}</h5>
                <h5>Event: ${event}</h5>
                <button class="update-event btn btn-warning" data-date="${date}">Update</button>
                <button class="delete-event btn btn-danger" data-date="${date}">Delete</button>
            </div><hr>
        `;

        // Add event listeners for update and delete buttons
        const updateButton = eventItem.querySelector('.update-event');
        updateButton.addEventListener('click', updateEvent);

        const deleteButton = eventItem.querySelector('.delete-event');
        deleteButton.addEventListener('click', deleteEvent);

        eventsList.appendChild(eventItem);
    }
}

// Function to update an event
function updateEvent(event) {
    const date = event.target.getAttribute('data-date');
    const updatedEvent = prompt(`Update the event for ${date}:`, eventData[date]);
    
    if (updatedEvent !== null) {
        eventData[date] = updatedEvent;
        updateLocalStorage();
        displayEvents();
    }
}

// Function to delete an event
function deleteEvent(event) {
    const date = event.target.getAttribute('data-date');
    if (confirm(`Are you sure you want to delete the event for ${date}?`)) {
        delete eventData[date];
        delete hasEvent[date];
        updateLocalStorage();
        displayEvents();
    }
}

// Display events on page load
displayEvents();

function goToCalendar() {
    window.location.href = 'index2.html';
}