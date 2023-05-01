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
});

export const AppProvider = ({ children }) => {
  const [pickedWord, setPickedWord] = useState("");
  const [currentWord, setCurrentWord] = useState("");
  const [currentRowIndex, setCurrentRowIndex] = useState(1);
  const [isCheckingWord, setIsCheckingWord] = useState(false);
  const [foundWords, setFoundWords] = useState([]);
  const [gameState, setGameState] = useState(0);
  const [endGame, setEndGame] = useState(false);
  const [startNewGame, setStartNewGame] = useState(false);
  const [showEndGame, setShowEndGame] = useState(false);

  const value = {
    pickedWord,
    currentWord,
    currentRowIndex,
    isCheckingWord,
    foundWords,
    gameState,
    endGame,
    showEndGame,
    startNewGame,
    setPickedWord,
    setCurrentWord,
    setCurrentRowIndex,
    setIsCheckingWord,
    setFoundWords,
    setGameState,
    setEndGame,
    setStartNewGame,
    setShowEndGame,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
