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
        const code = message.split(":")[0].toLowerCase();
        if (code === "32") {
            chessboard.callback();
            chessboard = null;
            return;
        } else {
            const hintCodes = ["26", "13", "25", "27", "4", "5", "14", "22"];
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
    } else if (chessboard && chessboard.scenario === 2) {
        console.log("Scenario 2")
        // Scenario 2: Pattern formed after moving pieces
        // FUNCTIONALITY HERE
    } else if (chessboard && chessboard.scenario === 3) {
        console.log("Scenario 3")
        // Scenario 3: Return magnet
        const code = message.split(":")[0].toLowerCase();
        if (code === "27") {
            chessboard.callback();
            chessboard = null;
            return;
        } else {
            const hintCodes = ["26", "13", "25", "32", "4", "5", "14", "22"];
            if (hintCodes.includes(code)) {
                if (hintCounter < 3) {
                    console.log("Incrementing hint counter");
                    hintCounter++;
                } else {
                    alert("Hint: Du startede på f8 (det kunne du måske godt huske)");
                    console.log("Hint: Du startede på f8 (det kunne du måske godt huske)");
                    hintCounter = 0;
                }
            }
        }
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
        chessboard.sensorsTriggered = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
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