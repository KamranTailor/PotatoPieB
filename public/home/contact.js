async function sendContactRequest() {
    try {

        const cnt = document.getElementById("text").value; 
        const eml = document.getElementById("email").value;
        const sub = document.getElementById("subject").value
        const contactData = {
            content: cnt,
            email: eml,
            subject: sub
        };

        const response = await fetch('/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contactData),
        });

        if (response.ok) {
            alert("Sent message!")
        } else {
            alert("Error sending contact")
        }

        const data = await response.json();
        console.log('Response:', data);
    } catch (error) {
        alert("Error sending contact")
    }
}
