import {
  LOAD_STOCK_ITEM_BEGIN,
  LOAD_STOCK_ITEM_SUCCESS,
  LOAD_STOCK_ITEM_FAILURE,
  CLEAR_STOCK_ITEM,
} from '../actions';

const initialState = {
  isLoading: false,
  current: undefined,
  isDirty: false,
  errors: {},
}

export function stockItemReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_STOCK_ITEM_BEGIN:
      return { ...state, isLoading: true, current: undefined };
    case LOAD_STOCK_ITEM_SUCCESS:
      return { ...state, isLoading: false, current: action.payload };
    case LOAD_STOCK_ITEM_FAILURE:
      return { ...state, isLoading: false, current: undefined };
    case CLEAR_STOCK_ITEM:
      return initialState;
    default:
      return state;
  }
}