const apiUrl = "https://script.google.com/macros/s/AKfycbzkREWXT4iUmrVWaW7yv3PVe5QY6PDKOQqDHMLNmLaj2JsWInsu7aiLtQUxoMEPxe2I/exec";

// Initialize map
var map = L.map('map').setView([34.0, -117.8], 16);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Fetch room data from Google Sheets API
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        data.forEach(room => {
            // Example room positions (replace with real coordinates)
            var lat = 34.001 + Math.random() * 0.002; 
            var lon = -117.800 + Math.random() * 0.002;
            
            var marker = L.marker([lat, lon]).addTo(map)
                .bindPopup(`<b>Room ${room.room}</b><br>Status: ${room.status}<br>Schedule: ${room.schedule}<br>${room.info}`);
        });
    })
    .catch(error => console.error("Error fetching data:", error));
