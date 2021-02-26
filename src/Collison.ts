import { Brick } from './sprites/Brick';
import { Paddle } from './sprites/Paddle';
import { Ball } from './sprites/Ball';
import { CanvasView } from './view/CanvasView';

export class Collision {
    isCollidingBrick(ball: Ball, brick: Brick): boolean {
        if (
            ball.pos.x < brick.pos.x + brick.width &&
            ball.pos.x + brick.width > brick.pos.x &&
            ball.pos.y < brick.pos.y + brick.height &&
            ball.pos.y + ball.height > brick.pos.y
        ) {
            return true;
        }
        return false;
    }
    // CHeck ball Collison with bricks
    isCollidingBricks(ball: Ball, bricks: Brick[]): boolean {
        let colliding = false;
        bricks.forEach((brick, i) => {
            if (this.isCollidingBrick(ball, brick)) {
                ball.changeYDirections();

                if ((brick.energy === 1)) {
                    bricks.splice(i, 1);
                }
                else {
                    brick.energy -= 1;
                }
                colliding = true;
            }
        })

        return colliding;
    }

    checkBallCollision(ball: Ball, paddle: Paddle, view: CanvasView): void {
        // check ball collision with paddle
        if (
            ball.pos.x + ball.width > paddle.pos.x &&
            ball.pos.x < paddle.pos.x + paddle.width &&
            ball.pos.y + ball.height === paddle.pos.y
        ) {
            ball.changeYDirections();
        }
        // check ball collision with walls
        // ball movement X constraints
        if (ball.pos.x > view.canvas.width - ball.width || ball.pos.x < 0) {
            ball.changeXDirections();
        }
        // ball movement Y constrainsts
        if (ball.pos.y < 0) {
            ball.changeYDirections();
        }
    }
}
