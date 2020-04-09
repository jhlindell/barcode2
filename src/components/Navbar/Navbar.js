import React, { useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
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
  const [navAnchorEl, setNavAnchorEl] = React.useState(null);
  const [userAnchorEl, setUserAnchorEl] = React.useState(null);

  useEffect(() => {

  });

  function handleNavMenuClick(event) {
    setNavAnchorEl(event.currentTarget);
  };

  function handleCloseNavMenu() {
    setNavAnchorEl(null);
  };

  function handleHomeClick() {
    setNavAnchorEl(null);
    history.push('/');
  };

  function handleIngredientClick() {
    setNavAnchorEl(null);
    history.push('/stockitems');
  }

  function handleRecipesClick() {
    setNavAnchorEl(null);
    history.push('/recipes');
  }

  function handleUserMenuClick(event) {
    setUserAnchorEl(event.currentTarget);
  };

  function handleCloseUserMenu() {
    setUserAnchorEl(null);
  };

  function handleLogoutClick() {
    setUserAnchorEl(null);
    dispatch(signoutUser());
  }

  function handleLoginClick() {
    setUserAnchorEl(null);
    history.push('/signin');
  }

  function handleSignupClick() {
    setUserAnchorEl(null);
    history.push('/signup');
  }

  function renderUserMenuItems() {
    if (auth && auth.authenticated) {
      return (
        <div>
          <MenuItem>{username}</MenuItem>
          <MenuItem onClick={handleLogoutClick}>LogOut</MenuItem>
        </div>
      );
    }
    return (
      <div>
        <MenuItem onClick={handleLoginClick}>Sign In</MenuItem>
        <MenuItem onClick={handleSignupClick}>Sign Up</MenuItem>
      </div>
    );
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
            onClick={handleNavMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu"
            anchorEl={navAnchorEl}
            keepMounted
            open={Boolean(navAnchorEl)}
            onClose={handleCloseNavMenu}
          >
            <MenuItem onClick={handleHomeClick}>
              Home
            </MenuItem>
            <MenuItem onClick={handleIngredientClick}>
              Ingredients
            </MenuItem>
            <MenuItem onClick={handleRecipesClick}>
              Recipes
            </MenuItem>
          </Menu>
          <Typography variant="h4" className={classes.title}>
            BarCode
          </Typography>
          <div>
            <IconButton
              aria-label="user account"
              aria-controls="menu-user"
              aria-haspopup="true"
              onClick={handleUserMenuClick}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-user"
              anchorEl={userAnchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(userAnchorEl)}
              onClose={handleCloseUserMenu}
            >
              {renderUserMenuItems()}
            </Menu>
          </div>

        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
