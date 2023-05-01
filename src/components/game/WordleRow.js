import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import classes from "./GameBoardStyle.module.css";

const WordleRow = ({ index }) => {
  const {
    pickedWord,
    currentWord,
    currentRowIndex,
    foundWords,
    startNewGame,
    isCheckingWord,
    setGameState,
    setEndGame,
    setStartNewGame,
    setShowEndGame,
  } = useContext(AppContext);
  const [correct, setCorrect] = useState({});
  const [almost, setAlmost] = useState({});
  const [wrong, setWrong] = useState({});

  const items = currentWord.split("");
  const foundWord = foundWords[index - 1]?.split("");

  useEffect(() => {
    const pickedArray = pickedWord.split("");
    let counter = 0;
    for (let i = 0; i < 5; i++) {
      if (foundWord && foundWord[i] === pickedArray[i]) {
        counter++;
        if (counter === 5) {
          const timeout = setTimeout(() => {
            setGameState(1);
            // alert(` ניצחת תוך ${currentRowIndex - 1} ניסיונות!! `);
            setShowEndGame(true);
          }, 300);
        }
        setCorrect((prevCorrect) => ({ ...prevCorrect, [i]: foundWord[i] }));
      } else if (foundWord && pickedArray.includes(foundWord[i])) {
        setAlmost((prevAlmost) => ({ ...prevAlmost, [i]: foundWord[i] }));
      } else {
        if (foundWord) {
          setWrong((prevWrong) => ({ ...prevWrong, [i]: foundWord[i] }));
        }
      }
    }
  }, [isCheckingWord]);

  // if (pickedWord) {
  // console.log(pickedWord, Object.keys(correct).length);
  // console.log(correct, almost, wrong);
  // }

  useEffect(() => {
    if (startNewGame) {
      setCorrect({});
      setAlmost({});
      setWrong({});
      setStartNewGame(false);
    }
  }, [startNewGame]);

  return (
    <div className={classes.wordleRow}>
      <div
        className={`${classes.wordleBlock} ${
          foundWord && correct[4] === foundWord[4]
            ? classes.correct
            : foundWord && almost[4] === foundWord[4]
            ? classes.almost
            : foundWord && wrong[4] === foundWord[4]
            ? classes.wrong
            : ""
        }`}
      >
        {foundWords[index - 1]?.length
          ? foundWord[4]
          : currentRowIndex === +index
          ? items[4]
          : ""}
      </div>
      <div
        className={`${classes.wordleBlock} ${
          foundWord && correct[3] === foundWord[3]
            ? classes.correct
            : foundWord && almost[3] === foundWord[3]
            ? classes.almost
            : foundWord && wrong[3] === foundWord[3]
            ? classes.wrong
            : ""
        }`}
      >
        {foundWords[index - 1]?.length
          ? foundWord[3]
          : currentRowIndex === +index
          ? items[3]
          : ""}
      </div>
      <div
        className={`${classes.wordleBlock} ${
          foundWord && correct[2] === foundWord[2]
            ? classes.correct
            : foundWord && almost[2] === foundWord[2]
            ? classes.almost
            : foundWord && wrong[2] === foundWord[2]
            ? classes.wrong
            : ""
        }`}
      >
        {foundWords[index - 1]?.length
          ? foundWord[2]
          : currentRowIndex === +index
          ? items[2]
          : ""}
      </div>
      <div
        className={`${classes.wordleBlock} ${
          foundWord && correct[1] === foundWord[1]
            ? classes.correct
            : foundWord && almost[1] === foundWord[1]
            ? classes.almost
            : foundWord && wrong[1] === foundWord[1]
            ? classes.wrong
            : ""
        }`}
      >
        {foundWords[index - 1]?.length
          ? foundWord[1]
          : currentRowIndex === +index
          ? items[1]
          : ""}
      </div>
      <div
        className={`${classes.wordleBlock} ${
          foundWord && correct[0] === foundWord[0]
            ? classes.correct
            : foundWord && almost[0] === foundWord[0]
            ? classes.almost
            : foundWord && wrong[0] === foundWord[0]
            ? classes.wrong
            : ""
        }`}
      >
        {foundWords[index - 1]?.length
          ? foundWord[0]
          : currentRowIndex === +index
          ? items[0]
          : ""}
      </div>
    </div>
  );
};

export default WordleRow;
