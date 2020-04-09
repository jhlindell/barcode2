import React from 'react';
import TermsOfService from './TermsOfService';
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Button,
  TextField
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../../../theme';

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
    backgroundColor: theme.palette.background.header
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

  const usernameOnChange = event => {
    const newSignup = { ...signup, username: event.target.value };
    onChange(newSignup);
  }

  const emailOnChange = event => {
    const newSignup = { ...signup, email: event.target.value };
    onChange(newSignup);
  }

  const passwordOnChange = event => {
    const newSignup = { ...signup, password: event.target.value };
    onChange(newSignup);
  }

  const confirmPasswordOnChange = event => {
    const newSignup = { ...signup, confirmPassword: event.target.value };
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
                  error={errors.username !== undefined}
                  label="Username"
                  className={classes.field}
                  onChange={usernameOnChange}
                  helperText={errors.username}
                />
                <TextField
                  value={email}
                  error={errors.email !== undefined}
                  label="Email"
                  className={classes.field}
                  onChange={emailOnChange}
                  helperText={errors.email}
                />
                <TextField
                  value={password}
                  error={errors.password !== undefined}
                  label="Password"
                  className={classes.field}
                  onChange={passwordOnChange}
                  helperText={errors.password}
                  type="password"
                />
                <TextField
                  value={confirmPassword}
                  error={errors.confirmPassword !== undefined}
                  label="Confirm Password"
                  className={classes.field}
                  onChange={confirmPasswordOnChange}
                  helperText={errors.confirmPassword}
                  type="password"
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