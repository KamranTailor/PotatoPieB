setTimeout(() => {
    if (cps.content && cps.content.properties && cps.content.permissions) {
        console.log(cps);
        if (cps.content.properties.theoMusicAdmin) {
            if (cps.content.properties.theoMusicAdmin === true) {
                console.log('User is authorised for Theo Music Admin');
            } else {
                alert('You are not authorised for Theo Music Admin');
                window.location = "../";
            }
        } else {
            alert('You are not authorised for Theo Music Admin');
            window.location = "../";
        }
    } else {
        alert("You are not authorised for Theo Music Admin");
        window.location = "../";
    }
}, 500);
