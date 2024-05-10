async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch('/userVerfication/loginWeb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({password: password, username: username})
    });
    const data = await response.json();
    console.log(data)

    if (data.message == false ) {
      document.getElementById("notes").innerHTML= data.content;

      localStorage.setItem('userLoggedIn', 'false')

    } else if (data.message == true ) {
      localStorage.setItem('userLoggedIn', 'true')
      
      localStorage.setItem('serverID', data.serverID)
      localStorage.setItem('userID', data.userID)

      window.location = "/dashboard"
    }  
}
