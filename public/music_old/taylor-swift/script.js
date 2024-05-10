async function getAlbums() {
    document.getElementById("back").innerHTML= "";
    document.getElementById("co-text").innerHTML= "";
    const res = await fetch("https://taylor-swift-api.sarbo.workers.dev/albums");
    const albums = await res.json();

    var htmlAlbums = `<div class="dashboard" id="dashboard">`;
    for (i in albums) {
        htmlAlbums += `<div class="item" 
        onclick="getAlbumSongs('${albums[i].album_id}')">
            ${albums[i].title} 
        </div>`;
    }
    htmlAlbums += `</div>`
    document.getElementById("content").innerHTML = htmlAlbums;
    document.getElementById("sub-text").innerHTML = "Select an Album!";
}

async function getAlbumSongs(album_id) {
    const res = await fetch(`https://taylor-swift-api.sarbo.workers.dev/albums/${album_id}`);
    const songs = await res.json();

    var htmlSongs = `<div class="dashboard" id="dashboard">`;
    for (i in songs) {
        htmlSongs += `<div class="item" 
        onclick="getSongs('${songs[i].song_id},${album_id}')">
            ${songs[i].title} 
        </div>`;
    }
    htmlSongs += `</div>`
    document.getElementById("content").innerHTML = htmlSongs;
    document.getElementById("sub-text").innerHTML = "Select a Song!";
    document.getElementById("back").innerHTML = `<button class="red-button" onclick="getAlbums()">Back</button>`;
}

async function getSongs(songID) {
    const res = await fetch(`https://taylor-swift-api.sarbo.workers.dev/lyrics/${songID}`);
    const song = await res.json();

    var formattedLyrics = song.lyrics.replace(/\n/g, '<br>');

    var songHtml = `
        <div id="lyrics">${formattedLyrics}</div>
    `;

    document.getElementById("content").innerHTML = songHtml;
    document.getElementById("co-text").innerHTML = `- ${song.song_title}`;
    document.getElementById("sub-text").innerHTML = ``;
    document.getElementById("back").innerHTML = `<button class="red-button" onclick="getAlbums()">Back</button>`;
}
getAlbums()