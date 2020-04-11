import {
  LOAD_RECIPE_BEGIN,
  LOAD_RECIPE_SUCCESS,
  LOAD_RECIPE_FAILURE,
  CLEAR_RECIPE,
  ON_RECIPE_CHANGE,
  INITIALIZE_NEW_RECIPE,
  SET_RECIPE_VALIDATION_ERRORS,
  CLEAR_RECIPE_VALIDATION_ERRORS
} from '../actions';

const initialState = {
  isLoading: false,
  current: undefined,
  isDirty: false,
  errors: undefined,
}

export function recipeReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_RECIPE_BEGIN:
      return { ...state, isLoading: true, current: undefined };
    case LOAD_RECIPE_SUCCESS:
      return { ...state, isLoading: false, current: action.payload };
    case LOAD_RECIPE_FAILURE:
      return { ...state, isLoading: false, current: undefined };
    case CLEAR_RECIPE:
      return initialState;
    case ON_RECIPE_CHANGE:
      return { ...state, current: action.payload, isDirty: true };
    case INITIALIZE_NEW_RECIPE:
      return {
        isLoading: false,
        isDirty: false,
        errors: undefined,
        current: undefined
      };
    case SET_RECIPE_VALIDATION_ERRORS:
      return { ...state, errors: action.payload };
    case CLEAR_RECIPE_VALIDATION_ERRORS:
      return { ...state, errors: initialState.errors };
    default:
      return state;
  }
}