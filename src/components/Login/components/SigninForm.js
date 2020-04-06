import React from 'react';
import TextField from '../../commonComponents/TextField';
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  field: {
    width: 400,
    paddingBottom: 20,
  },
  cardContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '92vh'
  },
  card: {
    display: 'flex',
    margin: 'auto'
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  cardHeader: {
    textAlign: 'center',
    backgroundColor: 'lightgray'
  },
  cardActions: {
    justifyContent: 'center'
  }
});

function SigninForm(props) {
  const classes = useStyles();
  const { onChange, cancel, onSubmit, signup } = props;
  const { username, password, errors } = signup;

  const usernameOnChange = newValue => {
    const newSignup = { ...signup, username: newValue };
    onChange(newSignup);
  }

  const passwordOnChange = newValue => {
    const newSignup = { ...signup, password: newValue };
    onChange(newSignup);
  }

  const onKeyDown = event => {
    if (event.key === 'Enter' || event.key === 'NumpadEnter') {
      event.preventDefault();
      event.stopPropagation();
      onSubmit();
    }
  }

  return (
    <div className={classes.cardContainer}>
      <Card>
        <CardHeader
          title="Please Sign In"
          className={classes.cardHeader}
        />
        <CardContent>
          <div className={classes.formContainer} onKeyDown={onKeyDown}>
            <TextField
              value={username}
              error={errors.username}
              label="Username"
              className={classes.field}
              onChange={usernameOnChange}
            />
            <TextField
              value={password}
              error={errors.password}
              label="Password"
              className={classes.field}
              onChange={passwordOnChange}
            />
          </div>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button
            variant="contained"
            color="primary"
            onClick={onSubmit}
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={cancel}
          >
            Cancel
          </Button>
        </CardActions>
      </Card>
    </div>
  )
}

export default SigninForm;