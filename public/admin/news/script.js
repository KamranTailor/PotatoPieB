async function submitForm() {
    const response = await fetch('/news/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: document.getElementById("title").value,
            author: document.getElementById("author").value,
            content: document.getElementById("content").value,
        })
    });
    const data = await response.json();
    alert(data.status)
}