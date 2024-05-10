async function sub() {
    var pinValue = document.getElementById("pin").value;
    const response = await fetch('/otpAdmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({authCode: pinValue})
      });
    const data = await response.json();
    console.log(data)
}