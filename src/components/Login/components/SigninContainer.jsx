import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  signupOnChange,
  clearSignup,
  signInUser,
  setSignupErrors,
  clearSignupErrors
} from '../actions';
import SigninForm from './SigninForm';

function SigninContainer(props) {
  const dispatch = useDispatch();
  const signup = useSelector(state => state.signup);
  const { authenticated } = useSelector(state => state.auth);
  const { history } = props;

  useEffect(() => {
    if (authenticated) {
      history.push('/stockitems');
    }
  }, [authenticated, history]);

  function handleOnChange(newSignupValue) {
    dispatch(signupOnChange(newSignupValue));
  };

  function cancel() {
    dispatch(clearSignup());
    history.push('/');
  };

  function validate() {
    dispatch(clearSignupErrors());
    const errors = {
      username: undefined,
      email: undefined,
      password: undefined,
      confirmPassword: undefined,
    };
    let isValid = true;

    if (!signup.username) {
      errors.username = 'Please enter a username';
      isValid = false;
    }

    if (!signup.password) {
      errors.password = 'Please enter a password';
      isValid = false;
    }

    if (isValid === false) {
      console.log(errors);
      dispatch(setSignupErrors(errors));
    }
    return isValid;
  }

  function handleOnSubmit() {
    const valid = validate();
    if (valid) {
      dispatch(signInUser({ username: signup.username, password: signup.password }));
      dispatch(clearSignup());
    }
  };

  return (
    <div>
      <SigninForm
        signup={signup}
        cancel={cancel}
        onChange={handleOnChange}
        onSubmit={handleOnSubmit}
      />
    </div>
  );
}

export default SigninContainer;