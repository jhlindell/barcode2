import {
  SIGNUP_ONCHANGE,
  CLEAR_SIGNUP,
  SET_SIGNUP_ERRORS,
  CLEAR_SIGNUP_ERRORS
} from '../actions';

const initialState = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  errors: {
    username: undefined,
    email: undefined,
    password: undefined,
    confirmPassword: undefined
  }
};

export default function signupReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNUP_ONCHANGE:
      return action.payload;
    case CLEAR_SIGNUP:
      return initialState;
    case SET_SIGNUP_ERRORS:
      return { ...state, errors: action.payload };
    case CLEAR_SIGNUP_ERRORS:
      return { ...state, errors: initialState.errors };
    default:
      return state;
  }
}