async function onStart() {
    const responce = await fetch("/usersAdmin");
    const data = await responce.json();
    console.log(data);

    let toDisplay = ""
    let f = 0;
    for (i in data.data) {
        const r = data.data[f];
        console.log(r)
        toDisplay += `<tr onclick="moreInfo('${r.userID}')">
        <td> ${r.second_name} </td>
        <td> ${r.first_name} </td>
        <td> ${r.username} </td>
        </tr>`
        f++
    }

    document.getElementById("TABLEboddy").innerHTML= toDisplay
}

async function moreInfo(id) {
    window.location = `./select?${id}`
}

onStart()