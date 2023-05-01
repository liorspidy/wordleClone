import KeyboardKey from './KeyboardKey';
import classes from './Keyboard.module.css';
import BackspaceKey from './BackspaceKey';
import EnterKey from './EnterKey';
import wordsDb from '../../words.json';
import { useContext, useRef } from 'react';
import { AppContext } from '../../context/AppContext';

const Keyboard = () => {
  const inputRef = useRef(null);
  const {
    setCurrentRowIndex,
    setCurrentWord,
    currentWord,
    setIsCheckingWord,
    correctLetters,
    wrongLetters,
    almostLetters,
  } = useContext(AppContext);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && currentWord?.length === 5) {
      if (wordsDb?.includes(currentWord)) {
        setIsCheckingWord(true);
      } else if (!wordsDb?.includes(currentWord)) {
        alert('המילה הזו אינה נמצאת במילון');
      }
    } else if (currentWord?.length < 5) {
      return;
    }
  };

  window.addEventListener('keypress', () => {
    inputRef?.current.focus();
  });

  const inputHandler = (event) => {
    const hebrewLettersPattern = /^[\u0590-\u05FF\s]*$/; // regex pattern for Hebrew letters or an empty string
    if (hebrewLettersPattern.test(event.target.value)) {
      try {
        if (event.target.value.length < 5) {
          let newChar;
          const lastChar = event.target.value.slice(-1);
          switch (lastChar) {
            case 'ן':
              newChar = event.target.value.slice(0, -1) + 'נ';
              break;
            case 'ם':
              newChar = event.target.value.slice(0, -1) + 'מ';
              break;
            case 'ף':
              newChar = event.target.value.slice(0, -1) + 'פ';
              break;
            case 'ץ':
              newChar = event.target.value.slice(0, -1) + 'צ';
              break;
            case 'ך':
              newChar = event.target.value.slice(0, -1) + 'כ';
              break;
            default:
              newChar = event.target.value;
              break;
          }
          setCurrentWord(newChar);
        } else if (event.target.value.length === 5) {
          let newChar;
          const lastChar = event.target.value.slice(-1);
          switch (lastChar) {
            case 'נ':
              newChar = event.target.value.slice(0, -1) + 'ן';
              break;
            case 'מ':
              newChar = event.target.value.slice(0, -1) + 'ם';
              break;
            case 'פ':
              newChar = event.target.value.slice(0, -1) + 'ף';
              break;
            case 'צ':
              newChar = event.target.value.slice(0, -1) + 'ץ';
              break;
            case 'כ':
              newChar = event.target.value.slice(0, -1) + 'ך';
              break;
            default:
              newChar = event.target.value;
              break;
          }
          setCurrentWord(newChar);
        }
      } catch (error) {
        console.log('Error setting current word: ', error);
      }
    }
  };

  return (
    <div className={classes.keyboardBox}>
      <div className={classes.keyboardRow}>
        <BackspaceKey setCurrentWord={setCurrentWord} />
        <KeyboardKey
          letter={`${currentWord.length === 4 ? 'ף' : 'פ'}`}
          setCurrentWord={setCurrentWord}
          currentWord={currentWord}
          style={{
            backgroundColor:
              Object.keys(correctLetters).includes('פ') ||
              Object.keys(correctLetters).includes('ף')
                ? '#2f872a'
                : Object.keys(almostLetters).includes('פ') ||
                  Object.keys(almostLetters).includes('ף')
                ? '#cb912e'
                : Object.keys(wrongLetters).includes('פ') ||
                  Object.keys(wrongLetters).includes('ף')
                ? '#aaa'
                : '',
            transition: 'background-color 0.2s ease',
          }}
        />
        <KeyboardKey
          letter="ו"
          setCurrentWord={setCurrentWord}
          currentWord={currentWord}
          style={{
            backgroundColor: Object.keys(correctLetters).includes('ו')
              ? '#2f872a'
              : Object.keys(almostLetters).includes('ו')
              ? '#cb912e'
              : Object.keys(wrongLetters).includes('ו')
              ? '#aaa'
              : '',
            transition: 'background-color 0.2s ease',
          }}
        />
        <KeyboardKey
          letter="ט"
          setCurrentWord={setCurrentWord}
          currentWord={currentWord}
          style={{
            backgroundColor: Object.keys(correctLetters).includes('ט')
              ? '#2f872a'
              : Object.keys(almostLetters).includes('ט')
              ? '#cb912e'
              : Object.keys(wrongLetters).includes('ט')
              ? '#aaa'
              : '',
            transition: 'background-color 0.2s ease',
          }}
        />
        <KeyboardKey
          letter="א"
          setCurrentWord={setCurrentWord}
          currentWord={currentWord}
          style={{
            backgroundColor: Object.keys(correctLetters).includes('א')
              ? '#2f872a'
              : Object.keys(almostLetters).includes('א')
              ? '#cb912e'
              : Object.keys(wrongLetters).includes('א')
              ? '#aaa'
              : '',
            transition: 'background-color 0.2s ease',
          }}
        />
        <KeyboardKey
          letter="ר"
          setCurrentWord={setCurrentWord}
          currentWord={currentWord}
          style={{
            backgroundColor: Object.keys(correctLetters).includes('ר')
              ? '#2f872a'
              : Object.keys(almostLetters).includes('ר')
              ? '#cb912e'
              : Object.keys(wrongLetters).includes('ר')
              ? '#aaa'
              : '',
            transition: 'background-color 0.2s ease',
          }}
        />
        <KeyboardKey
          letter="ק"
          setCurrentWord={setCurrentWord}
          currentWord={currentWord}
          style={{
            backgroundColor: Object.keys(correctLetters).includes('ק')
              ? '#2f872a'
              : Object.keys(almostLetters).includes('ק')
              ? '#cb912e'
              : Object.keys(wrongLetters).includes('ק')
              ? '#aaa'
              : '',
            transition: 'background-color 0.2s ease',
          }}
        />
        <KeyboardKey style={{ visibility: 'hidden' }} letter="" />
      </div>
      <div className={classes.keyboardRow}>
        <KeyboardKey
          letter="ל"
          setCurrentWord={setCurrentWord}
          currentWord={currentWord}
          style={{
            backgroundColor: Object.keys(correctLetters).includes('ל')
              ? '#2f872a'
              : Object.keys(almostLetters).includes('ל')
              ? '#cb912e'
              : Object.keys(wrongLetters).includes('ל')
              ? '#aaa'
              : '',
            transition: 'background-color 0.2s ease',
          }}
        />
        <KeyboardKey
          letter="ח"
          setCurrentWord={setCurrentWord}
          currentWord={currentWord}
          style={{
            backgroundColor: Object.keys(correctLetters).includes('ח')
              ? '#2f872a'
              : Object.keys(almostLetters).includes('ח')
              ? '#cb912e'
              : Object.keys(wrongLetters).includes('ח')
              ? '#aaa'
              : '',
            transition: 'background-color 0.2s ease',
          }}
        />
        <KeyboardKey
          letter="י"
          setCurrentWord={setCurrentWord}
          currentWord={currentWord}
          style={{
            backgroundColor: Object.keys(correctLetters).includes('י')
              ? '#2f872a'
              : Object.keys(almostLetters).includes('י')
              ? '#cb912e'
              : Object.keys(wrongLetters).includes('י')
              ? '#aaa'
              : '',
            transition: 'background-color 0.2s ease',
          }}
        />
        <KeyboardKey
          letter="ע"
          setCurrentWord={setCurrentWord}
          currentWord={currentWord}
          style={{
            backgroundColor: Object.keys(correctLetters).includes('ע')
              ? '#2f872a'
              : Object.keys(almostLetters).includes('ע')
              ? '#cb912e'
              : Object.keys(wrongLetters).includes('ע')
              ? '#aaa'
              : '',
            transition: 'background-color 0.2s ease',
          }}
        />
        <KeyboardKey
          letter={`${currentWord.length === 4 ? 'ך' : 'כ'}`}
          setCurrentWord={setCurrentWord}
          currentWord={currentWord}
          style={{
            backgroundColor:
              Object.keys(correctLetters).includes('כ') ||
              Object.keys(correctLetters).includes('ך')
                ? '#2f872a'
                : Object.keys(almostLetters).includes('כ') ||
                  Object.keys(almostLetters).includes('ך')
                ? '#cb912e'
                : Object.keys(wrongLetters).includes('כ') ||
                  Object.keys(wrongLetters).includes('ך')
                ? '#aaa'
                : '',
            transition: 'background-color 0.2s ease',
          }}
        />
        <KeyboardKey
          letter="ג"
          setCurrentWord={setCurrentWord}
          currentWord={currentWord}
          style={{
            backgroundColor: Object.keys(correctLetters).includes('ג')
              ? '#2f872a'
              : Object.keys(almostLetters).includes('ג')
              ? '#cb912e'
              : Object.keys(wrongLetters).includes('ג')
              ? '#aaa'
              : '',
            transition: 'background-color 0.2s ease',
          }}
        />
        <KeyboardKey
          letter="ד"
          setCurrentWord={setCurrentWord}
          currentWord={currentWord}
          style={{
            backgroundColor: Object.keys(correctLetters).includes('ד')
              ? '#2f872a'
              : Object.keys(almostLetters).includes('ד')
              ? '#cb912e'
              : Object.keys(wrongLetters).includes('ד')
              ? '#aaa'
              : '',
            transition: 'background-color 0.2s ease',
          }}
        />
        <KeyboardKey
          letter="ש"
          setCurrentWord={setCurrentWord}
          currentWord={currentWord}
          style={{
            backgroundColor: Object.keys(correctLetters).includes('ש')
              ? '#2f872a'
              : Object.keys(almostLetters).includes('ש')
              ? '#cb912e'
              : Object.keys(wrongLetters).includes('ש')
              ? '#aaa'
              : '',
            transition: 'background-color 0.2s ease',
          }}
        />
      </div>
      <div className={classes.keyboardRow}>
        <EnterKey
          currentWord={currentWord}
          setCurrentWord={setCurrentWord}
          setCurrentRowIndex={setCurrentRowIndex}
        />
        <KeyboardKey
          letter="ת"
          setCurrentWord={setCurrentWord}
          currentWord={currentWord}
          style={{
            backgroundColor: Object.keys(correctLetters).includes('ת')
              ? '#2f872a'
              : Object.keys(almostLetters).includes('ת')
              ? '#cb912e'
              : Object.keys(wrongLetters).includes('ת')
              ? '#aaa'
              : '',
            transition: 'background-color 0.2s ease',
          }}
        />
        <KeyboardKey
          letter={`${currentWord.length === 4 ? 'ץ' : 'צ'}`}
          setCurrentWord={setCurrentWord}
          currentWord={currentWord}
          style={{
            backgroundColor:
              Object.keys(correctLetters).includes('צ') ||
              Object.keys(correctLetters).includes('ץ')
                ? '#2f872a'
                : Object.keys(almostLetters).includes('צ') ||
                  Object.keys(almostLetters).includes('ץ')
                ? '#cb912e'
                : Object.keys(wrongLetters).includes('צ') ||
                  Object.keys(wrongLetters).includes('ץ')
                ? '#aaa'
                : '',
            transition: 'background-color 0.2s ease',
          }}
        />
        <KeyboardKey
          letter={`${currentWord.length === 4 ? 'ם' : 'מ'}`}
          setCurrentWord={setCurrentWord}
          currentWord={currentWord}
          style={{
            backgroundColor:
              Object.keys(correctLetters).includes('מ') ||
              Object.keys(correctLetters).includes('ם')
                ? '#2f872a'
                : Object.keys(almostLetters).includes('מ') ||
                  Object.keys(almostLetters).includes('ם')
                ? '#cb912e'
                : Object.keys(wrongLetters).includes('מ') ||
                  Object.keys(wrongLetters).includes('ם')
                ? '#aaa'
                : '',
            transition: 'background-color 0.2s ease',
          }}
        />
        <KeyboardKey
          letter={`${currentWord.length === 4 ? 'ן' : 'נ'}`}
          setCurrentWord={setCurrentWord}
          currentWord={currentWord}
          style={{
            backgroundColor:
              Object.keys(correctLetters).includes('נ') ||
              Object.keys(correctLetters).includes('ן')
                ? '#2f872a'
                : Object.keys(almostLetters).includes('נ') ||
                  Object.keys(almostLetters).includes('ן')
                ? '#cb912e'
                : Object.keys(wrongLetters).includes('נ') ||
                  Object.keys(wrongLetters).includes('ן')
                ? '#aaa'
                : '',
            transition: 'background-color 0.2s ease',
          }}
        />
        <KeyboardKey
          letter="ה"
          setCurrentWord={setCurrentWord}
          currentWord={currentWord}
          style={{
            backgroundColor: Object.keys(correctLetters).includes('ה')
              ? '#2f872a'
              : Object.keys(almostLetters).includes('ה')
              ? '#cb912e'
              : Object.keys(wrongLetters).includes('ה')
              ? '#aaa'
              : '',
            transition: 'background-color 0.2s ease',
          }}
        />
        <KeyboardKey
          letter="ב"
          setCurrentWord={setCurrentWord}
          currentWord={currentWord}
          style={{
            backgroundColor: Object.keys(correctLetters).includes('ב')
              ? '#2f872a'
              : Object.keys(almostLetters).includes('ב')
              ? '#cb912e'
              : Object.keys(wrongLetters).includes('ב')
              ? '#aaa'
              : '',
            transition: 'background-color 0.2s ease',
          }}
        />
        <KeyboardKey
          letter="ס"
          setCurrentWord={setCurrentWord}
          currentWord={currentWord}
          style={{
            backgroundColor: Object.keys(correctLetters).includes('ס')
              ? '#2f872a'
              : Object.keys(almostLetters).includes('ס')
              ? '#cb912e'
              : Object.keys(wrongLetters).includes('ס')
              ? '#aaa'
              : '',
            transition: 'background-color 0.2s ease',
          }}
        />
        <KeyboardKey
          letter="ז"
          setCurrentWord={setCurrentWord}
          currentWord={currentWord}
          style={{
            backgroundColor: Object.keys(correctLetters).includes('ז')
              ? '#2f872a'
              : Object.keys(almostLetters).includes('ז')
              ? '#cb912e'
              : Object.keys(wrongLetters).includes('ז')
              ? '#aaa'
              : '',
            transition: 'background-color 0.2s ease',
          }}
        />
      </div>
      <input
        className={classes.keyboardInput}
        type="text"
        value={currentWord.trim()}
        autoFocus
        ref={inputRef}
        maxLength={5}
        onChange={inputHandler}
        onKeyDown={handleKeyPress}
      />
    </div>
  );
};

export default Keyboard;
