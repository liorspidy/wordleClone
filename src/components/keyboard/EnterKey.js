import classes from "./Keyboard.module.css";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import wordsDb from "../../merged_words.json";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
const EnterKey = () => {
  const { setIsCheckingWord, currentWord, setWrongWord } =
    useContext(AppContext);

  const handleKeyPress = () => {
    if (currentWord.length === 5 && wordsDb.includes(currentWord)) {
      setIsCheckingWord(true);
    } else if (currentWord.length === 5 && !wordsDb.includes(currentWord)) {
      setWrongWord(true);
    } else if (currentWord.length < 5) {
      return;
    }
  };

  return (
    <div className={classes.bigkeyboardKey} onClick={handleKeyPress}>
      <KeyboardReturnIcon />
    </div>
  );
};

export default EnterKey;
