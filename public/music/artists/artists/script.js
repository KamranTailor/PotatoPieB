// Get the query string from the current URL
const queryString = window.location.search;

if (queryString.length === 0) {
  console.log("Query string is empty");
  window.location = '/'
} else {
  console.log("Query string is not empty");
}

// Check if queryString starts with a question mark
let artistId;
if (queryString.startsWith('?')) {
    // Remove the question mark and store the modified query
    artistId = queryString.substring(1);
} else {
    console.log("Query string doesn't start with a question mark");
    artistId = queryString;
}

async function getArtistAlbums() {
    try {

        const response = await fetch('/music_a/artist/albums', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ artistId: artistId })
        });
        const data = await response.json();
        console.log(data)

        if (data.status == false) {
          alert(data.error)
          window.location = "../"
        }

        document.getElementById("name").innerHTML= data.artist.name //<img src="example.jpg" alt="Example Image">
        document.getElementById("image").innerHTML= `<img src="${data.artist.images[0].url}" alt="Example Image">`
        //document.getElementById("image").innerHTML= `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/artist/6Q192DXotxtaysaqNPy5yR?utm_source=generator&theme=0" width="100%" height="352" frameBorder="0" allowfullscreen="" 
       // allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`
        
        let genres = "";
        for (let i in data.artist.genres) {
            // Capitalize the first letter of each genre  
            let capitalizedGenre = data.artist.genres[i].charAt(0).toUpperCase() + data.artist.genres[i].slice(1);
            genres += capitalizedGenre;
        }
        document.getElementById("genres").innerHTML = genres;

        // Capitalize the "Type"
        let capitalizedType = data.artist.type.charAt(0).toUpperCase() + data.artist.type.slice(1);
        document.getElementById("type").innerHTML = capitalizedType;


        document.getElementById("pop").innerHTML= data.artist.popularity;
        document.getElementById("links").innerHTML= `<a href="${data.artist.external_urls.spotify}">Spotify</a>`;

        setAlbums(data.albums)
        setSingles(data.singles.body)
       
    } catch (error) {
        console.error('Error:', error);
      }
}

function setAlbums(data) {
    let toSet = "";
    for (i in data.items) {
        const r = data.items[i];
        toSet += `<div class="item_container" name="${r.name}" onclick="navTo('${r.id}')">
        <img class="item_img" src="${r.images[0].url}" alt="${r.name}">
        <div class="artist_name">${r.name}</div>
        </div>`
    }

    let buttons = "";
    if (data.previous) {
      buttons += `<button class="green-button" onclick="getNextAlbums('${data.previous}')">Previous</button>`
    }

    if (data.next) {
      buttons += `<button class="green-button" onclick="getNextAlbums('${data.next}')">Next</button>`
    } 

    document.getElementById("albums").innerHTML= toSet
    document.getElementById("buttons").innerHTML= buttons
}

function setSingles(data) {
  let toSet = "";
  for (i in data.items) {
      const r = data.items[i];
      toSet += `<div class="item_container" name="${r.name}" onclick="navTo('${r.id}')">
      <img class="item_img" src="${r.images[0].url}" alt="${r.name}">
      <div class="artist_name">${r.name}</div>
      </div>`
  }

  let buttons = "";
  if (data.previous) {
    buttons += `<button class="green-button" onclick="getNextSingles('${data.previous}')">Previous</button>`
  }

  if (data.next) {
    buttons += `<button class="green-button" onclick="getNextSingles('${data.next}')">Next</button>`
  } 

  document.getElementById("singles").innerHTML= toSet
  document.getElementById("buttons-s").innerHTML= buttons
}

async function getNextAlbums(url) {
  const response = await fetch('/music_a/artist/albums/s', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ url: url })
  });
  const data = await response.json()
  console.log(data)
  setAlbums(data)
}

async function getNextSingles(url) {
  const response = await fetch('/music_a/artist/albums/s', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ url: url })
  });
  const data = await response.json()
  console.log(data)
  setSingles(data)
}

function back() {
  window.location = "../"
}

function navTo(l) {
  window.location = `../albums?${l}`
}
  // Call the function when the page loads
  window.onload = getArtistAlbums;