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

      if (cps.message) {
          console.log("SA")
      } else {
          //alert("You need to login again")
          //localStorage.setItem('userLoggedIn', 'false')
          //window.location= '/login'
      }
  } catch (error) {
      console.error('Error:', error);
      //alert("You need to login again")
      //localStorage.setItem('userLoggedIn', 'false')
      //window.location= '/login'

  }
}

checkSession()