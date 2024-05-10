async function update() {
    const userDataNew = {
        first_name: document.getElementById("first_name").value,
        second_name: document.getElementById("second_name").value,
        dob: document.getElementById("dob").value,
        email: document.getElementById("email").value,
        permissions: document.getElementById("permissions").value,
        phone_number: document.getElementById("phoneNumber").value,
        username: document.getElementById("username").value,
        userID: modifiedQuery
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
