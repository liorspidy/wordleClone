import { useContext, useEffect, useState } from "react";
import "./App.css";
import GameBoard from "./components/game/GameBoard";
import Keyboard from "./components/keyboard/Keyboard";
import { AppContext } from "./context/AppContext";
import AddWord from "./UI/AddWord";
import EndGamePrompt from "./UI/EndGamePrompt";
import Header from "./UI/Header";
import wordsDb from "./words.json";

function App() {
  const {
    setPickedWord,
    setGameState,
    gameState,
    foundWords,
    pickedWord,
    isCheckingWord,
    setShowEndGame,
  } = useContext(AppContext);

  const [showAddWord, setShowAddWord] = useState(false);
  const [lightMode, setLightMode] = useState(false);

  useEffect(() => {
    const storedWord = localStorage.getItem("pickedWord");
    if (storedWord) {
      setPickedWord(storedWord);
    } else {
      const rand = Math.floor(Math.random() * wordsDb.length);
      setPickedWord(wordsDb[rand]);
      localStorage.setItem("pickedWord", wordsDb[rand]);
    }
  }, [setPickedWord]);

  useEffect(() => {
    const foundWord = foundWords[4];
    if (foundWord && foundWord !== pickedWord) {
      const timeout = setTimeout(() => {
        setShowEndGame(true);
        setGameState(2);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [foundWords, pickedWord, isCheckingWord, setGameState, setShowEndGame]);

  useEffect(() => {
    if (lightMode) {
      document.body.classList.remove("endGame");
      // localStorage.setItem("lightMode", "0");
    } else {
      document.body.classList.add("endGame");
      // localStorage.setItem("lightMode", "1");
    }
  }, [lightMode]);

  return (
    <div className={`App ${lightMode ? "lightMode" : ""}`}>
      <Header
        lightMode={lightMode}
        showAddWord={showAddWord}
        setShowAddWord={setShowAddWord}
        setLightMode={setLightMode}
      />
      <AddWord showAddWord={showAddWord} setShowAddWord={setShowAddWord} />
      <EndGamePrompt />
      <GameBoard />
      <Keyboard />
      <div style={{ textAlign: "center" }}>
        <h6 style={{ fontSize: "0.6rem", margin: 0 }}>
          Made by Lior Fridman 2023
        </h6>
        <h6 style={{ fontSize: "0.6rem", margin: "0 auto", width: "20rem" }}>
          Based on "Wordle" by Josh Wardle and The New York Times Company
        </h6>
      </div>
    </div>
  );
}

export default App;