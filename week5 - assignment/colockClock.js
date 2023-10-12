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
        background.src = "https://i.gifer.com/origin/e4/e4166608e9fdb3568cae07ccfb8e0d85_w200.webp";
        break;
      case 6:
        document.body.style.backgroundColor = "rgb(148, 39, 9)";
        background.src = "https://i.gifer.com/52O8.gif";
        break;
      case 7:
      case 8:
      case 9:
      case 10:
      case 11:
      case 12:
        document.body.style.backgroundColor = "rgb(188, 242, 245)";
        background.src = "https://media1.giphy.com/media/HQp9pMIlKV6zQiBlBi/giphy.gif";
        break;
      case 13:
      case 14:
      case 15:
        document.body.style.backgroundColor = "rgb(166, 224, 255)";
        background.src = "https://i.gifer.com/6G6e.gif";
        break;
      case 16:
      case 17:
        document.body.style.backgroundColor = "rgb(135, 186, 237)";
        background.src = "https://i.gifer.com/origin/cd/cd44334923c5a5d94e7cf4ab8f5f2f7f_w200.webp";
        break;
      case 18:
        document.body.style.backgroundColor = "rgb(235, 94, 23)";
        background.src = "https://64.media.tumblr.com/bbb174112861345719c5ed344ca3ddd7/tumblr_n20p8qxyf91t6rnioo1_500.gifv";
        break;
      case 19:
      case 20:
      case 21:
        document.body.style.backgroundColor = "rgb(44, 72, 143)";
        background.src = "https://i.gifer.com/7Sq0.gif";
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
  setInterval(updateBackground, 4500);
  
  // Initial call to set the initial background and time
  updateBackground();
  
  