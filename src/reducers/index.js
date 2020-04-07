import { combineReducers } from 'redux';
import { authReducer, signupReducer, usernameReducer } from '../components/Login/reducers';
import { messageReducer } from '../components/Messages/reducers';
import { stockItemListReducer, stockItemReducer, newStockItemReducer } from '../components/StockItems/reducers';

const appReducers = combineReducers({
  auth: authReducer,
  signup: signupReducer,
  username: usernameReducer,
  messages: messageReducer,
  stockItemList: stockItemListReducer,
  stockItem: stockItemReducer,
  newStockItem: newStockItemReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined
  }

  return appReducers(state, action)
}

export default rootReducer;