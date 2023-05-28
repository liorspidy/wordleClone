import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import Card from "./Card";
import classes from "./Card.module.css";
import wordsDb from "../merged_words.json";
import ShareIcon from "@mui/icons-material/Share";

const EndGamePrompt = ({ timeToNextWord }) => {
  const {
    pickedWord,
    gameState,
    currentRowIndex,
    showEndGame,
    gameMode,
    setPickedWord,
    setGameState,
    setFoundWords,
    setWrongLetters,
    setCorrectLetters,
    setAlmostLetters,
    setStartNewGame,
    setShowEndGame,
    setCurrentWord,
    setGameMode,
    setCurrentRowIndex,
    isCheckingWord,
  } = useContext(AppContext);

  const [currentRowIndexSetted, setCurrentRowIndexSetted] = useState(1);

  const endGameHandler = (event) => {
    event.stopPropagation();
    setShowEndGame(false);
    const rand = Math.floor(Math.random() * wordsDb.length);
    setPickedWord(wordsDb[rand]);
    localStorage.setItem("pickedWord", wordsDb[rand]);
    localStorage.setItem("gameMode", "inf");
    setGameMode("inf");
    setGameState(0);
    setFoundWords([]);
    setCurrentWord("");
    setAlmostLetters({});
    setWrongLetters({});
    setCorrectLetters({});
    setCurrentRowIndex(1);
    setStartNewGame(true);
  };

  const handleShareSteps = async () => {
    const gameModeHeb = gameMode === "daily" ? "יומי" : "אינסופי";
    const message = `וורדל + | ${gameModeHeb}
ניסיון ${curIndex - 1} מתוך 6
שחקו בוורדעל + כאן:
https://liwordleplus.netlify.app`;

    try {
      await navigator.clipboard.writeText(message);
      alert("הועתק ללוח!");
    } catch (error) {
      console.log("Error copying to clipboard:", error);
    }
  };

  useEffect(() => {
    const localCurrentRowIndex = localStorage.getItem("currentRowIndex");
    if (gameMode === "daily") {
      setCurrentRowIndexSetted(localCurrentRowIndex);
    }
  }, [gameMode, isCheckingWord]);

  const curIndex =
    gameMode === "daily" ? currentRowIndexSetted : currentRowIndex;

  return (
    <div
      className={`${classes.backdrop} ${showEndGame ? classes.show : ""}`}
      onClick={() => setShowEndGame(false)}
    >
      <Card onClick={(event) => event.stopPropagation()}>
        <div className={classes.endGame}>
          {gameState === 2 && (
            <h3 dir="rtl" style={{ margin: "0.5rem 0" }}>
              אוף.. לא נורא..
            </h3>
          )}
          {gameState === 1 && (
            <h2
              dir="rtl"
              style={{ margin: 0, marginTop: "0.6rem", marginBottom: "0.5rem" }}
            >
              כל הכבוד!!
            </h2>
          )}
          {gameState === 1 && (
            <h3
              dir="rtl"
              style={{ margin: 0, marginTop: "0.5rem", marginBottom: "0.5rem" }}
            >
              {+curIndex === 2
                ? "ניצחת תוך ניסיון אחד!"
                : ` ניצחת תוך ${curIndex - 1} ניסיונות!`}
            </h3>
          )}
          <h4 dir="rtl" style={{ margin: 0, marginBottom: "1.5rem" }}>
            המילה הייתה {pickedWord}
          </h4>
          <h5>המשחק היומי הבא בעוד {timeToNextWord}</h5>
          <div
            tabIndex="0"
            className={classes.share}
            onClick={handleShareSteps}
            title="שתף את המשחק"
          >
            <ShareIcon />
          </div>
          <button
            tabIndex="0"
            className={classes.btn}
            onClick={endGameHandler}
            title="בוא נתחיל משחק"
          >
            בוא נתחיל משחק
          </button>
        </div>
      </Card>
    </div>
  );
};

export default EndGamePrompt;
