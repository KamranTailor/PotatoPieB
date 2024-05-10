async function onStartData() {
    const userID = localStorage.getItem('userID');

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userID })
    };

    try {
        const response = await fetch('/ID/loginCheck', requestOptions);
        data = await response.json();

        console.log(data)

        if (data.message) {
            console.log("LOGIN TRUE")
            if (data.content.permissions == "Alpha") {
                loadPage()
            } else {
                alert("You do not have access to this page")
                window.location= '/dashboard'
            }
        } else {
            alert("You need to login again")
            localStorage.setItem('userLoggedIn', 'false')
            window.location= '/login'
        }
    } catch (error) {
        console.error('Error:', error);
        alert("You need to login again")
        localStorage.setItem('userLoggedIn', 'false')
        //window.location= '/login'
  
    }
}

async function loadPage() {
    console.log("PL")
}

onStartData()