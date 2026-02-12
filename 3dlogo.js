let obj;
let rotX = 0; // Rotation around the X-axis
let rotY = 0; // Rotation around the Y-axis
let textureImg;

// Disable p5.js friendly errors to avoid beforeunload warnings on mobile
p5.disableFriendlyErrors = true;

function preload() { 
  obj = loadModel('./models/techlogo.obj', true);
  textureImg = loadImage('./Img/3dbg.jpg');

} 

function getViewport() {
  return {
    w: window.visualViewport.width,
    h: window.visualViewport.height
  };
}
  
function setup() { 

  requestAnimationFrame(() => {
  let vp = getViewport();
  createCanvas(vp.w, vp.h, WEBGL);
  });
 pixelDensity(.05);
 
}

  
function draw() {
  // Clear the canvas with transparency
  clear();

   /* Storing user's device details in a variable*/
  let details = navigator.userAgent;

  /* Creating a regular expression 
  containing some mobile devices keywords 
  to search it in details string*/
  let regexp = /android|iphone|kindle|ipad/i;


  /* Using test() method to search regexp in details
  it returns boolean value*/
  let isMobileDevice = regexp.test(details);

  if (isMobileDevice) {

      rotateX(-rotationX/2);
      rotateY(-rotationY);

      // Scale the model
  scale(2);
 
        rotateX(PI); // Rotate 90 degrees around the X-axis
 
  } else {
      // Map the cursor's position to rotation angles
  rotX = map(mouseY, 0, height, QUARTER_PI, -QUARTER_PI); // Map vertical movement to X-axis rotation
  rotY = map(mouseX, 0, width, -QUARTER_PI , QUARTER_PI ); // Map horizontal movement to Y-axis rotation

  // Apply the rotations
  rotateX(rotX);
  rotateY(rotY);

  scale(4);

  
  // Adjust the initial orientation to make the model parallel to the view
  rotateX(PI); // Rotate 90 degrees around the X-axis

  }

  texture(textureImg); //Apply the texture to the model
  noStroke();
  // Render the 3D model
  model(obj);

  
}

/*function deviceMoved() {

  setMoveThreshold(5);
  // Map acceleration along x axis to position along canvas width
  let x = map(accelerationY, 0, height, -TWO_PI, TWO_PI);

  // Map acceleration along y axis to position along canvas height
  let y = map(accelerationX, 0, width, TWO_PI , -TWO_PI );


  // Use alpha value to fade out previously drawn circles
  rotateX(x);
  rotateY(y);
}*/

function touchMoved() {
  // Only prevent default on canvas, allow normal behavior elsewhere
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    return false;  // Block touch on canvas
  }
  return true;  // Allow touch elsewhere
}

function windowResized() {
  // Resize the canvas when the window is resized
  let vp = getViewport();
  resizeCanvas(vp.w, vp.h);
}