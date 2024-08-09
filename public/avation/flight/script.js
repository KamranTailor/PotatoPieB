// Initialize the map and set its view to your chosen geographical coordinates and a zoom level
var map = L.map('map').setView([51.505, -0.09], 9);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const planeIcon = L.icon({
    iconUrl: 'plane.png',
    iconSize: [32, 32], // Adjust the size according to your image dimensions
    iconAnchor: [16, 16] // Anchor the icon at the center
});

var markers = []; // Array to keep track of all markers
var planes = [];

async function updateTime() {
try {
    const response = await fetch('/flightApi');
    if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
    }

    const data = await response.json();

    //console.log(data)
     // Remove existing markers
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];
    planes = data.data;
    let text = "";

    for (let i in data.data) {
        const r = data.data[i];
        if (r.lat) {
            // Add a new marker for the aircraft
            const marker = L.marker([r.lat, r.lon], { icon: planeIcon })
                .bindPopup(`<b>${r.callSign}</b><br>Lat: ${r.lat}, Lon: ${r.lon}`)
                .addTo(map);
            markers.push(marker); // Add marker to the array
            
            text = text + `<div id="flight"> <b> ${r.callSign}: </b>, ${r.altitude}ft, Squawk:${r.squawk} <br> </div>`
            // Rotate the marker based on r.track
            marker._icon.style.transform += ` rotate(${r.track}deg)`;
            // Adjust the transform-origin to the center of the icon
            marker._icon.style.transformOrigin = 'center';
        }
    }
    document.getElementById("flights").innerHTML= text;
    //console.log("Got data", Date.now())
} catch (error) {
    console.error('Error fetching time:', error);
}
}

setInterval(updateTime, 2000);
updateTime(); // Initial call to set time immediately on load