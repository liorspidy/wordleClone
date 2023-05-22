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
    gameMode,
    isCheckingWord,
    setGameState,
    setStartNewGame,
    setShowEndGame,
    setCorrectLetters,
    setWrongLetters,
    setAlmostLetters,
    setFoundWords,
    setCurrentRowIndex,
  } = useContext(AppContext);

  const [correct, setCorrect] = useState({});
  const [almost, setAlmost] = useState({});
  const [wrong, setWrong] = useState({});

  const items = currentWord.split("");
  const dailyPickedWord = localStorage.getItem("dailyPickedWord");
  const localFoundWords = JSON.parse(localStorage.getItem("dailyFoundWords"));
  const foundWordsArray =
    localFoundWords && gameMode === "daily" ? localFoundWords : foundWords;
  const localCurrentRowIndex = localStorage.getItem("currentRowIndex");
  const foundWord = foundWordsArray[index - 1]?.split("");

  useEffect(() => {
    const pickedArray =
      dailyPickedWord && gameMode === "daily"
        ? dailyPickedWord.split("")
        : pickedWord.split("");
    if (gameMode === "daily") {
      !localCurrentRowIndex
        ? setCurrentRowIndex(1)
        : setCurrentRowIndex(+localCurrentRowIndex);
    }
    let counter = 0;
    const newCorrect = {};
    for (let i = 0; i < 5; i++) {
      if (foundWord && foundWord[i] === pickedArray[i]) {
        newCorrect[i] = foundWord[i];
        setCorrectLetters((prevCorrect) => {
          if (!prevCorrect.hasOwnProperty(foundWord[i])) {
            return {
              ...prevCorrect,
              [foundWord[i]]: foundWord[i],
            };
          }
          return prevCorrect;
        });
        counter++;
        if (counter === 5) {
          setTimeout(() => {
            setGameState(1);
            setShowEndGame(true);
          }, 300);
        }
        setCorrect((prevCorrect) => ({ ...prevCorrect, [i]: foundWord[i] }));
      }
    }

    const filteredArray = pickedArray.filter(
      (letter, index) => !newCorrect[index] || newCorrect[index] !== letter
    );

    const equalLetters = {
      ם: "מ",
      ן: "נ",
      ץ: "צ",
      ף: "פ",
      ך: "כ",
      מ: "ם",
      נ: "ן",
      צ: "ץ",
      פ: "ף",
      כ: "ך",
    };

    for (let i = 0; i < 5; i++) {
      const letter = foundWord ? foundWord[i] : null;
      if (letter !== null && !newCorrect[i]) {
        const isLetterEqual =
          equalLetters[letter] && filteredArray.includes(equalLetters[letter]);
        if (filteredArray.includes(letter) || isLetterEqual) {
          setAlmostLetters((prevAlmost) => ({
            ...prevAlmost,
            [letter]: letter,
          }));
          setAlmost((prevAlmost) => ({ ...prevAlmost, [i]: letter }));
        } else {
          setWrongLetters((prevWrong) => ({
            ...prevWrong,
            [foundWord[i]]: foundWord[i],
          }));
          setWrong((prevWrong) => ({ ...prevWrong, [i]: foundWord[i] }));
        }
      } else if (letter in equalLetters) {
        setAlmostLetters((prevAlmost) => ({
          ...prevAlmost,
          [letter]: letter,
        }));
        setAlmost((prevAlmost) => ({ ...prevAlmost, [i]: letter }));
      } else if (foundWord) {
        setWrongLetters((prevWrong) => ({
          ...prevWrong,
          [foundWord[i]]: foundWord[i],
        }));
        setWrong((prevWrong) => ({ ...prevWrong, [i]: foundWord[i] }));
      }
    }
  }, [isCheckingWord, gameMode, startNewGame]);

  useEffect(() => {
    if (startNewGame) {
      setCorrect({});
      setAlmost({});
      setWrong({});
      setWrongLetters({});
      setCorrectLetters({});
      setAlmostLetters({});
      setFoundWords([]);
      setCurrentRowIndex(1);
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
        {foundWordsArray[index - 1]?.length
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
        {foundWordsArray[index - 1]?.length
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
        {foundWordsArray[index - 1]?.length
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
        {foundWordsArray[index - 1]?.length
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
        {foundWordsArray[index - 1]?.length
          ? foundWord[0]
          : currentRowIndex === +index
          ? items[0]
          : ""}
      </div>
    </div>
  );
};

export default WordleRow;
