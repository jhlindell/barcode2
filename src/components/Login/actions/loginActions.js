import axios from "axios";
import { AUTH_USER, SET_USERNAME, AUTH_ERROR, CLEAR_AUTH_ERROR, USER_LOGOUT, SIGNUP_ONCHANGE, CLEAR_SIGNUP } from './types';
const URL = process.env.REACT_APP_SERVER_URL;

export function signUpUser({ username, email, password }) {
  return function (dispatch) {
    axios.post(`${URL}/signup`, { username, email, password })
      .then(response => {
        if (response.data.token) {
          dispatch({ type: AUTH_USER, payload: response.data.token });
          dispatch({ type: SET_USERNAME, payload: username })
        } else {
          dispatch(authError(response.data.error));
        }
      })
      .catch((error) => {
        dispatch(authError('duplicate username or email'));
      });
  }
}

export function authError(error) {
  return { type: AUTH_ERROR, payload: error };
}

export function clearAuthError() {
  return { type: CLEAR_AUTH_ERROR };
}

export function signInUser({ username, password }) {
  return function (dispatch) {
    axios.post(`${URL}/signin`, { username, password })
      .then(response => {
        dispatch({ type: AUTH_USER, payload: response.data.token });
        dispatch({ type: SET_USERNAME, payload: username });
      })
      .catch((response) => {
        dispatch(authError(response));
      });
  }
}

export function signoutUser() {
  localStorage.removeItem('token');
  return { type: USER_LOGOUT };
}

export function getUserName() {
  return function (dispatch, getState) {
    const { auth } = getState();
    axios.get(`${URL}/username`, { headers: { authorization: auth.token } })
      .then(response => {
        dispatch({ type: SET_USERNAME, payload: response.data });
      })
      .catch(error => {
        let err = error.toString();
        console.log(err);
      })
  }
}

export function signupOnChange(value) {
  return { type: SIGNUP_ONCHANGE, payload: value };
}

export function clearSignup() {
  return { type: CLEAR_SIGNUP };
}
