class Stages{

    constructor(){
        this.rigtigForkertTekst = ""
        this.tekstColor = [0,0,0]
        this.timeOut = false

        //Laver et input felt 
        this.inputFelt = createInput();
        this.inputFelt.position(width / 2 - 100, height / 2 + 150); // Adjust position
        this.inputFelt.hide()
        //Laver submit knap
        this.submitButton = createButton("Bekræft svar");
        this.submitButton.mousePressed(() => this.checkAnswer());
        this.submitButton.position(width / 2 - 50, height / 2 + 180);
        this.submitButton.hide()
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

    pressNextStage(offset){
        textSize(20);
        text(`"Tryk på skærmen for at komme videre"`, width/2, height/2 + offset);
    }

    defaultStage(){
        fill(100)
        rectMode(CORNER);
        rect(0,0, width, height);

        fill(0)
        textAlign(CENTER);
        textSize(30)
        text("Det her er default stage. Når det stage er på, en der ikke findes.", width/2, height/2);
    }

    stage1(){ //Beskrivelse: Start side når delatgerne kommer ind i rummet.
        this.drawBackBox(0,255,0)

        textAlign(CENTER);
        fill(0);
        textSize(50);
        textFont("Xolonium");
        text("Tårnets Hemmelighed", width/2, height/2);

        this.pressNextStage(50)
    }

    stage2(){ //Beskrivelse: Tekst side til at introducere escape roomet
        this.drawBackBox(255,165,0)

        textAlign(CENTER);
        fill(0);
        textSize(50);
        textFont("Xolonium");
        text("Den, der løser Tårnets fire prøver, vil kende sandheden og åbne det, som aldrig burde åbnes.", width/2, height/2, width-110);

        this.pressNextStage(150)
    }

    stage3(){ //Beskrivelse: Hint til gåde 1. Plus når deltagerne løser gåde 1, så går den videre til næste stage
        this.drawBackBox(227,85,232)

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

        this.pressNextStage(100)
    }

    stage5(){
        this.drawBackBox(255,165,0)

        textAlign(CENTER);
        fill(0);
        textSize(50);
        textFont("Xolonium");
        text("Løsningen til næste gåde ligger i at vide hvordan brikkerne rykker sig.", width/2, height/2,width-110);

        this.pressNextStage(150)
    }

    stage6(){
        this.drawBackBox(227,85,232)

        textAlign(CENTER);
        fill(0);
        textSize(50);
        textFont("Xolonium");
        text("Kan du bevæge dig som den brik du lige har rykket? *Her* ville være et godt sted og starte.", width/2, height/2,width-110);

        textSize(20)
        textFont("Arial")
        fill(this.tekstColor[0],this.tekstColor[1],this.tekstColor[2])
        text(this.rigtigForkertTekst,width/2,height-100)

        
            this.inputFelt.show()
            this.inputFelt.position(width / 2 - 100, height / 2 + 150); // Adjust position
            this.inputFelt.size(200); // Set size of the input field
            this.inputFelt.attribute("placeholder", "Skriv dit svar her"); // Add placeholder text
        
       
        if(!this.timeOut){
            this.submitButton.show()
            this.submitButton.position(width / 2 - 50, height / 2 + 180);
            this.inputFelt.value('')
        }
    }

    stage7(){
        this.drawBackBox(0,255,0)

        textAlign(CENTER);
        fill(0);
        textSize(50);
        textFont("Xolonium");
        text("Godt klaret! Talene 275 var rigtigt.", width/2, height/2,width-110);

        this.pressNextStage(100)
    }

    stage8(){
        this.drawBackBox(255,165,0)

        textAlign(CENTER);
        fill(0);
        textSize(50);
        textFont("Xolonium");
        text("HUSK talene til næste gåde, det er summen!", width/2, height/2,width-110);

        this.pressNextStage(100)
    }

    stage9(){
        this.drawBackBox(227,85,232)

        textAlign(CENTER);
        fill(0);
        textSize(50);
        textFont("Xolonium");
        text("Kan du finde x?", width/2, height/6,width-110);

        textFont("Arial")
        textSize(20)
        textAlign(LEFT)
        text("y = x + 25",width/2,height/2-80)
        text("t = 5x - 10",width/2,height/2-60)
        text("g = 4x", width/2,height/2-40)
        text("j = 165 - 2/x",width/2,height/2-20)

        text("y + t + g + j = Summen",width/2,height/2+20)

        textSize(20)
        textFont("Arial")
        fill(this.tekstColor[0],this.tekstColor[1],this.tekstColor[2])
        text(this.rigtigForkertTekst,width/2,height-100)

            this.inputFelt.show()
            this.inputFelt.position(width / 2 - 100, height / 2 + 150); // Adjust position
            this.inputFelt.size(30); // Set size of the input field
            this.inputFelt.attribute("placeholder", "x"); // Add placeholder text
            
       
        if(!this.timeOut){
            this.submitButton.show()
            this.submitButton.position(width / 2 - 50, height / 2 + 180);
            this.inputFelt.value('')
        }
    }


    checkAnswer() {
        const userAnswer = this.inputFelt.value();
        console.log("Brugerens svar:", userAnswer);

        //Stage 6 (Gåde 2)
        if (userAnswer === "275" && stage === 6) { // === korrekt svar
            console.log("Rigtigt svar!");
            this.tekstColor = [0,255,0]
            this.rigtigForkertTekst = "Rigtigt svar!"
            tegn()
            this.submitButton.hide()
            if(this.timeOut == false){
            this.timeOut = setTimeout(() => {
                this.inputFelt.hide();
                this.rigtigForkertTekst = ""
                this.timeOut = false;
                stage++;
                tegn()
            }, 3000);
        }
        } else if(stage === 6){
            console.log("Forkert svar, prøv igen.");
            this.tekstColor = [255,0,0]
            this.rigtigForkertTekst = "Forkert svar, prøv igen."
            tegn()
            this.submitButton.hide()
            if(this.timeOut == false){
            this.timeOut = setTimeout(() => {
                this.rigtigForkertTekst = "";
                this.timeOut = false;
                this.submitButton.show()
                tegn()
            }, 3000);
            }
        }


        //Stage 9 (Gåde 3)
        if (userAnswer === "10" && stage === 9) { // === korrekt svar
            console.log("Rigtigt svar!");
            this.tekstColor = [0,255,0]
            this.rigtigForkertTekst = "Rigtigt svar!"
            tegn()
            this.submitButton.hide()
            if(this.timeOut == false){
            this.timeOut = setTimeout(() => {
                this.inputFelt.hide();
                this.rigtigForkertTekst = ""
                this.timeOut = false;
                stage++;
                tegn()
            }, 3000);
        }
        } else if(stage === 9){
            console.log("Forkert svar, prøv igen.");
            this.tekstColor = [255,0,0]
            this.rigtigForkertTekst = "Forkert svar, prøv igen."
            tegn()
            this.submitButton.hide()
            if(this.timeOut == false){
            this.timeOut = setTimeout(() => {
                this.rigtigForkertTekst = "";
                this.timeOut = false;
                this.submitButton.show()
                tegn()
            }, 3000);
            }
        }
    }
}