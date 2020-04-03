import { SIGNUP_ONCHANGE, CLEAR_SIGNUP } from '../actions';

const initialState = {
  username: '',
  password: '',
  confirmPassword: '',
  errors: {
    username: undefined,
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
    default:
      return state;
  }
}