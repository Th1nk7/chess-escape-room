let stage = 1
let classStage

function setup() {
  createCanvas(windowWidth, windowHeight);
  classStage = new Stages();
  tegn();
  // Try to request fullscreen on initialization
  requestFullscreen();
}

// Handle window resize events
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  tegn(); // Redraw everything with the new canvas size
}

// Function to request fullscreen mode
function requestFullscreen() {
  if (!document.fullscreenElement) {
    const element = document.documentElement;
    
    if (element.requestFullscreen) {
      element.requestFullscreen().catch(err => {
        console.warn(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else if (element.webkitRequestFullscreen) { // Safari
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { // IE11
      element.msRequestFullscreen();
    }
  }
}

function tegn() {
  background(220);

  // Du er velkommen til at beholde det gamle, hvis du foretrækker det. Tak tobi, og nej
  if (stage && stage <= 16 && stage > 0) {
    classStage[`stage${stage}`]();
  } else {
    classStage.defaultStage();
  }

  // For debugging
  fill(0);
  textAlign(LEFT);
  textSize(20);
  text(`Stage: ${stage}`, 10, 20);
}

function touchStarted() { // Denne funktion bruger vi til alt der har noget at gøre med at man rør skærmen
  // Request fullscreen on touch if not already in fullscreen
  requestFullscreen();
  
  console.log("Just ran touchStarted")
  if (stage === 1) {
    
  }
  // Denne del er til at gå videre til næste stage, på de stages vi vil have det er muligt på
    if (
      stage === 1 ||
      stage === 2 ||
      stage === 4 ||
      stage === 5 ||
      stage === 7 ||
      stage === 8 ||
      stage === 10 ||
      stage === 11 ||
      stage === 13 ||
      stage === 14
    ) {
        stage++;
        tegn() // Går videre til næste stage
    }
    /*if(stage === 2){
      initChessboard(1,() => {console.log("Kage")})
    }*/
    // event.preventDefault(); Alternativ metode til at forhindre standard touch-adfærd
}
