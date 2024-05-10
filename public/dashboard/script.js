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
            console.log("SA")
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

    setViews(data)
    setInitContent(data)
}

function setInitContent(cpss) {
    var currentHour = new Date().getHours();

    // Initialize a variable to store the greeting
    var greeting;

    // Set the greeting based on the current hour
    if (currentHour >= 5 && currentHour < 12) {
        greeting = `Good morning ${cpss.content.first_name} ☀️`;
    } else if (currentHour >= 12 && currentHour < 18) {
        greeting = `Good afternoon ${cpss.content.first_name} 👋`;
    } else {
        greeting = `Good evening ${cpss.content.first_name} 🌙 `;
    }

    // Log the greeting to the console

    document.getElementById("greeting").innerHTML = greeting;
}

function navigateTo(section) {
    var contentDiv = document.getElementById('content');
    switch (section) {
        case 'user-settings':
            window.location = '/userSettings';
            break;
        case 'tube-time':
            window.location = '/tubeTime';
            break;
        case 'coded-items':
            window.location = '/coded-items';
            break;
        case 'gaming':
            window.location = '/gaming';
            break;
        case 'space':
            window.location = '/space';
            break;
        case 'aviation':
            window.location = '/avation';
            break;
        case 'transport':
            window.location = '/transport';
            break;
        case 'other':
            window.location = '/other';
            break;
        case 'admin':
            window.location = '/admin';
            break;
        case 'music':
            window.location = '/music';
            break;
        default:
            contentDiv.innerHTML = '<p>Please select an item from the dashboard.</p>';
    }
}

function setViews(data) {
    if (data.content.permissions == "Bravo") {
        const dashboard = `
        <div class="item" id="user-settings" onclick="navigateTo('user-settings')">Your Account</div>
        <div class="item" id="tubeTime" onclick="navigateTo('tube-time')">Tube Time</div>
        <div class="item" id="codedItems" onclick="navigateTo('coded-items')">Coded Items</div>
        <div class="item" id="gaming" onclick="navigateTo('gaming')">Gaming</div>
        <div class="item" id="space" onclick="navigateTo('space')">Space</div>
        <div class="item" id="aviation" onclick="navigateTo('aviation')">Aviation</div>
        <div class="item" id="music" onclick="navigateTo('music')">Music</div>
        <div class="item" id="transport" onclick="navigateTo('transport')">Transport</div>
        <div class="item" id="other" onclick="navigateTo('other')">Other</div>
    `
    document.getElementById("dashboard").innerHTML = dashboard;
    } else if (data.content.permissions == "Charlie") {
        const dashboard = `
        <div class="item" id="user-settings" onclick="navigateTo('user-settings')">Your Account</div>
        <div class="item" id="codedItems" onclick="navigateTo('coded-items')">Coded Items</div>`
        document.getElementById("dashboard").innerHTML = dashboard;

    } else if (data.content.permissions == "Delta") {
        const dashboard = `<h1> PLEASE CONTACT US AND SPECIFIY CODE DELTA </h1>`
    document.getElementById("dashboard").innerHTML = dashboard;

    }
}

async function deleteUserSession() {
    try {
        const userID = localStorage.getItem('userID'); 
        const response = await fetch('/ID/logout', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userID: userID })
        });
        
        const data = await response.json();
        console.log(data)
        window.location = "/login"
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to delete user session');
    }
}