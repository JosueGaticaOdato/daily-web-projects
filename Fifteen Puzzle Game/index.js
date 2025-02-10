//Tamaño de ficha
let TileSize = 100;

//Array de 15 elementos con los numeros del 1 al 15
let tilesArray = Array.from({length:15}, (_,i) => i+1).concat();
//[1,2,3,...,15]

//Posicion vacia en el tablero
//En una cuadrícula de 4x4 (índices de 0 a 15), la casilla vacía está en la última posición.
let emptyIndex = 15;

//Mueve una ficha si esta adyacente al espacio vacio
function handleTileClick(index){
  if (isAdjcent(index,emptyIndex)){ //Verifica si la ficha puede moverse
    //Intercambia la ficha con el espacio vacio y actualiza vacio, luego redibuja el tablero
    tilesArray[emptyIndex] = tilesArray[index];
    tilesArray[index] = 0;
    emptyIndex = index;
    renderTitles();

    //Si se resolvio el rompezacabezas, muestra un mensaje
    if (isSolved()){
      document.getElementById('message').style.display = "block"
    }
  }

}

//Determina si dos posiciones son adyacnetes en la cuadriculas
function isAdjcent(a,b){
  let rowA = Math.floor(a/4);
  let colA = a % 4;
  let rowB = Math.floor(b/4);
  let colB = b % 4;

  return (Math.abs(rowA - rowB) === 1 && colA === colB) ||
  (Math.abs(colA - colB) === 1 && rowA === rowB)
  //Retorna true si a y b están en la misma fila y son vecinos en columna o en la misma columna y son vecinos en fila.
}


//Dibuja el tablero
function renderTitles(){
  let container = document.getElementById("puzzle-container");
  container.innerHTML = '';

  tilesArray.forEach((value,index) => {
    let tile = document.createElement('div')
    tile.className = value === 0 ? 'tile empty': 'tile';
    tile.textContent = value || '';

    //Click para mover la ficha
    tile.addEventListener('click',() => handleTileClick(index));

    //Calcula su posición en la cuadrícula usando row y col.
    let row = Math.floor(index / 4);
    let col = index % 4;
    tile.style.top = `${row * TileSize}px`;
    tile.style.left = `${col * TileSize}px`;

    container.appendChild(tile);
  })
}

//Verifica si el puzzle esta resuelto
function isSolved(){
  for(let i = 0; i < 15; i++){
    if(tilesArray[i] !== i + 1){
      return false;
    }
  }

  return true;
}

//Mezcla el tablero
//Garantiza que el puzzle sea resoluble, ya que usa movimientos válidos
function shuffleTiles(){
  let currentEmpty = emptyIndex;
  for (let i = 0; i < 1000; i++){
    let possibleMoves = [];
    let row = Math.floor(currentEmpty / 4);
    let col = currentEmpty % 4;

    if (row > 0) possibleMoves.push(currentEmpty - 4);
    if (row < 3) possibleMoves.push(currentEmpty + 4);
    if (col > 0) possibleMoves.push(currentEmpty - 1);
    if (col < 3) possibleMoves.push(currentEmpty + 1);

    let move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)]
    tilesArray[currentEmpty] = tilesArray[move];
    tilesArray[move] = 0;
    currentEmpty = move;
  }
  emptyIndex = currentEmpty;
  renderTitles();
  document.getElementById('message').style.display = 'none';
}

document.getElementById("shuffle-btn").addEventListener("click",shuffleTiles);
shuffleTiles();