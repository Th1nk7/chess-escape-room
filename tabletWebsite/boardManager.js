var client = mqtt.connect('wss://mqtt.nextservices.dk/');
let chessboard = null;

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
    message = message.toString();
    console.log("Message received: ", message);
    if (chessboard && chessboard.scenario === 1) {
        // Scenario 1: Checkmate in 1 move
        // FUNCTIONLITY HERE
    } else if (chessboard && chessboard.scenario === 2) {
        // Scenario 2: Pattern formed after moving pieces
        // FUNCTIONLITY HERE
    } 
});

function initChessboard(scenario, callback) {
    if (typeof scenario !== 'number' || typeof callback !== 'function') {
        alert('Invalid scenario or callback');
        throw new TypeError('Invalid scenario or callback');
    } else if (scenario < 1 || scenario > 2) {
        alert('Invalid scenario number');
        throw new RangeError('Invalid scenario number');
    }

    if (scenario === 1) {
        chessboard = null;
        chessboard.callback = callback;
        chessboard.scenario = 1;
        return;
    } else if (scenario === 2){
        chessboard = null;
        chessboard.callback = callback;
        chessboard.scenario = 2;
        chessboard.sensorsTriggered = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        return;
    } else {
        alert('Achivement unlocked: How did we get here?');
        throw new Error('Invalid... something? Yes, something went wrong');
    }

}