class Stages{

    constructor(){
        this.inputFelt
        this.submitButton
        this.rigtigForkertTekst = ""
        this.tekstColor = [0,0,0]
    }

    /*
    Background info:
    Grøn: Start eller løst
    Orange: Ren tekst
    Lilla: Gåde igang
    */

    drawBackBox(r,g,b){
        fill(r,g,b)
        rectMode(CENTER);
        rect(width/2,height/2, width-100, height-100);
    }

    defaultStage(){
        fill(100)
        rectMode(CORNER);
        rect(0,0, width, height);

        fill(0)
        textAlign(CENTER);
        textSize(30)
        text("Det her er default stage. Når det stage er på en der ikke findes.", width/2, height/2);
    }

    stage1(){ //Beskrivelse: Start side når delatgerne kommer ind i rummet.
        this.drawBackBox(0,255,0)

        textAlign(CENTER);
        fill(0);
        textSize(50);
        textFont("Xolonium");
        text("Tårnets Hemmelighed", width/2, height/2);

        textSize(20);
        text(`"Tryk på skærmen for at komme videre"`, width/2, height/2 + 50);

        // For det er muligt at trykke på skærmen for at komme videre
        if(keyIsPressed){
            this.clickToProceedToggle();
        }
    }

    stage2(){ //Beskrivelse: Tekst side til at introducere escape roomet
        this.drawBackBox(255,165,0)

        textAlign(CENTER);
        fill(0);
        textSize(50);
        textFont("Xolonium");
        text("Den, der løser Tårnets fire prøver, vil kende sandheden og åbne det, som aldrig burde åbnes.", width/2, height/2, width-110);

        textSize(20);
        text(`"Tryk på skærmen for at komme videre"`, width/2, height/2 + 150);
    }

    stage3(){ //Beskrivelse: Hint til gåde 1. Plus når deltagerne løser gåde 1, så går den videre til næste stage
        this.drawBackBox(70,0,130)

        textAlign(CENTER);
        fill(0);
        textSize(50);
        textFont("Xolonium");
        text("Nu er rummet tilrådighed. Vis dit hvær og lav skakmat.", width/2, height/2,width-110);

        

        //TOBI KIG her: Sørg her for den siger stage++ når gåde 1 er løst og sender mqtt ting


    }

    stage4(){
        this.drawBackBox(0,255,0)

        textAlign(CENTER);
        fill(0);
        textSize(50);
        textFont("Xolonium");
        text("Godt klaret! I har løst gåden!", width/2, height/2,width-110);

        textSize(20);
        text(`"Tryk på skærmen for at komme videre"`, width/2, height/2 + 100);
    }

    stage5(){
        this.drawBackBox(255,165,0)

        textAlign(CENTER);
        fill(0);
        textSize(50);
        textFont("Xolonium");
        text("Løsningen til næste gåde ligger i at vide hvordan brikkerne rykker sig.", width/2, height/2,width-110);

        textSize(20);
        text(`"Tryk på skærmen for at komme videre"`, width/2, height/2 + 150);
    }

    stage6(){
        this.drawBackBox(70,0,130)

        textAlign(CENTER);
        fill(0);
        textSize(50);
        textFont("Xolonium");
        text("Kan du bevæge dig som den brik du lige har rykket? *Her* ville være et godt sted og starte.", width/2, height/2,width-110);

        textSize(20)
        textFont("Arial")
        fill(this.tekstColor[0],this.tekstColor[1],this.tekstColor[2])
        text(this.rigtigForkertTekst,width/2,height-100)

        //Laver et input felt 
        if (!this.inputFelt) {
            this.inputFelt = createInput(); // p5.js function to create an input field
            this.inputFelt.position(width / 2 - 100, height / 2 + 150); // Adjust position
            this.inputFelt.size(200); // Set size of the input field
            this.inputFelt.attribute("placeholder", "Skriv dit svar her"); // Add placeholder text
        }

        //Laver submit knap
        if (!this.submitButton) {
            this.submitButton = createButton("Bekræft svar");
            this.submitButton.position(width / 2 - 50, height / 2 + 180);
            this.submitButton.mousePressed(() => this.checkAnswer());
        }
    }

    stage7(){
        this.drawBackBox(0,255,0)

        textAlign(CENTER);
        fill(0);
        textSize(50);
        textFont("Xolonium");
        text("Godt klaret!", width/2, height/2,width-110);

        textSize(20);
        text(`"Tryk på skærmen for at komme videre"`, width/2, height/2 + 100);
    }

    stage8(){
        this.drawBackBox(255,165,0)

        textAlign(CENTER);
        fill(0);
        textSize(50);
        textFont("Xolonium");
        text("Stage 8", width/2, height/2,width-110);
    }

    checkAnswer() {
        const userAnswer = this.inputFelt.value();
        console.log("Brugerens svar:", userAnswer);
        if (userAnswer === "123") { // === korrekt svar
            console.log("Rigtigt svar!");
            this.tekstColor = [0,255,0]
            this.rigtigForkertTekst = "Rigtigt"

            setTimeout(() => {stage++; this.submitButton.remove(); this.inputFelt.remove()}, 3000)
        } else {
            console.log("Forkert svar, prøv igen.");
            this.tekstColor = [255,0,0]
            this.rigtigForkertTekst = "Forkert"

            setTimeout(() => this.rigtigForkertTekst = "", 3000)
        }
    }
}