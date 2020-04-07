import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from '../Navbar/Navbar';
import Home from '../Home/Home';
import Signin from '../Login/components/SigninContainer';
import Signup from '../Login/components/SignupContainer';
import Messages from '../Messages/components/Messages';
import StockItemList from '../StockItems/components/StockItemListContainer';

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
        <Route exact path='/' component={Home} />

        <Route exact path='/stockitems' component={StockItemList} />
      </Switch>
      <Messages />
    </div>
  );
}

export default App;
