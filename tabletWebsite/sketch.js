let stage = 4
let classStage = new Stages();

function setup() {
  createCanvas(windowWidth-1, windowHeight-1);
  mqttConfigure('wss://mqtt.nextservices.dk');
}

function draw() {
 background(220);


  // Du er velkommen til at beholde det gamle, hvis du foretrækker det
  if (stage && stage < 7 && stage > 0) {
  classStage[`stage${stage}`]();
  } else {
    classStage.defaultStage();
  }
  
  /*switch (stage) {
    case 1:
      classStage.stage1();
      break;
    case 2:
      classStage.stage2();
      break;
    case 3:
      classStage.stage3();
      break;
    case 4:
      classStage.stage4();
      break;
    case 5:
      classStage.stage5();
      break;
    case 6:
      classStage.stage6();
      break;
    default:
      classStage.defaultStage();
      break;
    
  }*/

  // For debugging
  fill(0);
  textAlign(LEFT);
  textSize(20);
  text(`Stage: ${stage}`, 10, 20);
}

function touchStarted() { // Denne funktion bruger vi til alt der har noget at gøre med at man rør skærmen
  console.log("Just ran touchStarted")

  // Denne del er til at gå videre til næste stage, på de stager vi vil have det er muligt på
    if (
      stage === 1 ||
      stage === 2 ||
      stage === 4 ||
      stage === 5
    ) {
        stage++; // Går videre til næste stage
    }
    // event.preventDefault(); Alternativ metode til at forhindre standard touch-adfærd
    return false; // Forhindrer standard touch-adfærd (Som scroll, zoom, klik og markering osv.)
}

function mqttConfigure(address) {
  var client = mqtt.connect(address);

  client.on('connect', function(s) {
    console.log(`${s} Connected successfully to MQTT broker`)
  })
}