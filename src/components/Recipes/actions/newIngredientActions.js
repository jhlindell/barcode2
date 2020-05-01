import {
  INITIALIZE_NEW_INGREDIENT,
  NEW_INGREDIENT_ON_CHANGE,
  CLEAR_NEW_INGREDIENT,
  SET_NEW_ING_VALIDATION_ERRORS,
  CLEAR_NEW_ING_VALIDATION_ERRORS
} from './types';

export function initializeNewIngredient() {
  return { type: INITIALIZE_NEW_INGREDIENT };
}

export function newIngredientOnChange(ingredient) {
  return { type: NEW_INGREDIENT_ON_CHANGE, payload: ingredient };
}

export function clearNewIngredient() {
  return { type: CLEAR_NEW_INGREDIENT };
}

export function setNewIngValidationErrors(errors) {
  return { type: SET_NEW_ING_VALIDATION_ERRORS, payload: errors };
}

export function clearNewIngValidationErrors() {
  return { type: CLEAR_NEW_ING_VALIDATION_ERRORS };
}