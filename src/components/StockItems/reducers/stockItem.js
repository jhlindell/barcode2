import { SINGLE_STOCK_ITEM, CLEAR_SINGLE_STOCK_ITEM } from '../actions';

export function stockItemReducer(state = null, action) {
  switch (action.type) {
    case SINGLE_STOCK_ITEM:
      return action.payload;
    case CLEAR_SINGLE_STOCK_ITEM:
      return null;
    default:
      return state;
  }
}