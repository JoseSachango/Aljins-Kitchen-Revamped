import React from "react";
import Loginbutton from "./Loginbutton";
import Logoutbutton from "./Logoutbutton";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
// import Button from '@material-ui/core/Button';
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import "./NavBar.css";
import logo from "./logo.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  toolBar: {
    display: "flex",
    justifyContent: "space-between",
  },
  toolBarElements: {
    width: "33%",
  },
  toolBarImage: {
    textAlign: "center",
  },
  toolBarButtons: {
    textAlign: "right",
  },
}));

export default function Navbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar
        id="appbar"
        position="static"
        color="default"
        title={
          <img
            className={classes.log}
            src={"https://unsplash.it/40/40"}
            alt="Logo"
            height="25"
          />
        }
      >
        <Toolbar className={classes.toolBar}>
          <div className={classes.toolBarElements}>
            <Typography variant="h6" className={classes.title}>
              Aljin's Kitchen
            </Typography>
          </div>
          <div className={`${classes.toolBarImage} ${classes.toolBarElements}`}>
            <img className={classes.log} src={logo} alt="Logo" height="100" />
          </div>
          <div
            className={`${classes.toolBarElements} ${classes.toolBarButtons}`}
          >
            <Loginbutton />
            <Logoutbutton />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
