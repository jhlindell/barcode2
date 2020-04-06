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
import { useSelector, useDispatch } from 'react-redux';
import { signoutUser } from '../Login/actions';

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
  username: {
    color: 'white',
    marginRight: 10
  },
  button: {
    marginRight: 10
  }
});

function Navbar() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const username = useSelector(state => state.username);
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

  const handleLogoutClick = () => {
    dispatch(signoutUser());
  }

  const handleLoginClick = () => {
    history.push('/signin');
  }

  const handleSignupClick = () => {
    history.push('/signup');
  }

  const renderLoginButton = () => {
    if (auth && auth.authenticated) {
      return (
        <Button variant="contained" onClick={handleLogoutClick}>
          Log Out
        </Button>
      );
    }
    return (
      <div>
        <Button
          variant="contained"
          onClick={handleLoginClick}
          className={classes.button}
        >
          Log In
        </Button>
        <Button variant="contained" onClick={handleSignupClick}>
          Sign up
        </Button>
      </div>
    )
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
          <Typography variant="h4" className={classes.title}>
            BarCode
          </Typography>
          {username ?
            <Typography variant="h6" className={classes.username}>
              Hi {username}
            </Typography>
            : null}
          {renderLoginButton()}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
