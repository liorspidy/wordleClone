import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ScheduleIcon from "@mui/icons-material/Schedule";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import "./Snackbar.css";
import { AppContext } from "../context/AppContext";
import wordsDb from "../merged_words.json";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function CustomizedMenus() {
  const [anchorEl, setAnchorEl] = React.useState(null);
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
  } = React.useContext(AppContext);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dailyHandler = () => {
    setAnchorEl(null);
    setGameMode("daily");
    localStorage.setItem("gameMode", "daily");
    if (gameMode !== "daily") {
      setAlmostLetters({});
      setWrongLetters({});
      setCorrectLetters({});
      setFoundWords([]);
    }
  };

  const InfinityHndler = () => {
    setAnchorEl(null);
    setGameMode("infinity");
    localStorage.setItem("gameMode", "infinity");
    setAlmostLetters({});
    setWrongLetters({});
    setCorrectLetters({});
    setCurrentRowIndex(1);
    setFoundWords([]);
    setGameState(0);
    localStorage.removeItem("pickedWord");
    const rand = Math.floor(Math.random() * wordsDb.length);
    setPickedWord(wordsDb[rand]);
    localStorage.setItem("pickedWord", wordsDb[rand]);
  };

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        // color="primary"
      >
        מצב משחק
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={dailyHandler} disableRipple>
          <ScheduleIcon />
          משחק יומי
        </MenuItem>
        <MenuItem onClick={InfinityHndler} disableRipple>
          <AllInclusiveIcon />
          משחק אינסופי
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
