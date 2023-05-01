import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import classes from './GameBoardStyle.module.css';

const WordleRow = ({ index }) => {
  const {
    pickedWord,
    currentWord,
    currentRowIndex,
    foundWords,
    startNewGame,
    isCheckingWord,
    setGameState,
    setStartNewGame,
    setShowEndGame,
    setCorrectLetters,
    setWrongLetters,
    setAlmostLetters,
  } = useContext(AppContext);
  const [correct, setCorrect] = useState({});
  const [almost, setAlmost] = useState({});
  const [wrong, setWrong] = useState({});

  const items = currentWord.split('');
  const foundWord = foundWords[index - 1]?.split('');

  useEffect(() => {
    const pickedArray = pickedWord.split('');
    let counter = 0;
    for (let i = 0; i < 5; i++) {
      if (foundWord && foundWord[i] === pickedArray[i]) {
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
          const timeout = setTimeout(() => {
            setGameState(1);
            setShowEndGame(true);
          }, 300);
        }
        setCorrect((prevCorrect) => ({ ...prevCorrect, [i]: foundWord[i] }));
      } else if (foundWord && pickedArray.includes(foundWord[i])) {
        setAlmostLetters((prevAlmost) => {
          if (!prevAlmost.hasOwnProperty(foundWord[i])) {
            return {
              ...prevAlmost,
              [foundWord[i]]: foundWord[i],
            };
          }
          return prevAlmost;
        });
        setAlmost((prevAlmost) => ({ ...prevAlmost, [i]: foundWord[i] }));
      } else {
        if (foundWord) {
          setWrongLetters((prevWrong) => {
            if (!prevWrong.hasOwnProperty(foundWord[i])) {
              return {
                ...prevWrong,
                [foundWord[i]]: foundWord[i],
              };
            }
            return prevWrong;
          });
          setWrong((prevWrong) => ({ ...prevWrong, [i]: foundWord[i] }));
        }
      }
    }
  }, [isCheckingWord]);

  useEffect(() => {
    if (startNewGame) {
      setCorrect({});
      setAlmost({});
      setWrong({});
      setStartNewGame(false);
      setWrongLetters({});
      setCorrectLetters({});
      setAlmostLetters({});
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
            : ''
        }`}
      >
        {foundWords[index - 1]?.length
          ? foundWord[4]
          : currentRowIndex === +index
          ? items[4]
          : ''}
      </div>
      <div
        className={`${classes.wordleBlock} ${
          foundWord && correct[3] === foundWord[3]
            ? classes.correct
            : foundWord && almost[3] === foundWord[3]
            ? classes.almost
            : foundWord && wrong[3] === foundWord[3]
            ? classes.wrong
            : ''
        }`}
      >
        {foundWords[index - 1]?.length
          ? foundWord[3]
          : currentRowIndex === +index
          ? items[3]
          : ''}
      </div>
      <div
        className={`${classes.wordleBlock} ${
          foundWord && correct[2] === foundWord[2]
            ? classes.correct
            : foundWord && almost[2] === foundWord[2]
            ? classes.almost
            : foundWord && wrong[2] === foundWord[2]
            ? classes.wrong
            : ''
        }`}
      >
        {foundWords[index - 1]?.length
          ? foundWord[2]
          : currentRowIndex === +index
          ? items[2]
          : ''}
      </div>
      <div
        className={`${classes.wordleBlock} ${
          foundWord && correct[1] === foundWord[1]
            ? classes.correct
            : foundWord && almost[1] === foundWord[1]
            ? classes.almost
            : foundWord && wrong[1] === foundWord[1]
            ? classes.wrong
            : ''
        }`}
      >
        {foundWords[index - 1]?.length
          ? foundWord[1]
          : currentRowIndex === +index
          ? items[1]
          : ''}
      </div>
      <div
        className={`${classes.wordleBlock} ${
          foundWord && correct[0] === foundWord[0]
            ? classes.correct
            : foundWord && almost[0] === foundWord[0]
            ? classes.almost
            : foundWord && wrong[0] === foundWord[0]
            ? classes.wrong
            : ''
        }`}
      >
        {foundWords[index - 1]?.length
          ? foundWord[0]
          : currentRowIndex === +index
          ? items[0]
          : ''}
      </div>
    </div>
  );
};

export default WordleRow;
