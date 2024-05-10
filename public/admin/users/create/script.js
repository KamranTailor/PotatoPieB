async function addUser() {
    const userDataNew = {
        first_name: document.getElementById("first_name").value,
        second_name: document.getElementById("second_name").value,
        dob: document.getElementById("dob").value,
        email: document.getElementById("email").value,
        permissions: document.getElementById("permissions").value,
        phone_number: document.getElementById("phoneNumber").value,
    };

    console.log(userDataNew)

    const response = await fetch('/createUserAdminRouter/addUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userDataNew)
    });

    // You can handle the response here, for example:
    if (response.ok) {
        alert("User data added successfully!");
        window.location = "../"
    } else {
        alert("Failed to add user data.");
        window.location = "../"
    }
}
