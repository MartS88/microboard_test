import React from 'react';
import s from './ChangeColor.module.scss';
import { Ball } from './models/Ball';

interface ChangeColorProps {
  balls: Ball[];
  setBalls: React.Dispatch<React.SetStateAction<Ball[]>>;
  activeBall: Ball | null;
  setActiveBall: React.Dispatch<React.SetStateAction<Ball | null>>;

}

const ChangeColor: React.FC<ChangeColorProps> = ({ balls, activeBall, setActiveBall, setBalls }) => {

    const changeColorHandler = (color: string) => {

      if (activeBall){

          const updatedActiveBall = new Ball(activeBall.x, activeBall.y, activeBall.radius, activeBall.dx, activeBall.dy, color);
          const updatedBalls = balls.map(ball => ball === activeBall ? updatedActiveBall : ball);
          setBalls(updatedBalls);
          setActiveBall(updatedActiveBall);
          setActiveBall(null)
      }

  };


  return (
    <div
      style={{
        position: 'absolute',
        top: activeBall ? activeBall.y : 0,
        left: activeBall ? activeBall.x : 0,
      }}
      className={s.change_color}
    >
      <div className={s.color_div}>
        <span className={s.close} onClick={() => setActiveBall(null)}>X</span>

        <span>Choose color:</span>
        <ul>
          <li onClick={() => changeColorHandler('red')}>Red</li>
          <li onClick={() => changeColorHandler('green')}>Green</li>
          <li onClick={() => changeColorHandler('orange')}>Orange</li>
          <li onClick={() => changeColorHandler('blue')}>Blue</li>
        </ul>
      </div>
    </div>
  );
};

export default ChangeColor;



