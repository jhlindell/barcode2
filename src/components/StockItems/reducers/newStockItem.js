import { NEW_STOCK_ITEM, CLEAR_NEW_STOCK_ITEM } from '../actions';

export function newStockItemReducer(state = null, action) {
  switch (action.type) {
    case NEW_STOCK_ITEM:
      return action.payload;
    case CLEAR_NEW_STOCK_ITEM:
      return null;
    default:
      return state;
  }
}