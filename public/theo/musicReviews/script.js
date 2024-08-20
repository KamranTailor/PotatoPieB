setTimeout(() => {
    if (cps.content && cps.content.properties && cps.content.permissions) {
        console.log(cps);
        if (cps.content.properties.theoMusicAdmin) {
            if (cps.content.properties.theoMusicAdmin === true) {
                console.log('User is authorised for Theo Music Admin');
                document.getElementById('admin-edit').style.display = 'block';
            } else {
                console.log('User is not authorised for Theo Music Admin');
            }
        } else {
            console.log('Theo Music Admin property does not exist');
        }
    } else {
        console.log("Invalid CPS structure");
    }
}, 2000);


async function setAlbum() {
    const response = await fetch('/clients/theo/musicRequest');
    const albums = await response.json();
    console.log(albums);
    let toDisplay = "";
    for (i in albums) {
      const r = albums[i];
      toDisplay += `
      <div class="Litem" onclick="display('${r.uuid}')">
        <div class="name">${r.name}</div>
        <img src="${r.spotifyData.images[0].url}" alt="${r.name} album cover">
      </div>`;
    }
  
    document.getElementById("Lcontainer").innerHTML = toDisplay;  
}

function display(id) {
    window.location.href = `./view?${id}`;
}


setAlbum()

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const container = document.getElementById('Lcontainer');

    function filterItems() {
      const query = searchInput.value.toLowerCase().trim();
      const items = container.querySelectorAll('.Litem');

      items.forEach(item => {
        const nameElement = item.querySelector('.name');
        if (nameElement) {
          const name = nameElement.textContent.toLowerCase().trim();
          if (name.includes(query)) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        }
      });
    }
    searchInput.addEventListener('input', filterItems);
});
