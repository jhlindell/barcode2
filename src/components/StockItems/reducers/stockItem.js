import {
  LOAD_STOCK_ITEM_BEGIN,
  LOAD_STOCK_ITEM_SUCCESS,
  LOAD_STOCK_ITEM_FAILURE,
  CLEAR_STOCK_ITEM,
  ON_STOCK_ITEM_CHANGE,
  INITIALIZE_NEW_STOCK_ITEM,
  SET_STOCK_ITEM_VALIDATION_ERRORS,
  CLEAR_STOCK_ITEM_VALIDATION_ERRORS
} from '../actions';

const initialState = {
  isLoading: false,
  current: undefined,
  isDirty: false,
  errors: {
    name: undefined,
    description: undefined
  },
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
    case ON_STOCK_ITEM_CHANGE:
      return { ...state, current: action.payload, isDirty: true };
    case INITIALIZE_NEW_STOCK_ITEM:
      return {
        isLoading: false,
        isDirty: false,
        errors: initialState.errors,
        current: {
          name: '',
          description: ''
        }
      };
    case SET_STOCK_ITEM_VALIDATION_ERRORS:
      return { ...state, errors: action.payload };
    case CLEAR_STOCK_ITEM_VALIDATION_ERRORS:
      return { ...state, errors: initialState.errors };
    default:
      return state;
  }
}