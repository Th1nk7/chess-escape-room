var client = mqtt.connect('wss://mqtt.nextservices.dk/');
let chessboard = null;
let hintCounter = 0;

// Mapping from sensor code to board position
const codeToSquare = {
    '32': 'a8',
    '33': 'c8',
    '13': 'c5',
    '26': 'a5',
    '4':  'a2',
    '5':  'c2',
    '14': 'f2',
    '22': 'h2',
    '27': 'h5',
    '25': 'f5',
    '15': 'f8',
    '23': 'h8'
};

function isRookMove(from, to) {
    // Rook moves only if file or rank is the same
    return from[0] === to[0] || from[1] === to[1];
}

function addResetButton() {
    let btn = document.getElementById('reset-chessboard');
    if (!btn) {
        btn = document.createElement('button');
        btn.id = 'reset-chessboard';
        btn.textContent = 'Reset Puzzle';
        btn.style.position = 'absolute';
        btn.style.top = '10px';
        btn.style.right = '10px';
        btn.onclick = function() {
            if (chessboard && chessboard.scenario === 2) {
                // Reset board to only rook on a8
                chessboard.board.position = { a8: 'wr' };
                chessboard.board.renderBoard();
                chessboard.lastPos = 'a8';
                // Remove all trails
                chessboard.trail = ['a8'];
            }
        };
        document.body.appendChild(btn);
    }
}

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
    } else if (chessboard && chessboard.scenario === 2) {
        console.log("Scenario 2")
        let code = message.split(":")[0].toLowerCase();
        let square = codeToSquare[code];
        if (!square) return;
        let from = chessboard.lastPos;
        let to = square;
        if (isRookMove(from, to)) {
            // Draw trail only if move is valid
            if (!chessboard.trail) chessboard.trail = [from];
            if (!chessboard.trail.includes(to)) chessboard.trail.push(to);
            // Move rook
            chessboard.board.movePiece(from, to);
            chessboard.lastPos = to;
            // Highlight trail
            chessboard.board.clearHighlights();
            for (let sq of chessboard.trail) {
                let el = document.getElementById(sq);
                if (el) el.style.backgroundColor = 'red';
            }
        }
        // else: ignore diagonal move, do not color
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
        chessboard.nextSensor = [32,33,13,26,4,5,14,22,27,25,15,23];
        document.getElementById("chessboard").hidden = false;
        chessboard.board = new ChessBoard('chessboard', { a8: 'wr' });
        chessboard.lastPos = "a8";
        chessboard.trail = ['a8'];
        addResetButton();
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