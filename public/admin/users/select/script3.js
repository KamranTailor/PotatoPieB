
async function deleteAcc() {
    const userID = localStorage.getItem('userID');
    const response = await fetch('/userActionsAdmin/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({userID: userID, usernameDel: userData.username})
      });
    const data = await response.json()
    console.log(data)

    if (data.success) {
        alert("Deleted User")
        window.location = "../"
    } else {
        alert("Error")
    }
}

async function resetPassword() {
    const userID = localStorage.getItem('userID');
    const response = await fetch('/userActionsAdmin/resetAdm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({userID: userID, usernameDel: userData.username})
      });
    const data = await response.json()
    console.log(data)

    if (data.success) {
        alert("Reset Password")
    }else {
        alert("Error")
    }
}