// Get the query string from the current URL
const queryString = window.location.search;

if (queryString.length === 0) {
  console.log("Query string is empty");
  window.location = '/'
} else {
  console.log("Query string is not empty");
}

// Check if queryString starts with a question mark
let albumId;
if (queryString.startsWith('?')) {
    // Remove the question mark and store the modified query
    albumId = queryString.substring(1);
} else {
    console.log("Query string doesn't start with a question mark");
    albumId = queryString;
}

async function onStart() {
    const response = await fetch('/music_a/album', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ albumId: albumId })
    });
    const data = await response.json();
    console.log(data)

    setAlbumSongs(data.album)
    setAlbumInfo(data.album)
}

function setAlbumInfo(r) {
    console.log(r)

    let artists = ""; for (a in r.artists) { let f = r.artists[a];
        if (a == 0) { artists += `<span id="artist" onclick="navArtist('${f.id}')">${f.name}</span>` }
        else { artists += `, `; artists += `<span onclick="navArtist('${f.id}')">${f.name}</span>`}
    }

    var date = new Date(r.release_date);
    var formattedDate = date.toLocaleDateString();

    document.getElementById("name").innerHTML= r.name;
    document.getElementById("artists").innerHTML= artists;
    document.getElementById("total_tracks").innerHTML=  r.total_tracks;
    document.getElementById("popularity").innerHTML=  r.popularity;
    document.getElementById("release_date").innerHTML=  formattedDate;
    document.getElementById("copyrights").innerHTML=  r.copyrights[0].text;
    document.getElementById("image").innerHTML= `<img src="${r.images[0].url}" alt="Album Image">`

}

function setAlbumSongs(data) {
    let toSet = "";
    for (i in data.tracks.items) {
        let r = data.tracks.items[i];
        
        let artists = "";
        for (a in r.artists) {
            let f = r.artists[a];
            if (a == 0) {
                artists += `<span id="artist" onclick="navArtist('${f.id}')">${f.name}</span>`
            }

            else {
                artists += `, `
                artists += `<span onclick="navArtist('${f.id}')">${f.name}</span>`
            }
        }
        toSet += `<div class="song-info">
        <div onclick="link('${r.external_urls.spotify}')"class="song-title">${r.name}</div>
        <div class="artist">${artists}</div>
      </div> `
    }

    document.getElementById("songs").innerHTML= toSet;
}

function back() {
    window.location = "../"
}

function navArtist(id) {
    window.location = `../artists?${id}`
}

function link(link) {
    window.location = link;
}
onStart()