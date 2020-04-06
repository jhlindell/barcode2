import axios from "axios";
import {
  AUTH_USER,
  SET_USERNAME,
  USER_LOGOUT,
  SIGNUP_ONCHANGE,
  CLEAR_SIGNUP,
  SET_SIGNUP_ERRORS,
  CLEAR_SIGNUP_ERRORS
} from './types';
import { addMessageToContainer, messageType } from '../../Messages/actions';
const URL = process.env.REACT_APP_SERVER_URL;

const styleErrorCode = (responseMessage) => {
  if (responseMessage.includes('401')) {
    return 'bad username or password';
  }
  return responseMessage;
}

export function signUpUser({ username, email, password }) {
  return function (dispatch) {
    axios.post(`${URL}/signup`, { username, email, password })
      .then(response => {
        if (response.data.token) {
          dispatch({ type: AUTH_USER, payload: response.data.token });
          dispatch({ type: SET_USERNAME, payload: username })
        } else {
          dispatch(addMessageToContainer(response.data.error, messageType.ERROR));
        }
      })
      .catch((error) => {
        dispatch(addMessageToContainer('duplicate username or email', messageType.ERROR));
      });
  }
}

export function signInUser({ username, password }) {
  return function (dispatch) {
    axios.post(`${URL}/signin`, { username, password })
      .then(response => {
        dispatch({ type: AUTH_USER, payload: response.data.token });
        dispatch({ type: SET_USERNAME, payload: username });
      })
      .catch((response) => {
        const errorMessage = styleErrorCode(response.message);
        dispatch(addMessageToContainer(errorMessage, messageType.ERROR));
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
        const string = response.data;
        const capString = string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
        dispatch({ type: SET_USERNAME, payload: capString });
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

export function setSignupErrors(errors) {
  return { type: SET_SIGNUP_ERRORS, payload: errors };
}

export function clearSignupErrors() {
  return { type: CLEAR_SIGNUP_ERRORS };
}
