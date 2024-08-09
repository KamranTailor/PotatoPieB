function filterCards() {
    const searchInput = document.querySelector('.search').value.toLowerCase();
    const cards = document.querySelectorAll('.Litem');

    cards.forEach(card => {
        const cardName = card.querySelector('.name').textContent.toLowerCase();
        if (cardName.includes(searchInput)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

async function getAll() {
    try {
        const response = await fetch('/musicCollection');
        const data = await response.json()
        console.log(data)
        
        let toDisplay = "";
        for (const i in data) {
            const r = data[i];
            toDisplay += `
                <div class="Litem">
                    <div class="name">${r.albumData.name} (${r.mediaType})</div>
                    <img src="${r.albumData.images[0].url}" alt="${r.albumData.name} album cover">
                </div>`;
        }
        
        // Assuming you want to insert `toDisplay` into a specific element
        document.getElementById('Lcontainer').innerHTML = toDisplay;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}



getAll()