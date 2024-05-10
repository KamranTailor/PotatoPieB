let userData = {};

async function getUser() {   
    const response = await fetch('/usersAdmin/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({userID: localStorage.getItem("userID")})
    });
    const data = await response.json()
    console.log(data)
    userData = data.userData

    // Prefill form fields with data
    document.getElementById("dname").innerHTML = userData.first_name;
    document.getElementById("first_name").value = userData.first_name;
    document.getElementById("second_name").value = userData.second_name;
    document.getElementById("dob").value = userData.dob;
    document.getElementById("email").value = userData.email;
    document.getElementById("phoneNumber").value = userData.phone_number;
}

async function update() {
    const userDataNew = {
        first_name: document.getElementById("first_name").value,
        second_name: document.getElementById("second_name").value,
        dob: document.getElementById("dob").value,
        email: document.getElementById("email").value,
        permissions: userData.permissions,
        phone_number: document.getElementById("phoneNumber").value,
        username: userData.username,
        userID: localStorage.getItem("userID")
    };

    console.log(userDataNew)

    const response = await fetch('/usersAdmin/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userDataNew)
    });

    // You can handle the response here, for example:
    if (response.ok) {
        alert("User data updated successfully!");
    } else {
        alert("Failed to update user data.");
    }
}


getUser()