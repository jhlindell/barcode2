import {
  INITIALIZE_NEW_INGREDIENT,
  NEW_INGREDIENT_ON_CHANGE,
  CLEAR_NEW_INGREDIENT,
  SET_NEW_ING_VALIDATION_ERRORS,
  CLEAR_NEW_ING_VALIDATION_ERRORS
} from '../actions';

const newIngredientState = {
  current: {
    measure: '',
    unit: 'oz',
    stockItem: undefined,
  },
  errors: {
    measure: undefined,
    unit: undefined,
    stockItem: undefined
  }
}

export function newIngredientReducer(state = null, action) {
  console.log('reducer begin state:', state);
  console.log('newIngredientState', newIngredientState);
  switch (action.type) {
    case INITIALIZE_NEW_INGREDIENT:
      const obj = { ...newIngredientState };
      return obj;
    case NEW_INGREDIENT_ON_CHANGE:
      return { ...state, current: action.payload };
    case CLEAR_NEW_INGREDIENT:
      return null;
    case SET_NEW_ING_VALIDATION_ERRORS:
      return { ...state, errors: action.payload };
    case CLEAR_NEW_ING_VALIDATION_ERRORS:
      return { ...state, errors: newIngredientState.errors };
    default:
      return state;
  }
}