import WordleRow from './WordleRow';
import classes from './GameBoardStyle.module.css';
import { useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';

const GameBoard = () => {
  const {
    currentWord,
    setCurrentWord,
    foundWords,
    isCheckingWord,
    setIsCheckingWord,
    setFoundWords,
    setCurrentRowIndex,
  } = useContext(AppContext);

  useEffect(() => {
    if (isCheckingWord) {
      setFoundWords([...foundWords, currentWord]);
      setCurrentWord('');
      setCurrentRowIndex((prevState) => {
        return prevState + 1;
      });
      setIsCheckingWord(false);
    }
  }, [isCheckingWord]);

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
