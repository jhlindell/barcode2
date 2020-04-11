import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
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
});

function App() {
  const classes = useStyles();

  return (
    <div className={classes.appRoot}>
      <Navbar />
      <Switch>
        <Route path='/signin' component={Signin} />
        <Route path='/signup' component={Signup} />

        <Route exact path='/stockitems/edit/:id' component={PrivateRoute(StockItemEdit)} />
        <Route exact path='/stockitems/create' component={PrivateRoute(StockItemCreate)} />
        <Route exact path='/stockitems' component={StockItemList} />
        <Route path='/stockitems/:id' component={StockItemDetail} />

        <Route exact path='/recipes' component={RecipeList} />
        <Route path='/recipes/:id' component={RecipeDetail} />

        <Route exact path='/' component={Home} />
      </Switch>
      <Messages />
    </div>
  );
}

export default App;
