
const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;

const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d'); 

ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;
ctx.scale(BLOCK_SIZE, BLOCK_SIZE);


const canvasNext = document.getElementById('next');
const ctxNext = canvasNext.getContext('2d');
ctxNext.canvas.width = 4 * BLOCK_SIZE;
ctxNext.canvas.height = 4 * BLOCK_SIZE;
ctxNext.scale(BLOCK_SIZE, BLOCK_SIZE); 

const COLORS = ['cyan', 'blue', 'orange', 'yellow', 'purple', 'red', 'green'];

const SHAPES = [
    [
        [0, 0, 0, 0], 
        [1, 1, 1, 1],  
        [0, 0, 0, 0], 
        [0, 0, 0, 0]
    ],
    [
        [2, 0, 0],
        [2, 2, 2], 
        [0, 0, 0]
    ],
    [
        [0, 0, 3],
        [3, 3, 3],
        [0, 0, 0]
    ],
    [
        [4, 4],
        [4, 4]
    ],
    [
        [0, 5, 5],
        [5, 5, 0],
        [0, 0, 0]
    ],
    [
        [0, 6, 0],
        [6, 6, 6],
        [0, 0, 0]
    ],
    [
        [7, 7, 0],
        [0, 7, 7],
        [0, 0, 0]
    ]
];

const KEY = {
    LEFT : 37,
    UP : 38,
    RIGHT : 39,
    DOWN : 40,
    A : 65,
    SPACE : 32
};

const POINTS = {
    SINGLE : 100,
    DOUBLE : 300,
    TRIPLE : 500,
    TETRIS : 800,
    SOFT_DROP : 1,
    HARD_DROP : 2
};

const ROTATION = {
    UP : 'UP',
    A : 'A'
};

const moves = {
    [KEY.LEFT] : (p) => ({...p, x: p.x - 1}),
    [KEY.RIGHT] : (p) => ({...p, x: p.x + 1}),
    [KEY.DOWN] : (p) => ({...p, y: p.y + 1}),
    [KEY.UP] : (p) => board.rotate(p, ROTATION.UP),
    [KEY.A] : (p) => board.rotate(p, ROTATION.A),
    [KEY.SPACE] : (p) => ({...p, y: p.y + 1})
};

const LINES_PER_LEVEL = 10;
const LEVEL = {
    0: 800,
    1: 720,
    2: 630,
    3: 550, 
    4: 470,
    5: 380,
    6: 300,
    7: 220,
    8: 130,
    9: 100,
    10: 80,
    11: 60,
    12: 40,
    13: 30
};

[COLORS, SHAPES, KEY, POINTS, ROTATION, LEVEL].forEach(item => Object.freeze(item))

const NO_OF_HIGH_SCORES = 10;
const HIGH_SCORE = 'highScores';