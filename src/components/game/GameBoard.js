import WordleRow from "./WordleRow";
import classes from "./GameBoardStyle.module.css";
import { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";

const GameBoard = () => {
  const {
    currentWord,
    setCurrentWord,
    foundWords,
    isCheckingWord,
    currentRowIndex,
    setIsCheckingWord,
    setFoundWords,
    setCurrentRowIndex,
    gameMode,
  } = useContext(AppContext);

  useEffect(() => {
    if (isCheckingWord) {
      setFoundWords([...foundWords, currentWord]);
      if (gameMode === "daily") {
        const localFoundWords = JSON.parse(
          localStorage.getItem("dailyFoundWords")
        );
        const foundWordsArray =
          localFoundWords && gameMode === "daily"
            ? [...localFoundWords, currentWord]
            : [...foundWords, currentWord];
        localStorage.setItem(
          "dailyFoundWords",
          JSON.stringify(foundWordsArray)
        );
      }
      setCurrentWord("");
      setCurrentRowIndex((prevState) => {
        return prevState + 1;
      });
      if (gameMode === "daily") {
        localStorage.setItem("currentRowIndex", currentRowIndex + 1);
      }
      setIsCheckingWord(false);
    }
  }, [isCheckingWord, gameMode]);

  return (
    <div className={classes.wordleBox}>
      <WordleRow index="1" />
      <WordleRow index="2" />
      <WordleRow index="3" />
      <WordleRow index="4" />
      <WordleRow index="5" />
      <WordleRow index="6" />
    </div>
  );
};

export default GameBoard;
