import React, { useEffect, useRef, useState } from 'react';
import { Ball } from './models/Ball';
import ChangeColor from './ChangeColor';

const CanvasComponent = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [balls, setBalls] = useState<Ball[]>([]);
  const [activeBall, setActiveBall] = useState<Ball | null>(null);


  function updateBallVelocity(ball1:Ball, ball2:Ball) {

    ball1.dx *= 0.9;
    ball1.dy *= 0.9;
    ball2.dx *= 0.9;
    ball2.dy *= 0.9;
  }

  function checkBallsCollision() {
    for (let i = 0; i < balls.length; i++) {
      for (let j = i + 1; j < balls.length; j++) {
        const ball1 = balls[i];
        const ball2 = balls[j];
        const dx = ball2.x - ball1.x;
        const dy = ball2.y - ball1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < ball1.radius + ball2.radius) {
          updateBallVelocity(ball1, ball2);

        }
      }
    }
  }


  useEffect(() => {
    console.log("Initial balls setup:", balls);
    setBalls([
      new Ball(50, 100, 20, 0, 0, 'blue'),
      new Ball(500, 150, 25, 0, 0, 'blue'),
      new Ball(900, 150, 30, 0, 0, 'blue'),
      new Ball(500, 500, 35, 0, 0, 'blue'),
      new Ball(900, 350, 10, 0, 0, 'blue'),
      new Ball(500, 10, 5, 1, 1, 'blue'),
    ]);
  }, []);


  useEffect(() => {
    console.log("Balls array updated in CanvasComponent:", balls);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    let animationFrameId: any;

    const updateAndDrawBalls = () => {
      if (activeBall) {
        return
      }
      checkBallsCollision();
      context.clearRect(0, 0, canvas.width, canvas.height);
      balls.forEach(ball => {
        ball.update(canvas.width, canvas.height, 0.1);
        ball.draw(context);
      });
    };

    const render = () => {
      updateAndDrawBalls();
      animationFrameId = requestAnimationFrame(render);
    };
    const handleMouseDown = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      balls.forEach(ball => {
        const distance = Math.sqrt((ball.x - mouseX) ** 2 + (ball.y - mouseY) ** 2);
        if (distance < ball.radius) {

          setActiveBall(ball);
        }
      });
    };



    canvas.addEventListener('mousemove', (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      const newBalls = balls.map(ball => {

        const randomSpeedX = Math.random() * 20 - 10;
        const randomSpeedY = Math.random() * 20 - 10;

        const distance = Math.sqrt((ball.x - mouseX) ** 2 + (ball.y - mouseY) ** 2);
        if (distance < ball.radius) {
          return new Ball(ball.x, ball.y, ball.radius, randomSpeedX, randomSpeedY, ball.color);
        }
        return ball;
      });

      setBalls(newBalls);
    });

    canvas.addEventListener('mousedown', handleMouseDown);

    render();




    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousemove', (event: MouseEvent) => {});
      canvas.removeEventListener('mousedown', handleMouseDown);
    };
  }, [balls]);



  return (
    <>
      <canvas ref={canvasRef} width="1500" height="600" />
      {activeBall && (
        <div
          className='change_color_wrap'
        >
          <ChangeColor balls={balls} setBalls={setBalls} activeBall={activeBall} setActiveBall={setActiveBall} />

        </div>
      )}
    </>
  );
};
export default CanvasComponent;



