import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import classes from './Keyboard.module.css';

const KeyboardKey = ({ letter, style }) => {
  const { currentWord, setCurrentWord } = useContext(AppContext);

  const currentWordHandler = () => {
    if (currentWord.length < 5) {
      setCurrentWord((prevState) => {
        return prevState + letter;
      });
    }
  };
  return (
    <div
      style={style}
      className={classes.keyboardKey}
      onClick={currentWordHandler}
    >
      {letter}
    </div>
  );
};

export default KeyboardKey;
