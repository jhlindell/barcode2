import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signupOnChange, clearSignup, signInUser } from '../actions';
import SigninForm from './SigninForm';

function SigninContainer(props) {
  const dispatch = useDispatch();
  const signup = useSelector(state => state.signup);
  const { authenticated } = useSelector(state => state.auth);
  const { history } = props;

  useEffect(() => {
    if (authenticated) {
      history.push('recipes');
    }
  }, [authenticated, history]);

  function handleOnChange(newSignupValue) {
    dispatch(signupOnChange(newSignupValue));
  };

  function cancel() {
    dispatch(clearSignup());
    history.push('/');
  };

  function handleOnSubmit() {
    dispatch(signInUser({ username: signup.username, password: signup.password }));
    dispatch(clearSignup());
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