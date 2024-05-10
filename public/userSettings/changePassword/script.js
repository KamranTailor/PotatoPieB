

async function login() {

    const response = await fetch('/changePassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userID: localStorage.getItem("userID"),
            oldPassword: document.getElementById("oldPassword").value,
            newPassword: document.getElementById("newPassword").value,
            confirmNewPassword: document.getElementById("confirmNewPassword").value,
        })
    });
    const data = await response.json()
    console.log(data)

    if (data.success) {
        alert("Updated Password")
        window.location = "../";
    } else {
        alert(data.message)
    }
}