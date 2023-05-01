import BackspaceIcon from "@mui/icons-material/Backspace";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import classes from "./Keyboard.module.css";

const BackspaceKey = () => {
  const { setCurrentWord } = useContext(AppContext);
  const keyHandler = () => {
    setCurrentWord((prevState) => {
      if (prevState.length === 0) {
        return "";
      } else {
        return prevState.slice(0, -1);
      }
    });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Backspace") {
      keyHandler();
    }
  };

  return (
    <div
      className={classes.bigkeyboardKey}
      onClick={keyHandler}
      onKeyDown={handleKeyPress}
    >
      <BackspaceIcon />
    </div>
  );
};

export default BackspaceKey;
