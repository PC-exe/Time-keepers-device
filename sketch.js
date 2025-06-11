let imgRadio
let videos = [];
let currentChannel = 0;
let totalChannels = 3; // Number of videos available
let currentVideo = 0;  // Index of the currently playing video
let buttons = {
  up: null,
  down: null
};

function preload() {
  imgRadio = loadImage("time keeper image.jpg");
  videos.push(createVideo(['video1.mp4']));
  videos.push(createVideo(['video2.mp4']));
  videos.push(createVideo(['video3.mp4']));
}

function setup() {
  createCanvas(1250, 650);

  // Hide the video elements and set them to autoplay when triggered
  for (let i = 0; i < videos.length; i++) {
    videos[i].hide();
    videos[i].onended(nextVideo); // Call nextVideo when a video ends
  }
  
  // Start playing the first video
  playVideo(currentVideo);
  
   buttons.up = createButton('Channel Up');
  buttons.up.position(870, 520);
  buttons.up.mousePressed(channelUp);
  
  buttons.down = createButton('Channel Down');
  buttons.down.position(980, 520);
  buttons.down.mousePressed(channelDown);
  
  // Play the first video on load
  switchChannel(0);
}

function draw() {
  background(0);
  imageMode(CENTER);
  image(imgRadio, width/2, height/2, width, height);
  
  textSize(32);
  fill(50);
  textAlign(CENTER);
  text("Radio Channel: " + (currentChannel + 1), width / 2, height - 130);
}

// Function to handle channel up
function channelUp() {
  let nextChannel = (currentChannel + 1) % totalChannels;
  switchChannel(nextChannel);
  print(nextChannel)
}

// Function to handle channel down
function channelDown() {
  let prevChannel = (currentChannel - 1 + totalChannels) % totalChannels;
  switchChannel(prevChannel);
  print(prevChannel)
}

// Switches the channel and plays the correct video
function switchChannel(channel) {
  // Stop the current video and hide it
  videos[currentChannel].stop();
  videos[currentChannel].hide();
  
  // Update the current channel
  currentChannel = channel;
  
  // Play the new video
  videos[currentChannel].show();
  videos[currentChannel].size(500, 500); // Adjust size if needed
  videos[currentChannel].position(130, 50); // Adjust position if needed
  videos[currentChannel].loop();
  
  
  // Display the current video
  image(videos[currentVideo], 100, 100, width, height);
}

function playVideo(index) {
  // Play the video at the given index
  videos[index].play();
}

function nextVideo() {
  // Stop the current video
  videos[currentVideo].stop();
  
  // Move to the next video, and loop back to the first one if at the end
  currentVideo = (currentVideo + 1) % videos.length;
  
  // Play the next video
  playVideo(currentVideo);
}