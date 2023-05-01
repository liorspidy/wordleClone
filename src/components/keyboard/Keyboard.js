import KeyboardKey from "./KeyboardKey";
import classes from "./Keyboard.module.css";
import BackspaceKey from "./BackspaceKey";
import EnterKey from "./EnterKey";
import wordsDb from "../../words.json";
import { useContext, useRef } from "react";
import { AppContext } from "../../context/AppContext";

const Keyboard = () => {
  const inputRef = useRef(null);
  const { setCurrentRowIndex, setCurrentWord, currentWord, setIsCheckingWord } =
    useContext(AppContext);

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && currentWord?.length === 5) {
      if (wordsDb?.includes(currentWord)) {
        setIsCheckingWord(true);
      } else if (!wordsDb?.includes(currentWord)) {
        alert("המילה הזו אינה נמצאת במילון");
      }
    } else if (currentWord?.length < 5) {
      return;
    }
  };

  window.addEventListener("keypress", () => {
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
            case "ן":
              newChar = event.target.value.slice(0, -1) + "נ";
              break;
            case "ם":
              newChar = event.target.value.slice(0, -1) + "מ";
              break;
            case "ף":
              newChar = event.target.value.slice(0, -1) + "פ";
              break;
            case "ץ":
              newChar = event.target.value.slice(0, -1) + "צ";
              break;
            case "ך":
              newChar = event.target.value.slice(0, -1) + "כ";
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
            case "נ":
              newChar = event.target.value.slice(0, -1) + "ן";
              break;
            case "מ":
              newChar = event.target.value.slice(0, -1) + "ם";
              break;
            case "פ":
              newChar = event.target.value.slice(0, -1) + "ף";
              break;
            case "צ":
              newChar = event.target.value.slice(0, -1) + "ץ";
              break;
            case "כ":
              newChar = event.target.value.slice(0, -1) + "ך";
              break;
            default:
              newChar = event.target.value;
              break;
          }
          setCurrentWord(newChar);
        }
      } catch (error) {
        console.log("Error setting current word: ", error);
      }
    }
  };

  return (
    <div className={classes.keyboardBox}>
      <div className={classes.keyboardRow}>
        <BackspaceKey setCurrentWord={setCurrentWord} />
        <KeyboardKey
          letter="פ"
          setCurrentWord={setCurrentWord}
          currentWord={currentWord}
        />
        <KeyboardKey
          letter="ו"
          setCurrentWord={setCurrentWord}
          currentWord={currentWord}
        />
        <KeyboardKey
          letter="ט"
          setCurrentWord={setCurrentWord}
          currentWord={currentWord}
        />
        <KeyboardKey
          letter="א"
          setCurrentWord={setCurrentWord}
          currentWord={currentWord}
        />
        <KeyboardKey
          letter="ר"
          setCurrentWord={setCurrentWord}
          currentWord={currentWord}
        />
        <KeyboardKey
          letter="ק"
          setCurrentWord={setCurrentWord}
          currentWord={currentWord}
        />
        <KeyboardKey style={{ visibility: "hidden" }} letter="" />
      </div>
      <div className={classes.keyboardRow}>
        <KeyboardKey
          letter="ל"
          setCurrentWord={setCurrentWord}
          currentWord={currentWord}
        />
        <KeyboardKey
          letter="ח"
          setCurrentWord={setCurrentWord}
          currentWord={currentWord}
        />
        <KeyboardKey
          letter="י"
          setCurrentWord={setCurrentWord}
          currentWord={currentWord}
        />
        <KeyboardKey
          letter="ע"
          setCurrentWord={setCurrentWord}
          currentWord={currentWord}
        />
        <KeyboardKey
          letter="כ"
          setCurrentWord={setCurrentWord}
          currentWord={currentWord}
        />
        <KeyboardKey
          letter="ג"
          setCurrentWord={setCurrentWord}
          currentWord={currentWord}
        />
        <KeyboardKey
          letter="ד"
          setCurrentWord={setCurrentWord}
          currentWord={currentWord}
        />
        <KeyboardKey
          letter="ש"
          setCurrentWord={setCurrentWord}
          currentWord={currentWord}
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
        />
        <KeyboardKey
          letter="צ"
          setCurrentWord={setCurrentWord}
          currentWord={currentWord}
        />
        <KeyboardKey
          letter="מ"
          setCurrentWord={setCurrentWord}
          currentWord={currentWord}
        />
        <KeyboardKey
          letter="נ"
          setCurrentWord={setCurrentWord}
          currentWord={currentWord}
        />
        <KeyboardKey
          letter="ה"
          setCurrentWord={setCurrentWord}
          currentWord={currentWord}
        />
        <KeyboardKey
          letter="ב"
          setCurrentWord={setCurrentWord}
          currentWord={currentWord}
        />
        <KeyboardKey
          letter="ס"
          setCurrentWord={setCurrentWord}
          currentWord={currentWord}
        />
        <KeyboardKey
          letter="ז"
          setCurrentWord={setCurrentWord}
          currentWord={currentWord}
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
