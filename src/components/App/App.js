import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from '../Navbar/Navbar';

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
      Woot! a react app!
    </div>
  );
}

export default App;
