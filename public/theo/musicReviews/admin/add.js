let albums;
let album;

function addAlbumsReview() {
  document.getElementById("add").style.display = "block";
  document.getElementById("search-add").style.display = "block";
  document.getElementById("Lcontainer").style.display = "none";
  document.getElementById("album-container").style.display = "none";

}

async function submitSearch() {
  const response = await fetch("/musicCollection/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: document.getElementById("title").value,
    }),
  });
  const data = await response.json();
  console.log(data);

  albums = data.albums;

  let toDisplay = "";
  for (i in albums.items) {
    const r = albums.items[i];
    toDisplay += `
    <div class="Litem">
      <div class="name">${r.name}</div>
      <img src="${r.images[0].url}" alt="${r.name} album cover">
      <button class="button" onclick="selectOption('${i}')" >Select Option</button>
    </div>`;
  }

  document.getElementById("Lcontainer").innerHTML = toDisplay;
  document.getElementById("search-add").style.display = "none";
  document.getElementById("Lcontainer").style.display = "flex";
  document.getElementById("album-container").style.display = "none";

}

function selectOption(opt) {
  const r = albums.items[opt];
  album = r;

  let artists = "";
  for (i in r.artists) {
    artists += `<a href="${r.artists[i].external_urls.spotify}"> ${r.artists[i].name} </a>`;
    if (i < r.artists.length - 1) {
      artists += ", ";
    }
  }

  album.modArtists = artists;

  const toDisplay = `
    <div class="album-info">
        <img src="${r.images[0].url}" alt="Album Cover" class="album-cover">
        <div class="info">
            <h2>${r.name}</h2>
            <p>Artist: ${artists}</p>
            <p>Release Date: ${r.release_date}</p>
            <p>Total Tracks: ${r.total_tracks}</p>
        </div>
    </div>
    <textarea id="review" replaceholder="Your thoughts about this album..."></textarea>
    <button onclick="addReview()" class="green-button">Add Review</button>
  `;  

  document.getElementById("album-container").innerHTML = toDisplay;
  document.getElementById("search-add").style.display = "none";
  document.getElementById("Lcontainer").style.display = "none";
  document.getElementById("album-container").style.display = "block";
}

async function addReview() {

  const response = await fetch('/clients/theo/addMusic', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      artist: album.modArtists,
      name: album.name,
      spotifyData: album,
      review: document.getElementById('review').value,
      createdBy: (`${cps.content.first_name} ${cps.content.second_name}`),
    })
  });
  const data = await response.json();
  console.log(data);

  if (data.success == true) {
    alert('Review added successfully!');
    window.location.reload();
  } else {
    alert('Failed to add review. Please try again.');
  }
}
