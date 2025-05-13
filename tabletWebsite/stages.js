class Stages{

    constructor(){
    }

    

    defaultStage(){
        fill(100)
        rectMode(CORNER);
        rect(0,0, width, height);

        fill(0)
        textAlign(CENTER);
        text("Det her er default stage. Når stage er på en der ikke findes.", width/2, height/2);
    }

    stage1(){ //Beskrivelse: Start side når delatgerne kommer ind i rummet.
        fill(0, 255, 0);
        rectMode(CENTER);
        rect(width/2,height/2, width-100, height-100);

        textAlign(CENTER);
        fill(0);
        textSize(50);
        textFont("Xolonium");
        text("Tårnets Hemmelighed", width/2, height/2);

        textSize(20);
        text(`"Tryk på skærmen for at komme videre"`, width/2, height/2 + 50);

        // For det er muligt at trykke på skærmen for at komme videre
        if(keyIsPressed){
            this.clickToProseedToggle();
        }
    }

    stage2(){ //Beskrivelse: Tekst side til at introducere escape roomet
        fill(255,165,0);
        rectMode(CENTER);
        rect(width/2,height/2, width-100, height-100);

        textAlign(CENTER);
        fill(0);
        textSize(50);
        textFont("Xolonium");
        text("Den, der løser Tårnets fire prøver, vil kende sandheden og åbne det, som aldrig burde åbnes.", width/2, height/2, width-110);

        textSize(20);
        text(`"Tryk på skærmen for at komme videre"`, width/2, height/2 + 150);
    }

    stage3(){ //Beskrivelse: Hint til gåde 1. Plus når deltagerne løser gåde 1, så går den videre til næste stage
        fill(255,165,0);
        rectMode(CENTER);
        rect(width/2,height/2, width-100, height-100);

        textAlign(CENTER);
        fill(0);
        textSize(50);
        textFont("Xolonium");
        text("Kan du finde ud af Tårnets Hemmelighed?", width/2, height/2);


        //TOBI KIG her: Sørg her for den siger stage++ når gåde 1 er løst og sender mqtt ting


    }
}