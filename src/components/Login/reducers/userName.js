import { SET_USERNAME } from '../actions';

export function usernameReducer(state = null, action) {
  switch (action.type) {
    case SET_USERNAME:
      return action.payload;
    default:
      return state;
  }
}