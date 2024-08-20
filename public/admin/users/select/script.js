let userData = {};

// Get the query string from the current URL
const queryString = window.location.search;

if (queryString.length === 0) {
  console.log("Query string is empty");
  window.location = '/'
} else {
  console.log("Query string is not empty");
}

// Check if queryString starts with a question mark
let modifiedQuery;
if (queryString.startsWith('?')) {
    // Remove the question mark and store the modified query
    modifiedQuery = queryString.substring(1);
} else {
    console.log("Query string doesn't start with a question mark");
    modifiedQuery = queryString;
}

console.log(modifiedQuery);

async function getUser() {   
    const response = await fetch('/usersAdmin/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({userID: modifiedQuery})
    });
    const data = await response.json()
    console.log(data)
    userData = data.userData

    // Prefill form fields with data
    document.getElementById("first_name").value = userData.first_name;
    document.getElementById("second_name").value = userData.second_name;
    document.getElementById("dob").value = userData.dob;
    document.getElementById("email").value = userData.email;
    document.getElementById("permissions").value = userData.permissions;
    document.getElementById("phoneNumber").value = userData.phone_number;
    document.getElementById("username").value = userData.username;

    let toAdd = "";
    for (i in userData.propertys)  {
      toAdd += `${userData.propertys[i]}`;
    }
    document.getElementById("propertys").innerHTML = toAdd;
}

async function updatePropertys() {
  let toAdd = "";
  for (i in userData.propertys)  {
    toAdd += `${propertys[i]}`;
  }
  document.getElementById("propertys").innerHTML = toAdd;
}

getUser()