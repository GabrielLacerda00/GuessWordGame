
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

const guessesQty = 3;

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

  const pickedWordAndPikedCategory = useCallback(() =>{
    //piking a random category
    const categorias = Object.keys(words);
    const category = categorias[Math.floor(Math.random() * Object.keys(categorias).length)]
    //piking a random word
    const word = words[category][Math.floor(Math.random() * words[category].length)]
    return {word,category}
  },[words]);

  //Starts the guess word game
  const startGame = useCallback(() => {
    //clear all letters
    clearLetterStates();

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
  }, [pickedWordAndPikedCategory]);

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
      setGuesses((actualGuesses) => actualGuesses - 1);
    }
    
  };
  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  }
  // Check if guesses ended
  useEffect(() => {
    if(guesses <= 0){
      clearLetterStates();
      setGameStage(stages[2].name)
    }
  },[guesses])

  //Check win condition
  useEffect(() => {

    const uniqueLetters = [...new Set(letters)];

    //win condition
    if(guessedLetters.length === uniqueLetters.length){
      // add score
      setScore((actualScore) => actualScore += 100)
      //restart game with new word
      startGame();
    }
  },[guessedLetters, letters, startGame])

  //Retry
  const retry = () => {
    setScore(0);
    setGuesses(guessesQty);
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
      {gameStage === "end" && <GameOver retry={retry} score={score}/>}
    </div>
  );
}

export default App;
