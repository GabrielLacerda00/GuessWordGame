
import './App.css';

import StartScreen from './components/StartScreen';

import {useCallback, useEffect, useState} from "react";

import {wordslist} from "./data/words";
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
    {id: 1, name: "start"},
    {id: 2, name: "game"},
    {id:3, name: "end"},
];

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordslist);

  //Starts the guess word game
  const startGame = () => {
    setGameStage(stages[1].name);
  }
  //Process the letter input
  const verifyLetter = () =>{
    setGameStage(stages[2].name);
  }

  //Retry
  const retry = () => {
    setGameStage(stages[0].name);
  }

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame}/>}
      {gameStage === "game" && <Game verifyLetter={verifyLetter}/>}
      {gameStage === "end" && <GameOver retry={retry}/>}
    </div>
  );
}

export default App;
