import { createContext, useState } from "react";

export const AppContext = createContext({
  pickedWord: "",
  setPickedWord: () => {},
  currentWord: "",
  setCurrentWord: () => {},
  currentRowIndex: 1,
  setCurrentRowIndex: () => {},
  isCheckingWord: false,
  setIsCheckingWord: () => {},
  foundWords: [],
  setFoundWords: () => {},
  gameState: 0,
  setGameState: () => {},
  endGame: false,
  setEndGame: () => {},
  startNewGame: false,
  setStartNewGame: () => {},
  showEndGame: false,
  setShowEndGame: () => {},
  wrongLetters: {},
  setWrongLetters: () => {},
  correctLetters: {},
  setCorrectLetters: () => {},
  almostLetters: {},
  setAlmostLetters: () => {},
  wrongWord: false,
  setWrongWord: () => {},
  gameMode: "daily",
  setGameMode: () => {},
  correct: {},
  setCorrect: () => {},
  almost: {},
  setAlmost: () => {},
  wrong: {},
  setWrong: () => {},
});

export const AppProvider = ({ children }) => {
  const [pickedWord, setPickedWord] = useState("");
  const [currentWord, setCurrentWord] = useState("");
  const [currentRowIndex, setCurrentRowIndex] = useState(1);
  const [isCheckingWord, setIsCheckingWord] = useState(false);
  const [foundWords, setFoundWords] = useState([]);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [almostLetters, setAlmostLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [correct, setCorrect] = useState({});
  const [almost, setAlmost] = useState({});
  const [wrong, setWrong] = useState({});
  const [gameState, setGameState] = useState(0);
  const [endGame, setEndGame] = useState(false);
  const [startNewGame, setStartNewGame] = useState(false);
  const [showEndGame, setShowEndGame] = useState(false);
  const [wrongWord, setWrongWord] = useState(false);
  const [gameMode, setGameMode] = useState("daily");

  const value = {
    pickedWord,
    currentWord,
    wrongWord,
    currentRowIndex,
    isCheckingWord,
    foundWords,
    gameState,
    endGame,
    showEndGame,
    startNewGame,
    correctLetters,
    wrongLetters,
    almostLetters,
    correct,
    almost,
    wrong,
    gameMode,
    setPickedWord,
    setCurrentWord,
    setCurrentRowIndex,
    setIsCheckingWord,
    setFoundWords,
    setGameState,
    setEndGame,
    setStartNewGame,
    setShowEndGame,
    setCorrectLetters,
    setWrongLetters,
    setAlmostLetters,
    setCorrect,
    setAlmost,
    setWrong,
    setWrongWord,
    setGameMode,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
