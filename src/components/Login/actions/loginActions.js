import axios from "axios";
import {
  AUTH_USER,
  UNAUTH_USER,
  SET_USERNAME,
  CLEAR_USERNAME,
  SIGNUP_ONCHANGE,
  CLEAR_SIGNUP,
  SET_SIGNUP_ERRORS,
  CLEAR_SIGNUP_ERRORS
} from './types';
import { CLEAR_STOCK_ITEM_LIST } from '../../StockItems/actions';
import { addMessageToContainer, messageType } from '../../Messages/actions';
import { push } from 'connected-react-router';
const URL = process.env.REACT_APP_SERVER_URL;

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
        dispatch(addMessageToContainer('Duplicate username or email', messageType.ERROR));
      });
  }
}

export function signInUser({ username, password }) {
  return function (dispatch) {
    axios.post(`${URL}/signin`, { username, password })
      .then(response => {
        const capString = username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();
        dispatch({ type: AUTH_USER, payload: response.data.token });
        dispatch({ type: SET_USERNAME, payload: capString });
      })
      .catch((response) => {
        let errorMessage = response.message;
        if (errorMessage.includes('401')) {
          errorMessage = 'Bad username or password';
        }
        dispatch(addMessageToContainer(errorMessage, messageType.ERROR));
      });
  }
}

export function signoutUser() {
  return function (dispatch) {
    localStorage.removeItem('token');
    dispatch({ type: CLEAR_USERNAME });
    dispatch({ type: UNAUTH_USER });
    dispatch({ type: CLEAR_STOCK_ITEM_LIST });
    dispatch(push('/'));
  }
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
