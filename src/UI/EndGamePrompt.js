import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import Card from './Card';
import classes from './Card.module.css';
import wordsDb from '../words.json';

const EndGamePrompt = () => {
  const {
    pickedWord,
    gameState,
    currentRowIndex,
    showEndGame,
    setPickedWord,
    setGameState,
    setFoundWords,
    setCurrentRowIndex,
    setStartNewGame,
    setShowEndGame,
    setCurrentWord,
  } = useContext(AppContext);

  const endGameHandler = (event) => {
    event.stopPropagation();
    setShowEndGame(false);
    localStorage.removeItem('pickedWord');
    const rand = Math.floor(Math.random() * wordsDb.length);
    setPickedWord(wordsDb[rand]);
    localStorage.setItem('pickedWord', wordsDb[rand]);
    setGameState(0);
    setCurrentRowIndex(1);
    setFoundWords([]);
    setStartNewGame(true);
    setCurrentWord('');
  };

  return (
    <div
      className={`${classes.backdrop} ${showEndGame ? classes.show : ''}`}
      onClick={() => setShowEndGame(false)}
    >
      <Card onClick={(event) => event.stopPropagation()}>
        <div className={classes.endGame}>
          {gameState === 2 && (
            <h3 dir="rtl" style={{ margin: '0.5rem 0' }}>
              אוף.. לא נורא..
            </h3>
          )}
          {gameState === 1 && (
            <h2
              dir="rtl"
              style={{ margin: 0, marginTop: '0.6rem', marginBottom: '0.5rem' }}
            >
              כל הכבוד!!
            </h2>
          )}
          {gameState === 1 && (
            <h3
              dir="rtl"
              style={{ margin: 0, marginTop: '0.5rem', marginBottom: '0.5rem' }}
            >
              {currentRowIndex === 2
                ? 'ניצחת תוך ניסיון אחד!'
                : ` ניצחת תוך ${currentRowIndex - 1} ניסיונות!`}
            </h3>
          )}
          <h4 dir="rtl" style={{ margin: 0, marginBottom: '1.5rem' }}>
            המילה הייתה {pickedWord}
          </h4>
          <button tabIndex="0" className={classes.btn} onClick={endGameHandler}>
            בוא נתחיל משחק
          </button>
        </div>
      </Card>
    </div>
  );
};

export default EndGamePrompt;
