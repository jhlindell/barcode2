import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { isMobile } from 'react-device-detect';
import Navbar from '../Navbar/Navbar';
import Home from '../Home/Home';
import Signin from '../Login/components/SigninContainer';
import Signup from '../Login/components/SignupContainer';
import Messages from '../Messages/components/Messages';
import StockItemList from '../StockItems/components/StockItemListContainer';
import StockItemDetail from '../StockItems/components/StockItemDetailContainer';
import StockItemCreate from '../StockItems/components/StockItemCreate';
import StockItemEdit from '../StockItems/components/StockItemEdit';
import PrivateRoute from '../utils/PrivateRoute';
import RecipeList from '../Recipes/components/RecipeListContainer';
import RecipeDetail from '../Recipes/components/RecipeDetailContainer';

const useStyles = makeStyles({
  appRoot: {
    height: '100vh',
  },
  mobile: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
  },
  message: {
    display: 'flex',
    margin: 'auto',
  },
});

function App() {
  const classes = useStyles();

  if (isMobile) {
    return (
      <div className={classes.mobile}>
        <div className={classes.message}>
          <p>
            You cannot view this site on a mobile device. Please visit with a
            desktop device
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.appRoot}>
      <Navbar />
      <Container maxWidth="md">
        <Switch>
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />

          <Route
            exact
            path="/stockitems/edit/:id"
            component={PrivateRoute(StockItemEdit)}
          />
          <Route
            exact
            path="/stockitems/create"
            component={PrivateRoute(StockItemCreate)}
          />
          <Route exact path="/stockitems" component={StockItemList} />
          <Route path="/stockitems/:id" component={StockItemDetail} />

          <Route exact path="/recipes" component={RecipeList} />
          <Route path="/recipes/:id" component={RecipeDetail} />

          <Route exact path="/" component={Home} />
        </Switch>
      </Container>
      <Messages />
    </div>
  );
}

export default App;
