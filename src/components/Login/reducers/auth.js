import { AUTH_USER } from '../actions';

const initialState = {
  token: undefined,
  authenticated: false,
  error: undefined
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_USER:
      localStorage.setItem('token', action.payload);
      return { ...state, error: '', authenticated: true, token: action.payload };
    default:
      return state;
  }
}