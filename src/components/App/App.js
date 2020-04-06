import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from '../Navbar/Navbar';
import Home from '../Home/Home';
import Signin from '../Login/components/SigninContainer';
import Signup from '../Login/components/SignupContainer';

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
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
