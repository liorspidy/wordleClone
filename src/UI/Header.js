import classes from "./Header.module.css";
import Menu from "./Menu";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import LightModeIcon from "@mui/icons-material/LightMode";
import InfoIcon from "@mui/icons-material/Info";
import GameModesButtons from "./GameModesButtons";

const Header = ({
  setShowAddWord,
  showAddWord,
  setLightMode,
  lightMode,
  setShowHowToPlay,
}) => {
  const { gameMode } = useContext(AppContext);
  const [showGameModes, setShowGameModes] = useState(false);

  // const showAddWordHandler = () => {
  //   setShowAddWord(true);
  // };

  const nightModeHandler = () => {
    setLightMode((prevState) => {
      return !prevState;
    });
  };

  const howToPlayHandler = () => {
    setShowHowToPlay((prevState) => {
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
        <div className={classes.infoIcon}>
          <InfoIcon onClick={howToPlayHandler} />
        </div>
      </div>
      <div className={classes.gameTitle}>
        <b>וורדל + </b>| {gameMode === "daily" ? "יומי" : "אינסופי"}
      </div>
      <div className={classes.rightButtons}>
        <GameModesButtons
          showGameModes={showGameModes}
          setShowGameModes={setShowGameModes}
        />
      </div>
    </div>
  );
};

export default Header;
