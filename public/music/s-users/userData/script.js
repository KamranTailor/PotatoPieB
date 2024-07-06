// Get the query string from the current URL
const queryString = window.location.search;

if (queryString.length === 0) {
  console.log("Query string is empty");
  window.location = '/'
} else {
  console.log("Query string is not empty");
}

// Check if queryString starts with a question mark
let userID;
if (queryString.startsWith('?')) {
    // Remove the question mark and store the modified query
    userID = queryString.substring(1);
} else {
    console.log("Query string doesn't start with a question mark");
    userID = queryString;
}

async function onStart() {
    const response = await fetch('/music_a/user/details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: userID })
    });
    const data = await response.json();
    console.log(data)

    setAlbumSongs(data.album)
    setAlbumInfo(data.album)
}

onStart()