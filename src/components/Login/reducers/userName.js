import { SET_USERNAME, CLEAR_USERNAME } from '../actions';

export function usernameReducer(state = null, action) {
  switch (action.type) {
    case SET_USERNAME:
      return action.payload;
    case CLEAR_USERNAME:
      return null;
    default:
      return state;
  }
}