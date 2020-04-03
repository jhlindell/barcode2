import { combineReducers } from 'redux';
import authReducer from '../components/Login/reducers/auth';
import signupReducer from '../components/Login/reducers/signup';
import usernameReducer from '../components/Login/reducers/userName';

const appReducers = combineReducers({
  auth: authReducer,
  signup: signupReducer,
  username: usernameReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined
  }

  return appReducers(state, action)
}

export default rootReducer;