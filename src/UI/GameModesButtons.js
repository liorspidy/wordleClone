import { useContext } from "react";
import classes from "./Header.module.css";
import { AppContext } from "../context/AppContext";
import wordsDb from "../merged_words.json";
import ScheduleIcon from "@mui/icons-material/Schedule";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import cardClasses from "./Card.module.css";

const GameModesButtons = ({ showGameModes, setShowGameModes }) => {
  const gameModesHandler = () => {
    setShowGameModes((prevState) => {
      return !prevState;
    });
  };

  const {
    setGameMode,
    setAlmostLetters,
    setCorrectLetters,
    setWrongLetters,
    gameMode,
    setFoundWords,
    setCurrentRowIndex,
    setGameState,
    setPickedWord,
    setStartNewGame,
  } = useContext(AppContext);

  const dailyHandler = () => {
    setGameMode("daily");
    localStorage.setItem("gameMode", "daily");
    if (gameMode !== "daily") {
      setAlmostLetters({});
      setWrongLetters({});
      setCorrectLetters({});
      setFoundWords([]);
      setShowGameModes(false);
    }
  };

  const InfinityHndler = () => {
    setStartNewGame(true);
    setGameMode("inf");
    localStorage.setItem("gameMode", "inf");
    setAlmostLetters({});
    setWrongLetters({});
    setCorrectLetters({});
    setCurrentRowIndex(1);
    setFoundWords([]);
    setGameState(0);
    const rand = Math.floor(Math.random() * wordsDb.length);
    setPickedWord(wordsDb[rand]);
    localStorage.setItem("pickedWord", wordsDb[rand]);
    setShowGameModes(false);
  };

  return (
    <div>
      <button className={classes.btn} onClick={gameModesHandler}>
        מצב משחק
      </button>
      {showGameModes && (
        <div
          className={`${cardClasses.backdrop} ${
            showGameModes ? cardClasses.show : ""
          }`}
          onClick={() => setShowGameModes(false)}
        >
          <div className={classes.openedGameModes}>
            <button className={classes.btn} onClick={dailyHandler}>
              <div className={classes.gameModeIcon}>
                <ScheduleIcon />
              </div>
              יומי
            </button>
            <button className={classes.btn} onClick={InfinityHndler}>
              <div className={classes.gameModeIcon}>
                <AllInclusiveIcon />
              </div>
              אינסופי
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameModesButtons;
