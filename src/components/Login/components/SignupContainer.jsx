import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  signupOnChange,
  clearSignup,
  signUpUser,
  setSignupErrors,
  clearSignupErrors
} from '../actions';
import SignupForm from './SignupForm';

function SignupContainer(props) {
  const dispatch = useDispatch();
  const signup = useSelector(state => state.signup);
  const auth = useSelector(state => state.auth);
  const [showTerms, setShowTerms] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const { history } = props;

  useEffect(() => {
    if (auth.authenticated) {
      history.push('recipes');
    }
  }, [auth, history]);

  function cancel() {
    dispatch(clearSignup());
    history.push('/');
  };

  function handleOnChange(newSignupValue) {
    dispatch(signupOnChange(newSignupValue));
  };

  function agreeToTerms() {
    setShowTerms(false);
    setTermsAccepted(true);
  }

  function showToS() {
    setShowTerms(true);
  }

  function validate() {
    dispatch(clearSignupErrors());
    const errors = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
    let isValid = true;

    if (!signup.username) {
      errors.username = 'Please enter a username';
      isValid = false;
    }

    if (!signup.email) {
      errors.email = 'Please enter an email';
      isValid = false;
    }

    if (!signup.password) {
      errors.password = 'Please enter a password';
      isValid = false;
    }

    if (!signup.confirmPassword) {
      errors.confirmPassword = 'Please enter a password confirmation';
      isValid = false;
    }

    if (signup.password !== signup.confirmPassword) {
      errors.password = 'Passwords must match';
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
      let modProps = {
        username: signup.username.toLowerCase(),
        email: signup.email.toLowerCase(),
        password: signup.password,
        passwordConfirm: signup.passwordConfirm,
      };
      dispatch(signUpUser(modProps));
      dispatch(clearSignup());
    }
  }

  return (
    <div>
      <SignupForm
        signup={signup}
        cancel={cancel}
        onChange={handleOnChange}
        onSubmit={handleOnSubmit}
        agreeToTerms={agreeToTerms}
        showToS={showToS}
        showTerms={showTerms}
        termsAccepted={termsAccepted}
      />
    </div>
  );
}

export default SignupContainer;