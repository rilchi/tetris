
let requestId = null;

let time = {
    start : 0,
    elapsed : 0,
    level : 1000
};

let accountValues = {
    score : 0,
    lines : 0,
    level : 0
};

let board = new Board(ctx, ctxNext);

let account = new Proxy(accountValues, {
    set: (target, key, value) => {
        target[key] = value;
        updateAccount(key, value);
        return true;
    }
});

function updateAccount(key, value) {
    let element = document.getElementById(key);
    if(element) {
        element.textContent = value;
    }
}

function handleKeyPress(event){
    
    event.preventDefault();

    if (moves[event.keyCode]){
        
        let p = moves[event.keyCode](board.piece);

        if (event.keyCode === KEY.SPACE){
            while (board.valid(p)){
                board.piece.movePiece(p);
                p = moves[KEY.SPACE](board.piece);
            }
        }

        if (board.valid(p)){
            board.piece.movePiece(p);
            draw();
        }
    }
}

function addEventListener(){
    document.removeEventListener('keydown', handleKeyPress);
    document.addEventListener('keydown', handleKeyPress);
}

function play() {
    addEventListener();
    if (document.querySelector('#start').style.display == "") {
        resetGame();
    }

    if (requestId){
        cancelAnimationFrame(requestId);
    }

    time.start = performance.now();
    animate();
    document.querySelector('#start').style.display = 'none';
    document.querySelector('#pause').style.display = 'block';
    document.querySelector('#restart').style.display = 'block';
}

function resetGame() {
    account.score = 0;
    account.lines = 0;
    account.level = 0;
    time = {
        start : performance.now(),
        elapsed : 0,
        level: LEVEL[0]
    };
    
}

function gameOver() {
    cancelAnimationFrame(requestId);
    ctx.fillStyle = 'black';
    ctx.fillRect(1, 3, 8, 1.2);
    ctx.font = '1px Arial';
    ctx.fillStyle = 'red';
    ctx.fillText('GAME OVER', 1.8, 4);

    console.log(account.score);
    checkHighScore(account.score);
}

function checkHighScore(score) {

    const highScoreString = window.localStorage.getItem(HIGH_SCORE);
    
    const highScores = JSON.parse(highScoreString) ?? [];

    const lowestScore = highScores[NO_OF_HIGH_SCORES - 1]?.score ?? 0;
    if (score > lowestScore) {
        saveHighScore(score, highScores);
        showHighScores();
    }
}

function saveHighScore(score, highScores) {

    const name = prompt('Congratulation, you got a highscore! Enter your name:');
    const newScore = {
        score , 
        name
    }; 
    
    highScores.push(newScore);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(NO_OF_HIGH_SCORES);

    window.localStorage.setItem(HIGH_SCORE, JSON.stringify(highScores));
}

function showHighScores() {
    const highScores = JSON.parse(window.localStorage.getItem(HIGH_SCORE)) ?? [];
    const highScoreList = document.getElementById(HIGH_SCORE);
    highScoreList.innerHTML = highScores
        .map((score) => `<tr><td>${score.score}</td> <td> ${score.name}</td></tr>`)
        .join('');
}

/**
 async function showHighScores() {
    const highScores = await fetch('highScores.json')
        .then((response) => response.json()
        .catch((error) => console.log(error))
        || []
        )
    highScoreList.innerHTML = highScores
        .map((score) => '<li>${score.score} - {score.name}')
        .join('');
}
 */

function animate(now = 0) {
    
    time.elapsed = now - time.start;

    if (time.elapsed > time.level) {
    
        time.start = now; 

       if(!board.drop()) {
           gameOver();
           return;
       }
    }

    draw();
    requestId = requestAnimationFrame(animate);
}

function draw() {
    const { width, height } = ctx.canvas;
    ctx.clearRect(0, 0, width, height);

    board.draw();
    board.piece.draw();
}

function pause() {
    if (!requestId) {
        document.querySelector('#start').style.display = 'none';
        document.querySelector('#pause').style.display = 'block';
        document.querySelector('#restart').style.display = 'block';
        animate();
    }

    cancelAnimationFrame(requestId);
    requestId = null;
    ctx.fillStyle = 'black';
    ctx.fillRect(1, 3, 8, 1.2);
    ctx.font = '1px Arial';
    ctx.fillStyle = 'yellow';
    ctx.fillText('PAUSED', 3, 4);
    document.querySelector('#start').style.display = 'block';
    document.querySelector('#pause').style.display = 'none';
    document.querySelector('#restart').style.display = 'block';
}
