
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

  const [pikedWord, setPikedWord] = useState("");
  const [pikedCategory, setPikedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const pickedWordAndPikedCategory = () =>{
    //piking a random category
    const categorias = Object.keys(words);
    const category = categorias[Math.floor(Math.random() * Object.keys(categorias).length)]
    //piking a random word
    const word = words[category][Math.floor(Math.random() * words[category].length)]
    return {word,category}
  }
  //Starts the guess word game
  const startGame = () => {
    //piked word and piked category
    const {word, category} = pickedWordAndPikedCategory();
    
    //creating an array of letters
    let wordLetters = word.split("");
    wordLetters = wordLetters.map((x) => x.toLowerCase());
    
    // Fill states
    setPikedWord(word);
    setPikedCategory(category);
    setLetters(letters);

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
