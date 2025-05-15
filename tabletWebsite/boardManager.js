var client = mqtt.connect('wss://mqtt.nextservices.dk/');
let chessboard = null;
let hintCounter = 0;

client.on('connect', function () {
    console.log('connected');
    client.subscribe('chessEscaperoom', (err) => {
        if (err) {
            console.error('Subscription error:', err);
            alert('Subscription error: ' + err);
        } else {
            console.log('Successfully subscribed to chessEscaperoom');
        }
    });
});

client.on('message', function (topic, message) {
    if (topic !== 'chessEscaperoom') {
        return;
    }
    message = message.toString();
    console.log("Message received: " + message);
    if (chessboard && chessboard.scenario === 1) {
        console.log("Scenario 1")
        // Scenario 1: Checkmate in 1 move
        let code = message.split(":")[0].toLowerCase();
        if (code === "32") {
            chessboard.callback();
            chessboard = null;
            return;
        } else {
            let hintCodes = ["26", "13", "25", "27", "4", "5", "14", "22"];
            if (hintCodes.includes(code)) {
                if (hintCounter < 10) {
                    console.log("Incrementing hint counter");
                    hintCounter++;
                } else {
                    alert("Hint: Du startede på f8 (det kunne du måske godt huske)");
                    console.log("Hint: Du startede på f8 (det kunne du måske godt huske)");
                    hintCounter = 0;
                }
            }
        }
// const chessBoard = new ChessBoard('chessboard');
// chessBoard.movePiece('e2', 'e4');
// chessBoard.highlightFields('e2', 'e4', 'yellow');
// chessBoard.highlightFields('e7', 'e5', 'blue');
// chessBoard.clearHighlights();
    } else if (chessboard && chessboard.scenario === 2) {
        console.log("Scenario 2")
        // Scenario 2: Pattern formed after moving pieces
        let code = message.split(":")[0].toLowerCase();
        if (Number(code) === chessboard.nextSensor[0]) {
            chessboard.nextSensor.pop(chessboard.nextSensor[0]);
            if (chessboard.nextSensor.length === 0) {
                chessboard.callback();
                chessboard = null;
                return;
            }
        }

    } else if (chessboard && chessboard.scenario === 3) {
        console.log("Scenario 3")
        // Scenario 3: Return magnet
        
    }
});

function initChessboard(scenario, callback) {
    if (typeof scenario !== 'number' || typeof callback !== 'function') {
        alert('Invalid scenario or callback');
        throw new TypeError('Invalid scenario or callback');
    } else if (scenario < 1 || scenario > 3) {
        alert('Invalid scenario number');
        throw new RangeError('Invalid scenario number');
    }

    if (scenario === 1) {
        chessboard = Node;
        chessboard.callback = callback;
        chessboard.scenario = 1;
        return;
    } else if (scenario === 2){
        chessboard = Node;
        chessboard.callback = callback;
        chessboard.scenario = 2;
        chessboard.nextSensor = [32,33,13,26,4,5,14,22,27,25,15,23]
        document.getElementById("chessboard").hidden = false;
        chessboard.board = new ChessBoard('chessboard', { a8: 'wr' });
        
        return;
    } else if (scenario === 3){
        chessboard = Node;
        chessboard.callback = callback;
        chessboard.scenario = 3;
        return;
    } else {
        alert('Achivement unlocked: How did we get here?');
        throw new Error('Invalid... something? Yes, something went wrong');
    }

}