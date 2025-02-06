const apiUrl = "https://script.google.com/macros/s/AKfycbzkREWXT4iUmrVWaW7yv3PVe5QY6PDKOQqDHMLNmLaj2JsWInsu7aiLtQUxoMEPxe2I/exec";

// Initialize map with a more appropriate view centered on DBHS
var map = L.map('map').setView([34.0015, -117.8102], 17);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Fetch room data from Google Sheets API
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        // Sort rooms by room number
        data.sort((a, b) => a.room.localeCompare(b.room, undefined, { numeric: true }));

        // Generate markers with consistent relative positions
        data.forEach((room, index) => {
            var lat = 34.001 + (index * 0.000002);  // Adjust position systematically
            var lon = -117.800 + (index * 0.000002);
            
            var marker = L.marker([lat, lon]).addTo(map)
                .bindPopup(`<b>Room ${room.room}</b><br>Status: ${room.status}<br>Schedule: ${room.schedule}<br>${room.info}`);
        });
    })
    .catch(error => console.error("Error fetching data:", error));
