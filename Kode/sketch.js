let stage = 1;
let classStage = new Stages();

function setup() {
  createCanvas(windowWidth-1, windowHeight-1);
}

function draw() {
 background(220);

  switch (stage) {
    case 1:
      classStage.stage1();
      break;
    case 2:
      classStage.stage2();
      break;
    case 3:
      classStage.stage3();
      break;
    default:
      classStage.defaultStage();
      break;
  }

  // For debugging
  fill(0);
  textAlign(LEFT);
  textSize(20);
  text("Stage: " + stage, 10, 20);
}

function touchStarted() { // Denne funktion bruger vi til alt der har noget at gøre med at man rør skærmen
  console.log("Just ran touchStarted")

  // Denne del er til at gå videre til næste stage, på de stager vi vil have det er muligt på
    if (stage === 1) { // Stage 1
        stage++; // Går videre til næste stage
    } 
    else if (stage === 2) { // Stage 2
        stage++; 
    } //add alle andre som også skal have det, her

    return false; // Forhindrer standard touch-adfærd (Som scroll, zoom, klik og markering osv.)
}