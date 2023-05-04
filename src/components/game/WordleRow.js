import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import classes from "./GameBoardStyle.module.css";

const WordleRow = ({ index }) => {
  const ROWS = 6;
  const {
    pickedWord,
    currentWord,
    currentRowIndex,
    foundWords,
    gameMode,
    startNewGame,
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
  const [foundWord, setFoundWord] = useState([]);

  const items = currentWord.split("");

  useEffect(() => {
    if (gameMode === "daily") {
      const localFoundWordsArray = JSON.parse(
        localStorage.getItem("dailyFoundWords")
      );
      const localCurrentRowIndex = localStorage.getItem("currentRowIndex");
      const localCorrect = JSON.parse(localStorage.getItem("correct"));
      const localAlmost = JSON.parse(localStorage.getItem("almost"));
      const localWrong = JSON.parse(localStorage.getItem("wrong"));
      if (localFoundWordsArray && localCurrentRowIndex) {
        setFoundWords(localFoundWordsArray);
        setCurrentRowIndex(localCurrentRowIndex);
        setFoundWord(
          localFoundWordsArray[index - 1]
            ? localFoundWordsArray[index - 1]?.split("")
            : []
        );
        setCorrect(localCorrect ? localCorrect : {});
        setAlmost(localAlmost ? localAlmost : {});
        setWrong(localWrong ? localWrong : {});
      }
    } else if (gameMode === "infinity") {
      setFoundWords([]);
      setCurrentRowIndex(1);
      setFoundWord([]);
      setCorrect({});
      setAlmost({});
      setWrong({});
      setWrongLetters({});
      setCorrectLetters({});
      setAlmostLetters({});
    }
  }, [gameMode]);

  // console.log(correct, almost, wrong, foundWord, foundWords, currentRowIndex);

  useEffect(() => {
    const pickedArray = pickedWord.split("");
    let counter = 0;
    const newCorrect = {};
    for (let i = 0; i < ROWS; i++) {
      console.log(foundWord[i]);
      if (foundWord.length && foundWord[i] === pickedArray[i]) {
        newCorrect[i] = foundWord[i];
        setCorrectLetters((prevCorrect) => {
          if (!prevCorrect.hasOwnProperty(foundWord[i])) {
            if (gameMode === "daily") {
              localStorage.setItem(
                "correct",
                JSON.stringify({
                  ...prevCorrect,
                  [foundWord[i]]: foundWord[i],
                })
              );
            }
            return {
              ...prevCorrect,
              [foundWord[i]]: foundWord[i],
            };
          }
          return;
        });

        counter++;
        if (counter === ROWS) {
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

    for (let i = 0; i < ROWS; i++) {
      const letter = foundWord.length ? foundWord[i] : null;
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
      } else if (foundWord.length) {
        setWrongLetters((prevWrong) => ({
          ...prevWrong,
          [foundWord[i]]: foundWord[i],
        }));
        setWrong((prevWrong) => ({ ...prevWrong, [i]: foundWord[i] }));
      }
    }

    // --------------------------------------------
  }, [isCheckingWord, gameMode]);

  useEffect(() => {
    if (startNewGame && gameMode === "infinity") {
      setCorrect({});
      setAlmost({});
      setWrong({});
      setStartNewGame(false);
      setWrongLetters({});
      setCorrectLetters({});
      setAlmostLetters({});
    }
  }, [startNewGame, gameMode]);

  const correctlength = Object.keys(correct).length;
  const almostlength = Object.keys(almost).length;
  const wronglength = Object.keys(wrong).length;

  return (
    <div className={classes.wordleRow}>
      <div
        className={`${classes.wordleBlock} ${
          foundWord.length && correctlength && correct[4] === foundWord[4]
            ? classes.correct
            : foundWord.length && almostlength && almost[4] === foundWord[4]
            ? classes.almost
            : foundWord.length && wronglength && wrong[4] === foundWord[4]
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
          foundWord.length && correctlength && correct[3] === foundWord[3]
            ? classes.correct
            : foundWord.length && almostlength && almost[3] === foundWord[3]
            ? classes.almost
            : foundWord.length && wronglength && wrong[3] === foundWord[3]
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
          foundWord.length && correctlength && correct[2] === foundWord[2]
            ? classes.correct
            : foundWord.length && almostlength && almost[2] === foundWord[2]
            ? classes.almost
            : foundWord.length && wronglength && wrong[2] === foundWord[2]
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
          foundWord.length && correctlength && correct[1] === foundWord[1]
            ? classes.correct
            : foundWord.length && almostlength && almost[1] === foundWord[1]
            ? classes.almost
            : foundWord.length && wronglength && wrong[1] === foundWord[1]
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
          foundWord.length && correctlength && correct[0] === foundWord[0]
            ? classes.correct
            : foundWord.length && almostlength && almost[0] === foundWord[0]
            ? classes.almost
            : foundWord.length && wronglength && wrong[0] === foundWord[0]
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
