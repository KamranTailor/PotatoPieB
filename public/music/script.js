async function onStart() {
    const responce = await fetch("/music_a")
    const data = await responce.json()
    console.log(data)

    let toSet = "";
    for (i in data.data) {
        const r = data.data[i];
        toSet += `<div class="item_container" name="${r.name}" onclick="navTo('${r.id}')">
        <img class="item_img" src="${r.url}" alt="${r.name}">
        <div class="artist_name">${r.name}</div>
        </div>`
    }

    document.getElementById("dashboard_img").innerHTML = toSet
}


// Function to filter items based on search input
function filterItems() {
    const searchText = document.getElementById('searchInput').value.toLowerCase();
    const items = document.querySelectorAll('.item_container');

    items.forEach(item => {
        const itemName = item.getAttribute('name').toLowerCase();
        if (itemName.includes(searchText)) {
            item.style.display = 'block'; // Show matching items
        } else {
            item.style.display = 'none'; // Hide non-matching items
        }
    });
}

// Attach event listener to the search input
document.getElementById('searchInput').addEventListener('input', filterItems);

function navTo(n) {
    window.location = `./artists?${n}`
}
onStart()