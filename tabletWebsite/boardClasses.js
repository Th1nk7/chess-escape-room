class ChessBoard {  constructor(boardElementId, initialPosition = null) {
    this.files = 'abcdefgh';
    this.ranks = '87654321';
    this.board = document.getElementById(boardElementId);
    this.position = initialPosition || {
      a1: 'wr', b1: 'wn', c1: 'wb', d1: 'wq', e1: 'wk', f1: 'wb', g1: 'wn', h1: 'wr',
      a2: 'wp', b2: 'wp', c2: 'wp', d2: 'wp', e2: 'wp', f2: 'wp', g2: 'wp', h2: 'wp',
      a7: 'bp', b7: 'bp', c7: 'bp', d7: 'bp', e7: 'bp', f7: 'bp', g7: 'bp', h7: 'bp',
      a8: 'br', b8: 'bn', c8: 'bb', d8: 'bq', e8: 'bk', f8: 'bb', g8: 'bn', h8: 'br'
    };
    // Store highlights to preserve them during re-renders
    this.highlights = {};
    // Store the last move for highlighting
    this.lastMove = null;
    this.renderBoard();
  }
  renderBoard() {
    this.board.innerHTML = '';

    for (let r of this.ranks) {
      for (let f of this.files) {
        const square = f + r;
        const div = document.createElement('div');
        const light = (f.charCodeAt(0) + r.charCodeAt(0)) % 2 === 0;
        div.className = 'square ' + (light ? 'light' : 'dark');
        div.id = square;

        // Add rank label only on the h file
        if (f === 'h') {
          const rankLabel = document.createElement('span');
          rankLabel.className = 'rank-label';
          rankLabel.textContent = r; // Rank label at top-right
          div.appendChild(rankLabel);
        }

        // Add file label only on the 1 rank
        if (r === '1') {
          const fileLabel = document.createElement('span');
          fileLabel.className = 'file-label';
          fileLabel.textContent = f; // File label at bottom-left
          div.appendChild(fileLabel);
        }

        const piece = this.position[square];
        if (piece) {
          const img = document.createElement('img');
          img.src = `pieces/${piece}.png`;
          img.className = 'piece';
          div.appendChild(img);
        }

        this.board.appendChild(div);
      }
    }
    
    // Reapply highlights after rendering the board
    this.reapplyHighlights();
  }
  
  // Helper method to reapply all saved highlights
  reapplyHighlights() {
    for (const square in this.highlights) {
      const color = this.highlights[square];
      const squareElement = document.getElementById(square);
      if (squareElement) {
        squareElement.style.backgroundColor = color;
      }
    }
  }
  movePiece(from, to) {
    if (!this.position[from]) return console.warn(`No piece at ${from}`);
    
    // Save the move for highlighting
    this.lastMove = { from, to };
    
    // Move the piece
    this.position[to] = this.position[from];
    delete this.position[from];
    
    // Highlight the move (will also store it in highlights)
    this.highlightMove();
    
    // Render the board (will reapply all highlights)
    this.renderBoard();
  }
  
  // Helper method to highlight the last move
  highlightMove() {
    if (this.lastMove) {
      this.highlightFields(this.lastMove.from, this.lastMove.to, 'red');
    }
  }
  highlightFields(from, to, color = 'red') {
    const fromFile = from[0].charCodeAt(0);
    const fromRank = parseInt(from[1]);
    const toFile = to[0].charCodeAt(0);
    const toRank = parseInt(to[1]);

    const minFile = Math.min(fromFile, toFile);
    const maxFile = Math.max(fromFile, toFile);
    const minRank = Math.min(fromRank, toRank);
    const maxRank = Math.max(fromRank, toRank);

    for (let rank = minRank; rank <= maxRank; rank++) {
      for (let file = minFile; file <= maxFile; file++) {
        const square = String.fromCharCode(file) + rank;
        const squareElement = document.getElementById(square);
        if (squareElement) {
          squareElement.style.backgroundColor = color;
          // Store highlight in our highlights object
          this.highlights[square] = color;
        }
      }
    }
  }  clearHighlights() {
    const squares = this.board.getElementsByClassName('square');
    for (let square of squares) {
      square.style.backgroundColor = '';
    }
    // Clear stored highlights
    this.highlights = {};
    // Clear the last move
    this.lastMove = null;
  }
}

// Example usage:
// const chessBoard = new ChessBoard('chessboard');
// chessBoard.movePiece('e2', 'e4');
// chessBoard.highlightFields('e2', 'e4', 'yellow');
// chessBoard.highlightFields('e7', 'e5', 'blue');
// chessBoard.clearHighlights();