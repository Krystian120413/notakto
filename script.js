const boxes = Array.from(document.getElementsByClassName('field'));
const win = document.getElementById('win');
const restartBtn = document.getElementById('tryAgainBtn');
const spaces = [];
const O_TEXT = "x";
const X_TEXT = "X";
let currentPlayer;
let lastMove;

const drawBoard = () => {
    boxes.forEach((box, index) => {
        let styleString = '';
        if(index < 3){
            styleString += `border-bottom: 6px solid #fff;`;
        }
        if(index % 3 === 0){
            styleString += `border-right: 6px solid #fff;`;
        }
        if(index % 3 === 2){
            styleString += `border-left: 6px solid #fff;`;
        }
        if(index > 5){
            styleString += `border-top: 6px solid #fff;`;
        }
        box.style = styleString;
        box.style.color = 'white';
        box.addEventListener('click', boxClicked);
    })
}

const boxClicked = (e) => {
    currentPlayer = O_TEXT;
    const id = e.target.id;
    if(!spaces[id]){
        spaces[id] = currentPlayer;
        lastMove = id;
        e.target.style.color = (e.target.style.color === 'white' || e.target.style.color === '') ? 'rgb(43, 223, 43)' : 'white';
        e.target.innerText = currentPlayer;
        if(check(spaces)){
            check(spaces);
            return;
        }
        currentPlayer = X_TEXT;
        setTimeout(bestMove, 500);
        console.log(spaces);
    }
}

const playerHasLost = (sp) => {
    if(sp[0] != null){
        if(sp[1] != null && sp[2] != null) return true;
        if(sp[3] != null && sp[6] != null) return true;
        if(sp[4] != null && sp[8] != null) return true;
    }
    if(sp[1] != null){
        if(sp[4] != null && sp[7] != null) return true;
    }
    if(sp[2] != null){
        if(sp[5] != null && sp[8] != null) return true;
        if(sp[4] != null && sp[6] != null) return true;
    }
    if(sp[3] != null){
        if(sp[4] != null && sp[5] != null) return true;
    }
    if(sp[6] != null){
        if(sp[7] != null && sp[8] != null) return true;
    }
}

const check = (spac) => {
    if(playerHasLost(spac)){
        let color;
        if(currentPlayer === X_TEXT) color = 'Biały';
        else color = 'Zielony';
        win.innerText = (`${color} przegrał`);
        return true;
    }
}

const restart = () => { 
    for(let i = 0; i < 9; i++){
        spaces[i] = null;
    }
    boxes.forEach((box) => {
        box.innerText = '';
        box.style.color = 'white';
    })
    win.innerText = 'Kto przegra?';
    currentPlayer = X_TEXT;
    setTimeout(bestMove, 200);
    lastMove = NaN;
}

restartBtn.addEventListener('click', restart);

const bestMove = () => {
    if(spaces[4] === null){
        spaces[4] = currentPlayer;
        boxes[4].innerText = 'X';    
    }
    switch(Number(lastMove)){
        case 0:
            if(spaces[7] === null && spaces[1] === null){
                spaces[7] = currentPlayer;
                boxes[7].innerText = 'X';
            }
            else{
                spaces[5] = currentPlayer;
                boxes[5].innerText = 'X';
            }
            break;
        case 1:
            if(spaces[6] === null && spaces[2] === null){
                spaces[6] = currentPlayer;
                boxes[6].innerText = 'X';
            }
            else{
                spaces[8] = currentPlayer;
                boxes[8].innerText = 'X';
            }
            break;
        case 2:
            if(spaces[3] === null && spaces[5] === null){
                spaces[3] = currentPlayer;
                boxes[3].innerText = 'X';
            }
            else{
                spaces[7] = currentPlayer;
                boxes[7].innerText = 'X';
            }
            break;
        case 3:
            if(spaces[2] === null && spaces[7] === null){
                spaces[2] = currentPlayer;
                boxes[2].innerText = 'X';
            }
            else{
                spaces[8] = currentPlayer;
                boxes[8].innerText = 'X';
            }
            break;
        case 5:
            if(spaces[0] === null && spaces[8] === null){
                spaces[0] = currentPlayer;
                boxes[0].innerText = 'X';
            }
            else{
                spaces[6] = currentPlayer;
                boxes[6].innerText = 'X';
            }
            break;
        case 6:
            if(spaces[1] === null && spaces[7] === null){
                spaces[1] = currentPlayer;
                boxes[1].innerText = 'X';
            }
            else{
                spaces[5] = currentPlayer;
                boxes[5].innerText = 'X';
            }
            break;
        case 7:
            if(spaces[0] === null && spaces[8] === null){
                spaces[0] = currentPlayer;
                boxes[0].innerText = 'X';
            }
            else{
                spaces[2] = currentPlayer;
                boxes[2].innerText = 'X';
            }
            break;
        case 8:
            if(spaces[1] === null && spaces[7] === null){
                spaces[1] = currentPlayer;
                boxes[1].innerText = 'X';
            }
            else{
                spaces[3] = currentPlayer;
                boxes[3].innerText = 'X';
            }
            break; 
    }
    if(check(spaces)){
        check(spaces);
        return;
    }
}


restart();
drawBoard();