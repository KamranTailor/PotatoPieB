let cps;

async function checkSession() {
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
      cps = await response.json();

      console.log(cps)
      const perms = cps.content.permissions;
    console.log(pagePermissions, perms)

    if (cps == "Alpha" || pagePermissions == "Other" || pagePermissions == "Open") {
        //Leave

    } else if (perms == "Bravo") {
        if (pagePermissions == "Alpha") {
            alert("User not authorised fot this page.");
            window.location = '/dashboard'
        } 

    } else if (perms == "Charlie") {
        if (pagePermissions == "Alpha" || pagePermissions == "Bravo") {
            alert("User not authorised fot this page.");
            window.location = '/dashboard'
        } 

    } else if (perms == "Delta") {
        if (pagePermissions == "Alpha" || pagePermissions == "Bravo" || pagePermissions == "Charlie") {
            alert("User not authorised fot this page.");
            window.location = '/dashboard'
            console.log("oee")
        } 
    } else if (!perms) {
        alert("User not authorised fot this page.");
        window.location = '/dashboard'
        console.log("oee")
    } else {
        console.log("User is authorised for this page");

    }

  } catch (error) {
      console.error('Error:', error);
      alert("You need to login again")
      localStorage.setItem('userLoggedIn', 'false')
      window.location= '/login'

  }
}

checkSession()