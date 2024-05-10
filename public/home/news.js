async function getNews() {
    const response = await fetch("/news/get");
    const data = await response.json();

    // Sort the news items based on timestamp in descending order (newest first)
    const sortedData = data.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    let html = "";
    for (const newsItem of sortedData) {
        html += `<div class="item" onclick="navTo('/news?${newsItem.ID}')">${newsItem.title}</div>`;
    }
    document.getElementById("carousel-container").innerHTML = html; 
}

function navTo(loc) {
    window.location = loc;
}

getNews()
