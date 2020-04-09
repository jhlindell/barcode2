import { AUTH_USER } from '../actions';

const initialState = {
  token: undefined,
  authenticated: false,
  error: undefined
}

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_USER:
      localStorage.setItem('token', action.payload);
      return { ...state, error: '', authenticated: true, token: action.payload };
    case 'UNAUTH_USER':
      localStorage.removeItem('token');
      return initialState;
    default:
      return state;
  }
}