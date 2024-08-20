let data;

async function getMusic() {
    const response = await fetch('/clients/theo/musicRequest');
    data = await response.json();
    console.log(data)

    let toDisplay = '';
    for (i in data) {
        const isoString = data[i].createdAt;
        const dateObject = new Date(isoString);
        const dateOnly = dateObject.toISOString().split('T')[0];

        toDisplay += `<tr onclick="editMusic('${data[i].uuid}')">
            <td>${data[i].name}</td>
            <td>Artist: ${data[i].artist}</td>
            <td>Created At: ${dateOnly}</td>
        </tr>`;
    }
    document.getElementById('review-table').innerHTML = toDisplay;
}

async function editMusic(id) {
    document.getElementById("edit").style.display = "block";
    console.log(id);

    let toDisplay = '';
    for (i in data) {
        if (data[i].uuid === id) {
            toDisplay = `            
            <center><h1>Edit ${data[i].name}</h1></center>
            <textarea id="review-edit">${data[i].review}</textarea>    
            <br>
            <button onclick="editAlbumReview('${data[i].uuid}')" class="green-button">Save Changes</button>
            <button onclick="deleteAlbum('${data[i].uuid}')" class="red-button">Delete</button>`
        } 
    }

    document.getElementById("edit").innerHTML = toDisplay;
}

// Function to Delete an Album by UUID
async function deleteAlbum(uuid) {
    try {
        const response = await fetch(`/clients/theo//deleteMusic/${uuid}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error deleting album:', errorData.error);
            return { success: false, error: errorData.error };
        }

        alert('Album deleted successfully');
        window.location.reload();
        return { success: true };
    } catch (error) {
        alert('Error deleting album:', error);
        return { success: false, error: 'Internal Server Error' };
    }
}

// Function to Edit the Review Property of an Album by UUID
async function editAlbumReview(uuid) {
    const newReview = document.getElementById('review-edit').value;
    try {
        const response = await fetch(`/clients/theo//editReview/${uuid}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ review: newReview }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error updating review:', errorData.error);
            return { success: false, error: errorData.error };
        }

        alert('Review updated successfully');
        window.location.reload();
        return { success: true };
    } catch (error) {
        alert('Error updating review:', error);
        return { success: false, error: 'Internal Server Error' };
    }
}


getMusic()