import { AUTH_USER, AUTH_ERROR, CLEAR_AUTH_ERROR } from '../actions';

const styleErrorCode = (code) => {
  if (code.message) {
    return (code.message.includes('401')) ? 'bad username or password' : code.message
  } else {
    return code
  }
}

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
    case AUTH_ERROR:
      let error = styleErrorCode(action.payload)
      return { ...state, error };
    case CLEAR_AUTH_ERROR:
      const err = '';
      return { ...state, err };
    default:
      return state;
  }
}