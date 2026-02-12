function randVideo() {
    // Generate random number
    var number = Math.floor(Math.random() * 5) + 1;
    var mySrc = "./Img/Video/" + number + ".mp4";

    // Get container
    var container = document.getElementById("myVideoTag");

    // Clear previous video (important!)
    container.innerHTML = "";

    // Create new video element
    var tmpElement = document.createElement("video");
    tmpElement.setAttribute("autoplay", true);
    tmpElement.setAttribute("loop", true);
    tmpElement.setAttribute("src", mySrc);
    tmpElement.style.width = "100vw";
    tmpElement.style.height = "100vh";
    tmpElement.style.objectFit = "cover";
    tmpElement.style.position = "fixed";
    tmpElement.style.zIndex = "-1";

    

    // Append new video
    container.appendChild(tmpElement);

     
}

// Load a random video initially
randVideo();
// Play another random video every time the page is clicked
window.addEventListener("click", randVideo);