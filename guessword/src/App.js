
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

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(0);

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
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  }
  //Process the letter input
  const verifyLetter = (letter) =>{
    const normalizedLetter = letter.toLowerCase()

    //Check if letter has already been utilized
    if(guessedLetters.includes(normalizedLetter)|| wrongLetters.includes(normalizedLetter)){
      return;
    }
    // push a guessed letter or remove a guess
    if(letters.includes(normalizedLetter)){
      setGuessedLetters((actualGuessedLetters) =>[
        ...actualGuessedLetters,
        normalizedLetter
      ]);
    }else{
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter
      ]);
    }
    
  };

  //Retry
  const retry = () => {
    setGameStage(stages[0].name);
  }

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame}/>}
      {gameStage === "game" && <Game verifyLetter={verifyLetter} 
      pickedWord = {pickedWord} 
      pickedCategory={pickedCategory}
      letters={letters}
      guessedLetters = {guessedLetters}
      wrongLetters ={wrongLetters}
      guesses={guesses}
      score={score}
      />}
      {gameStage === "end" && <GameOver retry={retry}/>}
    </div>
  );
}

export default App;
