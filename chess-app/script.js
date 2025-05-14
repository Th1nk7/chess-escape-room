const files = 'abcdefgh';
const ranks = '87654321';
const board = document.getElementById('chessboard');

let position = {
  a1:'wr', b1:'wn', c1:'wb', d1:'wq', e1:'wk', f1:'wb', g1:'wn', h1:'wr',
  a2:'wp', b2:'wp', c2:'wp', d2:'wp', e2:'wp', f2:'wp', g2:'wp', h2:'wp',
  a7:'bp', b7:'bp', c7:'bp', d7:'bp', e7:'bp', f7:'bp', g7:'bp', h7:'bp',
  a8:'br', b8:'bn', c8:'bb', d8:'bq', e8:'bk', f8:'bb', g8:'bn', h8:'br'
};

function renderBoard() {
  board.innerHTML = '';
  for (let r of ranks) {
    for (let f of files) {
      const square = f + r;
      const div = document.createElement('div');
      const light = (f.charCodeAt(0) + r.charCodeAt(0)) % 2 === 0;
      div.className = 'square ' + (light ? 'light' : 'dark');
      div.id = square;

      const piece = position[square];
      if (piece) {
        const img = document.createElement('img');
        img.src = `pieces/${piece}.png`;
        img.className = 'piece';
        div.appendChild(img);
      }

      board.appendChild(div);
    }
  }
}

function movePiece(from, to) {
  if (!position[from]) return console.warn(`No piece at ${from}`);
  position[to] = position[from];
  delete position[from];
  renderBoard();
}

renderBoard();
