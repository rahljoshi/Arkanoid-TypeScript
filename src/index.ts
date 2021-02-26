import { CanvasView } from './view/CanvasView';
import { Ball } from './sprites/Ball';
import { Brick } from './sprites/Brick';
import { Paddle } from './sprites/Paddle';
import { Collision } from './Collison';
//images
import PADDLE_IMAGE from './images/paddle.png';
import BALL_IMAGE from './images/ball.png';
//level and colors
import {
    PADDLE_SPEED,
    PADDLE_WIDTH,
    PADDLE_HEIGHT,
    PADDLE_STARTX,
    BALL_SPEED,
    BALL_SIZE,
    BALL_STARTX,
    BALL_STARTY
} from './setup';
import { createBricks } from './helpers';

let gameOver = false;
let score = 0;

function setGameOver(view: CanvasView) {
    view.drawInfo('Game Over!');
    gameOver = false;
}

function setGameWin(view: CanvasView) {
    view.drawInfo('Game Won!');
    gameOver = false;
}

function gameLoop(
    view: CanvasView,
    bricks: Brick[],
    paddle: Paddle,
    ball: Ball,
    collison: Collision,
) {
    view.clear();
    view.drawBricks(bricks);
    view.drawSprite(paddle);
    view.drawSprite(ball);

    //move balll
    ball.moveBall();
    // Move Paddle and check so it won't exit the playfield

    if (
        (paddle.isMovingLeft && paddle.pos.x > 0) ||
        (paddle.isMovingRight && paddle.pos.x < view.canvas.width - paddle.width)
    ) {
        paddle.movePaddle();
    }
    collison.checkBallCollision(ball, paddle, view);
    const collidingBrick = collison.isCollidingBricks(ball, bricks);
    if (collidingBrick) {
        score += 1;
        view.drawScore(score);
    }
    // Game over or lose
    if (ball.pos.y > view.canvas.height) gameOver = true;
    // if game won, display
    if (bricks.length === 0) return setGameWin(view);

    // return if gameover and dont run reuest animation frame
    if (gameOver) return setGameOver(view);


    requestAnimationFrame(() => gameLoop(view, bricks, paddle, ball, collison));
}

function startGame(view: CanvasView) {
    score = 0;
    view.drawInfo('');
    view.drawScore(0);
    //create a  collison
    const collision = new Collision();
    //create all bricks
    const bricks = createBricks();
    // create ball
    const ball = new Ball(
        BALL_SPEED,
        BALL_SIZE,
        { x: BALL_STARTX, y: BALL_STARTY },
        BALL_IMAGE
    );
    //create a paddle
    const paddle = new Paddle(
        PADDLE_SPEED,
        PADDLE_WIDTH,
        PADDLE_HEIGHT,
        {
            x: PADDLE_STARTX,
            y: view.canvas.height - PADDLE_HEIGHT - 5
        },
        PADDLE_IMAGE
    );
    gameLoop(view, bricks, paddle, ball, collision);
}

const view = new CanvasView('#playField');
view.initStartButton(startGame); 
