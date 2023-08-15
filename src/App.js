
import './index.css'
import Navbar from './components/Navbar';
import Keyboard from './components/Keyboard';
import Board from './components/Board';
import GameOver from './components/Gameover';

import { useContext } from 'react';
import { BoardContext } from './context/BoardContextProvider';




function App() {

  const {theme} = useContext(BoardContext)

  return (

    <div className={`App h-[100vh] text-center text-white ${theme.body}`}>
      <Navbar />
      <Board />
      <Keyboard />
      <GameOver />
    </div>
  
    
  );


}

export default App;
