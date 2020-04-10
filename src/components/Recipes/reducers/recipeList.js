import { RECIPE_LIST, CLEAR_RECIPE_LIST } from '../actions';

export function recipeListReducer(state = [], action) {
  switch (action.type) {
    case RECIPE_LIST:
      return action.payload;
    case CLEAR_RECIPE_LIST:
      return [];
    default:
      return state;
  }
};