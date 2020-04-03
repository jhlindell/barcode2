import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: 10,
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
  },
  login: {
    flexGrow: 0,
  },
  buttonLink: {
    textDecoration: 'none',
    color: 'black',
  },
});

function Navbar() {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleHomeClick = () => {
    setAnchorEl(null);
    history.push('/home');
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
          >
            <MenuItem onClick={handleHomeClick}>Home</MenuItem>
          </Menu>
          <Typography variant="h6" className={classes.title}>
            BarCode
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
