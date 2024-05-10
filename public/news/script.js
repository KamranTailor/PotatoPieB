let userData = {};

// Get the query string from the current URL
const queryString = window.location.search;

if (queryString.length === 0) {
  console.log("Query string is empty");
  window.location = '/'
} else {
  console.log("Query string is not empty");
}

// Check if queryString starts with a question mark
let modifiedQuery;
if (queryString.startsWith('?')) {
    // Remove the question mark and store the modified query
    modifiedQuery = queryString.substring(1);
} else {
    console.log("Query string doesn't start with a question mark");
    modifiedQuery = queryString;
}

async function setPage() {
    const response = await fetch("/news/get");
    const data = await response.json();

    // Sort the news items based on timestamp in descending order (newest first)
    const sortedData = data.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    let html = "";
    for (const newsItem of sortedData) {
        html += `<div class="item" onclick="navTo('/news?${newsItem.ID}')">${newsItem.title}</div>`;
    }
    document.getElementById("dashboard").innerHTML = html; 

    for (i in sortedData) {
        const r = sortedData[i];
        if (r.ID == modifiedQuery) {
            document.getElementById("title").innerHTML= r.title;
            document.getElementById("author").innerHTML= r.author;

            let datetime = new Date(r.timestamp);
            let formattedDatetime = datetime.toLocaleString();
            document.getElementById("time").innerHTML= formattedDatetime;

            const content = r.content
            let newContent = content.replace(/\n/g, "<br>");
            document.getElementById("content").innerHTML= newContent;

        }
    }
}

function navTo(loc) {
    window.location = loc;
}

setPage()