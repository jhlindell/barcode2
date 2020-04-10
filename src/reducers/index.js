import { combineReducers } from 'redux';
import { authReducer, signupReducer, usernameReducer } from '../components/Login/reducers';
import { messageReducer } from '../components/Messages/reducers';
import { stockItemListReducer, stockItemReducer } from '../components/StockItems/reducers';
import { recipeListReducer } from '../components/Recipes/reducers';
import { connectRouter } from 'connected-react-router';

const appReducers = (history) => combineReducers({
  auth: authReducer,
  signup: signupReducer,
  username: usernameReducer,
  messages: messageReducer,
  stockItemList: stockItemListReducer,
  stockItem: stockItemReducer,
  recipeList: recipeListReducer,
  router: connectRouter(history)
});

export default appReducers;