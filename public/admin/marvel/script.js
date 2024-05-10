const viewCharactersDIV = document.getElementById("viewCharacters");
const addCharacterDIV = document.getElementById("addCharacter");
const comfirmCharacterDIV = document.getElementById("comfirmCharacter");

viewCharactersDIV.style.display = "none"
addCharacterDIV.style.display = "none"
comfirmCharacterDIV.style.display = "none"

function addCharacter() {
    viewCharactersDIV.style.display = "none"
    addCharacterDIV.style.display = "block"
    comfirmCharacterDIV.style.display = "none"
}

function viewCharacters() {
    viewCharactersDIV.style.display = "block"
    addCharacterDIV.style.display = "none"
    comfirmCharacterDIV.style.display = "none"
}

function navigateTo(loc) {
    window.location = loc;
}