import classes from './Header.module.css';
import wordsDb from '../words.json';
import Menu from './Menu';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import LightModeIcon from '@mui/icons-material/LightMode';

const Header = ({ setShowAddWord, showAddWord, setLightMode, lightMode }) => {
  const {
    setPickedWord,
    setGameState,
    setCurrentRowIndex,
    setFoundWords,
    setStartNewGame,
    setCurrentWord,
  } = useContext(AppContext);
  // const showAddWordHandler = () => {
  //   setShowAddWord(true);
  // };

  const newGameHandler = (event) => {
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

  const nightModeHandler = () => {
    setLightMode((prevState) => {
      return !prevState;
    });
  };

  return (
    <div className={classes.header}>
      <div className={classes.buttons}>
        <Menu />
        {lightMode && (
          <div className={classes.nightMode} onClick={nightModeHandler}>
            <LightModeIcon />
          </div>
        )}
        {!lightMode && (
          <div className={classes.nightMode}>
            <NightsStayIcon onClick={nightModeHandler} />
          </div>
        )}
      </div>
      <div className={classes.gameTitle}>
        <h1>ליאוורדעל</h1>
      </div>
      <div>
        {/* <button className={classes.btn} onClick={showAddWordHandler}>
          הוסף מילה
        </button> */}

        <button className={classes.btn} onClick={newGameHandler}>
          משחק חדש
        </button>
      </div>
    </div>
  );
};

export default Header;
