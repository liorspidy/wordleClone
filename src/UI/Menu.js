import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import classes from "./Header.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";

export default function SwipeableTemporaryDrawer() {
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar alt={`Lior Fridman`} src={`liorf.jpg`} />
          </ListItemAvatar>
          <ListItemText
            primary={`Contact me`}
            secondary={`Lior fridman`}
          ></ListItemText>
        </ListItem>
        <ListItemButton href="https://github.com/liorspidy">
          <ListItemAvatar>
            <Avatar
              alt={`github`}
              src={`github.png`}
              sx={{ width: 30, height: 30 }}
            />
          </ListItemAvatar>
          <ListItemText secondary={`My Github`}></ListItemText>
        </ListItemButton>
        <ListItemButton href="https://www.linkedin.com/in/lior-fridman-603b22214/">
          <ListItemAvatar>
            <Avatar
              alt={`Linkedin`}
              src={`linkedin.png`}
              sx={{ width: 30, height: 30 }}
            />
          </ListItemAvatar>
          <ListItemText secondary={`My Linkedin`}></ListItemText>
        </ListItemButton>
        <ListItemButton href="mailto:liorspidy@gmail.com">
          <ListItemAvatar>
            <Avatar
              alt={`Gmail`}
              src={`gmail.jpg`}
              sx={{ width: 30, height: 30 }}
            />
          </ListItemAvatar>
          <ListItemText secondary={`Liorspidy@gmail.com`}></ListItemText>
        </ListItemButton>
      </List>
      <Divider />
    </Box>
  );

  return (
    <div className={classes.menuButton}>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button color="inherit" onClick={toggleDrawer(anchor, true)}>
            <MenuIcon />
          </Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
