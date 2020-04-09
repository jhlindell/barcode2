import { STOCK_ITEM_LIST, CLEAR_STOCK_ITEM_LIST } from '../actions';

export function stockItemListReducer(state = [], action) {
  switch (action.type) {
    case STOCK_ITEM_LIST:
      return action.payload;
    case CLEAR_STOCK_ITEM_LIST:
      return [];
    default:
      return state;
  }
}