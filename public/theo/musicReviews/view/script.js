const queryString = window.location.search;
let albums;

if (queryString.length === 0) {
    console.log("Query string is empty");
    window.location = '/';
} else {
    console.log("Query string is not empty");
}

let modifiedQuery;
if (queryString.startsWith('?')) {
    modifiedQuery = queryString.substring(1);
} else {
    console.log("Query string doesn't start with a question mark");
    modifiedQuery = queryString;
}

async function renderAlbumData() {
    const response = await fetch('/clients/theo/musicRequest');
    albums = await response.json();

    let data;
    for (const album of albums) {
        if (album.uuid === modifiedQuery) {
            data = album;
            console.log(album)
            break;
        }
    }

    if (!data) {
        document.getElementById('album-info').innerHTML = '<p>No album data found.</p>';
        return;
    }

    const albumInfoDiv = document.getElementById('album-info');

    const albumHtml = `
        <center> <h1>${data.spotifyData.name}</h1> </center>
        <br>
        <div class="iframe-container">
            <iframe style="border-radius:12px" src="https://open.spotify.com/embed/album/${data.spotifyData.id}?utm_source=generator" 
            width="100%" height="352" frameBorder="0" allowfullscreen="" 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        </div>
        <div class="details">
            Writen By <strong>${data.createdBy}</strong> on <i>${new Date(data.createdAt).toLocaleDateString()}</i>
        </div>
        <div class="details">
            ${data.review}
        </div>
        <div class="links">
            <p><strong>Listen on Spotify:</strong> <a href="${data.spotifyData.external_urls.spotify}" target="_blank">Album Link</a></p>
            <p><strong>Artist:</strong> ${data.artist}</p>
        </div>
    `;

    albumInfoDiv.innerHTML = albumHtml;
}
renderAlbumData();