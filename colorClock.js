function updateBackground() {
    const now = new Date();
    const hour = now.getHours();
    const background = document.getElementById("background-image");

    // Update background color based on the hour
    switch (hour) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 22:
        case 23:
            document.body.style.backgroundColor = "rgb(13, 20, 33)";
            background.style.display = "none";
            break;
        case 6:
            document.body.style.backgroundColor = "rgb(148, 39, 9)";
            background.style.display = "none";
            break;
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
        case 12:
            document.body.style.backgroundColor = "rgb(188, 242, 245)";
            background.style.display = "none";
            break;
        case 13:
        case 14:
        case 15:
            document.body.style.backgroundColor = "rgb(166, 224, 255)";
            background.style.display = "none";
            break;
        case 16:
        case 17:
            document.body.style.backgroundColor = "rgb(135, 186, 237)";
            background.style.display = "none";
            break;
        case 18:
            document.body.style.backgroundColor = "rgb(235, 94, 23)";
            background.style.display = "none";
            break;
        case 19:
            document.body.style.backgroundColor = "rgb(235, 69, 23)";
            background.style.display = "none";
            break;
        case 20:
        case 21:
            document.body.style.backgroundColor = "rgb(44, 72, 143)";
            background.style.display = "none";
            break;
        default:
            document.body.style.backgroundColor = "white";
            background.style.display = "block";
    }

    // Update real-time and date
    const timeElement = document.getElementById("time");
    const dateElement = document.getElementById("date");
    const timeString = now.toLocaleTimeString();
    const dateString = now.toDateString();
    timeElement.textContent = timeString;
    dateElement.textContent = dateString;
}

// Update the background and time every second
setInterval(updateBackground, 1000);

// Initial call to set the initial background and time
updateBackground();