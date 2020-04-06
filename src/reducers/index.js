import { combineReducers } from 'redux';
import authReducer from '../components/Login/reducers/auth';
import signupReducer from '../components/Login/reducers/signup';
import usernameReducer from '../components/Login/reducers/userName';
import messageReducer from '../components/Messages/reducers/message'

const appReducers = combineReducers({
  auth: authReducer,
  signup: signupReducer,
  username: usernameReducer,
  messages: messageReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined
  }

  return appReducers(state, action)
}

export default rootReducer;