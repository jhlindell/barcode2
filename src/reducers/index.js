import { combineReducers } from 'redux';
import { authReducer, signupReducer, usernameReducer } from '../components/Login/reducers';
import { messageReducer } from '../components/Messages/reducers';
import { stockItemListReducer, stockItemReducer } from '../components/StockItems/reducers';
import { connectRouter } from 'connected-react-router';

const appReducers = (history) => combineReducers({
  auth: authReducer,
  signup: signupReducer,
  username: usernameReducer,
  messages: messageReducer,
  stockItemList: stockItemListReducer,
  stockItem: stockItemReducer,
  router: connectRouter(history)
});

// const rootReducer = (state, action) => {
//   if (action && action.type && action.type === 'USER_LOGOUT') {
//     state = undefined;
//     localStorage.removeItem('token');
//     return state;
//   }

//   return appReducers(state, action)
// }

export default appReducers;