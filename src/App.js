import { useContext, useEffect, useState } from "react";
import "./App.css";
import GameBoard from "./components/game/GameBoard";
import Keyboard from "./components/keyboard/Keyboard";
import { AppContext } from "./context/AppContext";
import AddWord from "./UI/AddWord";
import EndGamePrompt from "./UI/EndGamePrompt";
import Header from "./UI/Header";
import wordsDb from "./merged_words.json";
import HowToPlay from "./UI/HowToPlay";
import Snackbar from "./UI/Snackbar";
import CryptoJS from "crypto-js";

function App() {
  const {
    setPickedWord,
    setGameState,
    gameMode,
    foundWords,
    pickedWord,
    isCheckingWord,
    currentRowIndex,
    setShowEndGame,
    setFoundWords,
    setCorrectLetters,
    setAlmostLetters,
    setWrongLetters,
    setCurrentRowIndex,
    setGameMode,
    setCurrentWord,
  } = useContext(AppContext);

  const [showAddWord, setShowAddWord] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [lightMode, setLightMode] = useState(() => {
    let lightModeLocal = localStorage.getItem("lightMode");
    if (lightModeLocal === null) {
      lightModeLocal = "1";
      localStorage.setItem("lightMode", lightModeLocal);
    }
    return lightModeLocal === "1";
  });

  const [timeToNextWord, setTimeToNextWord] = useState("");

  useEffect(() => {
    let lightModeLocal = localStorage.getItem("lightMode");
    if (lightModeLocal === "0") {
      setLightMode(false);
    }
  }, []);

  useEffect(() => {
    if (lightMode) {
      document.body.classList.add("light");
      localStorage.setItem("lightMode", "1");
    } else {
      document.body.classList.remove("light");
      localStorage.setItem("lightMode", "0");
    }
  }, [lightMode]);

  useEffect(() => {
    const updateTimeToNextWord = () => {
      const now = new Date();
      const threeAMToday = new Date(now);
      threeAMToday.setHours(0, 0, 0, 0);
      const timeUntil3AM = threeAMToday.getTime() - now.getTime();
      if (timeUntil3AM < 0) {
        threeAMToday.setDate(threeAMToday.getDate() + 1);
      }
      const timeToNext3AM = threeAMToday.getTime() - now.getTime();
      const hours = Math.floor(timeToNext3AM / (60 * 60 * 1000));
      const minutes = Math.floor(
        (timeToNext3AM % (60 * 60 * 1000)) / (60 * 1000)
      );
      const seconds = Math.floor((timeToNext3AM % (60 * 1000)) / 1000);
      setTimeToNextWord(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      );

      getCurrentDay();
    };

    updateTimeToNextWord();
    const intervalId = setInterval(updateTimeToNextWord, 1000);
    return () => clearInterval(intervalId);
  }, []);

  function getCurrentDay() {
    var currentDate = new Date();
    var currentDateWithoutTime = currentDate.toISOString().split("T")[0];
    const dailyPicked = localStorage.getItem("dailyPickedWord");

    const day = localStorage.getItem("day");
    // console.log("day: " + day);
    // console.log("currentDateWithoutTime: " + currentDateWithoutTime);
    // console.log(day === currentDateWithoutTime);
    if (day) {
      if (currentDateWithoutTime !== day || dailyPicked === null) {
        updateDailyWord();
        const time = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
        localStorage.setItem("time", time);
      }
    }
    localStorage.setItem("day", currentDateWithoutTime);
  }

  // Helper function to generate the daily value
  const getDailyValue = () => {
    const seed = new Date().toISOString().slice(0, 10);
    console.log(seed);
    const hash = CryptoJS.SHA256(seed.toString()).toString();
    const multiplier = 1664525;
    const increment = 1013904223;
    const modulus = Math.pow(2, 32);
    let index = parseInt(hash.slice(-1), 16) % wordsDb.length;
    for (let i = 0; i < 13; i++) {
      index = (multiplier * index + increment) % modulus;
    }
    return wordsDb[index % wordsDb.length];
  };

  const createNewDailyWord = () => {
    const dailyWord = getDailyValue();
    localStorage.removeItem("dailyFoundWords");
    localStorage.removeItem("currentRowIndex");
    setFoundWords([]);
    setAlmostLetters({});
    setCorrectLetters({});
    setWrongLetters({});
    setGameState(0);
    setShowEndGame(false);
    setCurrentRowIndex(1);
    return dailyWord;
  };

  const updateDailyWord = () => {
    console.log("update daily word called");
    const newDailyWord = createNewDailyWord();
    localStorage.setItem("dailyPickedWord", newDailyWord);
    setPickedWord(newDailyWord);
  };

  //sets the picked word
  useEffect(() => {
    const localGameMode = localStorage.getItem("gameMode");
    if (gameMode === "daily") {
      setCurrentWord("");
      const dailyStoredWord = localStorage.getItem("dailyPickedWord");
      setPickedWord(dailyStoredWord);
      localStorage.setItem("gameMode", "daily");
    } else if (gameMode === "inf") {
      setCurrentWord("");
      const storedWord = localStorage.getItem("pickedWord");
      if (storedWord && localGameMode === "inf") {
        setPickedWord(storedWord);
      } else {
        const rand = Math.floor(Math.random() * wordsDb.length);
        setPickedWord(wordsDb[rand]);
        localStorage.setItem("pickedWord", wordsDb[rand]);
        localStorage.setItem("gameMode", "inf");
      }
    } else {
      localStorage.setItem("gameMode", "daily");
      setGameMode("daily");
    }
  }, [setPickedWord, gameMode]);

  // ends the game if the user got the wrong answer
  useEffect(() => {
    const foundWord = foundWords[5];
    if (
      (foundWord && foundWord !== pickedWord) ||
      (foundWord !== pickedWord && currentRowIndex === 7)
    ) {
      console.log("failed");
      const timeout = setTimeout(() => {
        setShowEndGame(true);
        setGameState(2);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [
    foundWords,
    pickedWord,
    isCheckingWord,
    setGameState,
    setShowEndGame,
    gameMode,
  ]);

  return (
    <div className={`App ${lightMode ? "lightMode" : ""}`}>
      <Snackbar lightMode={lightMode} />
      <Header
        lightMode={lightMode}
        showAddWord={showAddWord}
        setShowAddWord={setShowAddWord}
        setLightMode={setLightMode}
        setShowHowToPlay={setShowHowToPlay}
      />
      <AddWord showAddWord={showAddWord} setShowAddWord={setShowAddWord} />
      <HowToPlay
        showHowToPlay={showHowToPlay}
        setShowHowToPlay={setShowHowToPlay}
      />
      <EndGamePrompt timeToNextWord={timeToNextWord} />
      <div className="mainGame">
        <div className="gameField">
          <GameBoard />
          <Keyboard />
        </div>
        <div className="bottomText">
          <h6 style={{ fontSize: "0.6rem", margin: 0 }}>
            Made by Lior Fridman 2023
          </h6>
          <h6 style={{ fontSize: "0.6rem", margin: "0 auto", width: "20rem" }}>
            Based on "Wordle" by Josh Wardle and The New York Times
          </h6>
        </div>
      </div>
    </div>
  );
}

export default App;
