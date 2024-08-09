const add = document.getElementById("add");
const comfirm = document.getElementById("comfirm");

comfirm.style.display = "none";
add.style.display = "block";

let mediaType = "";
let albumType = "";

let albums;
async function submit() {
    try {
        mediaType = document.getElementById("mediaType").value;
        albumType = document.getElementById("albumType").value;
        const response = await fetch('/musicCollection/add', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: document.getElementById("title").value
            })
          });
        const data = await response.json();
        console.log(data);
        albums = data.albums

        comfirm.style.display = "block";
        add.style.display = "none";

        let toDisplay = "";
        for (i in albums.items) {
            const r = albums.items[i];
            toDisplay += `<div class="Litem">
                        <div class="name">${r.name}</div>
                        <img src="${r.images[0].url}" alt="${r.name} album cover">
                        <button class="button" onclick="selectOption('${i}')" >Select Option</button>
                    </div>`
        }
        document.getElementById("Lcontainer").innerHTML = toDisplay;
    } catch (error) {
        console.log(error)
        alert("An Error Occured")
    }
}

async function selectOption(i) {
    try {
        const albumData = albums.items[i];
        const response = await fetch('/musicCollection/confirm', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                mediaType,
                albumType,
                albumData
            })
        });
        const data = await response.json();
        console.log(data);
        alert("Added Item")
        window.location = "../"
    } catch (error) {
        console.log(error)
        alert("An Error Occured")
    }
}