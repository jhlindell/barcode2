import React from 'react';
import TextField from '../../commonComponents/TextField';
import TermsOfService from './TermsOfService';
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

function SignupForm(props) {
  const classes = useStyles();
  const {
    onChange,
    cancel,
    onSubmit,
    signup,
    agreeToTerms,
    showToS,
    showTerms,
    termsAccepted
  } = props;
  const { username, password, email, errors, confirmPassword } = signup;

  const usernameOnChange = newValue => {
    const newSignup = { ...signup, username: newValue };
    onChange(newSignup);
  }

  const emailOnChange = newValue => {
    const newSignup = { ...signup, email: newValue };
    onChange(newSignup);
  }

  const passwordOnChange = newValue => {
    const newSignup = { ...signup, password: newValue };
    onChange(newSignup);
  }

  const confirmPasswordOnChange = newValue => {
    const newSignup = { ...signup, confirmPassword: newValue };
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
      {showTerms ? (
        <TermsOfService agreeToTerms={agreeToTerms} />
      ) : (
          <Card>
            <CardHeader
              title="Please Sign Up"
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
                  value={email}
                  error={errors.email}
                  label="Email"
                  className={classes.field}
                  onChange={emailOnChange}
                />
                <TextField
                  value={password}
                  error={errors.password}
                  label="Password"
                  className={classes.field}
                  onChange={passwordOnChange}
                />
                <TextField
                  value={confirmPassword}
                  error={errors.confirmPassword}
                  label="Confirm Password"
                  className={classes.field}
                  onChange={confirmPasswordOnChange}
                />
              </div>
            </CardContent>
            <CardActions className={classes.cardActions}>
              <Button
                variant="contained"
                color="secondary"
                onClick={cancel}
              >
                Cancel
          </Button>
              {termsAccepted ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={onSubmit}
                >
                  Signup
                </Button>
              ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={showToS}
                  >
                    Show Terms
                  </Button>
                )}
            </CardActions>
          </Card>
        )}
    </div>
  )
}

export default SignupForm;