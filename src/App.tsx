import React, {  } from 'react';
import s from './App.module.scss';
import CanvasComponent from './CanvasComponent'
const App = () => {
  return (
    <div className={s.App}>
       <h1>Чтобы сменить цвет шара , дождитесь пока курсор окажется на шаре и нашмите клик.</h1>
        <CanvasComponent/>
    </div>
  );
}

export default App;
