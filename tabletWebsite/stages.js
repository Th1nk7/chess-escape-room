class Stages{

    constructor(){
        this.rigtigForkertTekst = ""
        this.tekstColor = color(0,0,0)
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
        textFont("Petit Formal Script");
        text("Tårnets Hemmelighed", width/2, height/2);

        textFont("Times new roman")
        this.pressNextStage(50)
    }

    stage2(){ //Beskrivelse: Tekst side til at introducere escape roomet
        this.drawBackBox(255,165,0)

        textAlign(CENTER);
        fill(0);
        textSize(50);
        textFont("Petit Formal Script");
        text("Den, der løser Tårnets fire prøver, vil kende sandheden og åbne det, der aldrig bør åbnes.", width/2, height/2-100, width-110);
        
        textFont("Times new roman")
        this.pressNextStage(150)
    }

    stage3(){ // GÅDE 1
        this.drawBackBox(227,85,232)

        textAlign(CENTER);
        fill(0);
        textSize(50);
        textFont("Petit Formal Script");
        text("Nu er rummet til rådighed. Vis dit værd, og lav skakmat.", width/2, height/2-100,width-110);

        
        initChessboard(1, () => {
            stage = 4;
            tegn();
        });
    }

    stage4(){
        this.drawBackBox(0,255,0)

        textAlign(CENTER);
        fill(0);
        textSize(50);
        textFont("Petit Formal Script");
        text("Godt klaret! I har løst gåden!", width/2, height/2,width-110);

        textFont("Times new roman")
        this.pressNextStage(100)
    }

    stage5(){
        this.drawBackBox(255,165,0)

        textAlign(CENTER);
        fill(0);
        textSize(50);
        textFont("Petit Formal Script");
        text("Løsningen til den næste gåde kræver viden om, hvordan brikkerne rykker sig.", width/2, height/2,width-110);

        textFont("Times new roman")
        this.pressNextStage(150)
    }

    stage6(){ // GÅDE 2
        this.drawBackBox(227,85,232)

        textAlign(CENTER);
        fill(0);
        textSize(50);
        textFont("Petit Formal Script");
        text("Kan du bevæge dig som den brik du lige har rykket? Hjørnet med sikringsskabet ville være et godt sted at starte.", width/2, height/2-50,width-110);
        textSize(20);
        textFont("Arial");
        fill(this.tekstColor);
        text(this.rigtigForkertTekst,width/2,height-100);


        if(!this.timeOut){

            this.inputFelt.show()
            this.inputFelt.position(width / 2 - 100, height-80); // Adjust position
            this.inputFelt.size(200); // Set size of the input field
            this.inputFelt.attribute("placeholder", "Skriv dit svar her"); // Add placeholder text

            this.submitButton.show()
            this.submitButton.position(width / 2 - 50, height-40);
            this.inputFelt.value('')
        }
    }

    stage7(){
        this.drawBackBox(0,255,0)

        textAlign(CENTER);
        fill(0);
        textSize(50);
        textFont("Petit Formal Script");
        text("Godt klaret! Tallet 275 var rigtigt.", width/2, height/2,width-110);

        textFont("Times new roman")
        this.pressNextStage(100)
    }

    stage8(){
        this.drawBackBox(255,165,0)

        textAlign(CENTER);
        fill(0);
        textSize(50);
        textFont("Petit Formal Script");
        text("HUSK tallet til næste gåde, det er summen!", width/2, height/2-50,width-110);

        textFont("Times new roman")
        this.pressNextStage(100)
    }

    stage9(){ // GÅDE 3
        this.drawBackBox(227,85,232)

        textAlign(CENTER);
        fill(0);
        textSize(50);
        textFont("Petit Formal Script");
        text("Kan du finde x?", width/2, height/6,width-110);

        textFont("Arial")
        textSize(20)
        textAlign(LEFT)
        text("y = x + 25",width/2,height/2-80)
        text("t = 5x - 10",width/2,height/2-60)
        text("g = 4x", width/2,height/2-40)
        text("j = 165 - 2/x",width/2,height/2-20)

        text("y + t + g + j = Summen",width/2,height/2+20)

        text("x =",width/2-35,height/2+166)

        textSize(20)
        textFont("Arial")
        fill(this.tekstColor)
        text(this.rigtigForkertTekst,width/2,height-100)

            
            
       
        if(!this.timeOut){
            this.inputFelt.show()
            this.inputFelt.position(width / 2, height-80); // Adjust position
            this.inputFelt.size(30); // Set size of the input field
            this.inputFelt.attribute("placeholder", "?"); // Add placeholder text

            this.submitButton.show()
            this.submitButton.position(width / 2 - 50, height-40);
            this.inputFelt.value('')
        }
    }

    stage10(){
        this.drawBackBox(0,255,0)

        textAlign(CENTER);
        fill(0);
        textSize(50);
        textFont("Petit Formal Script");
        text("Godt klaret! Ja x var 10", width/2, height/2,width-110);

        textFont("Times new roman")
        this.pressNextStage(100)
    }

    stage11(){
        this.drawBackBox(255,165,0)

        textAlign(CENTER);
        fill(0);
        textSize(50);
        textFont("Petit Formal Script");
        text("Er du klar til at opklare mysteriet om Tårnets Hemmelighed?", width/2, height/2,width-110);

        textFont("Times new roman")
        this.pressNextStage(140)
    }

    stage12(){ // GÅDE 4
        this.drawBackBox(227,85,232)

        textAlign(CENTER);
        fill(0);
        textSize(30);
        textFont("Petit Formal Script");
        text("Kan du følge mønsteret? Brug det fysiske board", width/2, height/8,width-110);
        textFont("Arial")
        textSize(20)
        textAlign(LEFT)
        text("Følg følgende felter med dit Tårn:\nStart: a8\n.        c8\n.        c5\n.        a5\n.        a2\n.        c2\n.        f2\n.        h2\n.        h5\n.        f5\n.        f8\nSlut: h8", width/2, height/2-50,width-110);

        initChessboard(2, () => {
            stage = 13;
            tegn();
        });

        if(!this.timeOut){
            this.inputFelt.show()
            this.inputFelt.position(width / 2- 50, height-80); // Adjust position
            this.inputFelt.size(60); // Set size of the input field
            this.inputFelt.attribute("placeholder", "Mønster"); // Add placeholder text

            this.submitButton.show()
            this.submitButton.position(width / 2 - 50, height-40);
            this.inputFelt.value('')
        }

    }

    stage13(){
        this.drawBackBox(0,255,0)

        textAlign(CENTER);
        fill(0);
        textSize(50);
        textFont("Petit Formal Script");
        text("Godt klaret! Du fandt talene gemt i mønsteret!", width/2, height/2-50,width-110);

        textFont("Times new roman")
        this.pressNextStage(100)
    }

    stage14(){
        this.drawBackBox(255,160,0)

        textAlign(CENTER);
        fill(0);
        textSize(50);
        textFont("Petit Formal Script");
        text("Tårnets hemmelig er dens alder, som du fandt. 27", width/2, height/2-50,width-110);
        
        textFont("Times new roman")
        this.pressNextStage(100)
    }

    stage15(){
        this.drawBackBox(227,85,232)

        textAlign(CENTER);
        fill(0);
        textSize(50);
        textFont("Petit Formal Script");
        text("Nu skal brikken hjem igen, ryk den venligst tilbage til startpositionen", width/2, height/2,width-110);
        initChessboard(3,() => {stage = 16; tegn();});
    }

    stage16(){
        this.drawBackBox(0,255,0)

        textAlign(CENTER);
        fill(0);
        textSize(50);
        textFont("Petit Formal Script");
        text("Escape Room Løst!", width/2, height/2,width-110);
    }


    checkAnswer() {
        const userAnswer = this.inputFelt.value();
        console.log("Brugerens svar:", userAnswer);

        //Stage 6 (Gåde 2)
        if (userAnswer === "275" && stage === 6) { // === korrekt svar
            console.log("Rigtigt svar!");
            this.tekstColor = color(0,255,0);
            this.rigtigForkertTekst = "Rigtigt svar!";
            tegn();
            textAlign(CENTER);
            this.submitButton.hide();
            this.inputFelt.hide();
            if(this.timeOut == false){
            this.timeOut = setTimeout(() => {
                this.rigtigForkertTekst = ""
                this.timeOut = false;
                stage = 7;
                tegn();
            }, 3000);
        }
        } else if(stage === 6){
            console.log("Forkert svar, prøv igen.");
            this.tekstColor = color(255,0,0);
            this.rigtigForkertTekst = "Forkert svar, prøv igen.";
            tegn();
            textAlign(CENTER);
            this.submitButton.hide();
            this.inputFelt.hide();
            if(this.timeOut == false){
            this.timeOut = setTimeout(() => {
                this.rigtigForkertTekst = "";
                this.timeOut = false;
                this.submitButton.show();
                this.inputFelt.show();
                tegn();
            }, 3000);
            }
        }


        //Stage 9 (Gåde 3)
        if (userAnswer === "10" && stage === 9) { // === korrekt svar
            console.log("Rigtigt svar!");
            this.tekstColor = color(0,255,0);
            this.rigtigForkertTekst = "Rigtigt svar!";
            tegn();
            textAlign(CENTER);
            this.submitButton.hide();
            this.inputFelt.hide();
            if(this.timeOut == false){
            this.timeOut = setTimeout(() => {
                this.rigtigForkertTekst = ""
                this.timeOut = false;
                stage = 10;
                tegn();
            }, 3000);
        }
        } else if(stage === 9){
            console.log("Forkert svar, prøv igen.");
            this.tekstColor = color(255,0,0);
            this.rigtigForkertTekst = "Forkert svar, prøv igen.";
            tegn();
            textAlign(CENTER);
            this.submitButton.hide();
            this.inputFelt.hide();
            if(this.timeOut == false){
            this.timeOut = setTimeout(() => {
                this.rigtigForkertTekst = "";
                this.timeOut = false;
                this.submitButton.show();
                this.inputFelt.show();
                tegn();
            }, 3000);
            }
        }
    

    //Stage 12 (Gåde 4)
        if (userAnswer === "25" && stage === 12) { // === korrekt svar
            console.log("Rigtigt svar!");
            this.tekstColor = color(0,255,0);
            this.rigtigForkertTekst = "Rigtigt svar!";
            tegn();
            textAlign(CENTER);
            this.submitButton.hide();
            this.inputFelt.hide();
            if(this.timeOut == false){
            this.timeOut = setTimeout(() => {
                this.rigtigForkertTekst = ""
                this.timeOut = false;
                stage = 13;
                document.getElementById("chessboard").remove();
                tegn();

            }, 3000);
        }
        } else if(stage === 12){
            console.log("Forkert svar, prøv igen.");
            this.tekstColor = color(255,0,0);
            this.rigtigForkertTekst = "Forkert svar, prøv igen.";
            tegn();
            textAlign(CENTER);
            this.submitButton.hide();
            this.inputFelt.hide();
            if(this.timeOut == false){
            this.timeOut = setTimeout(() => {
                this.rigtigForkertTekst = "";
                this.timeOut = false;
                this.submitButton.show();
                this.inputFelt.show();
                tegn();
            }, 3000);
            }
        }
    }
}