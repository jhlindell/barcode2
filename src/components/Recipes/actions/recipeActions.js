import axios from 'axios';
import { addMessageToContainer, messageType } from '../../Messages/actions';
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
import { push } from 'connected-react-router';
const URL = process.env.REACT_APP_SERVER_URL;

export const loadRecipeBegin = () => ({ type: LOAD_RECIPE_BEGIN });
export const loadRecipeSuccess = data => ({
  type: LOAD_RECIPE_SUCCESS,
  payload: data
});
export const loadRecipeFailure = () => ({ type: LOAD_RECIPE_FAILURE });
export const clearRecipe = () => ({ type: CLEAR_RECIPE });

export function getRecipeById(id, failure) {
  return function (dispatch) {
    dispatch(loadRecipeBegin());
    axios.get(`${URL}/api/recipes/${id}`)
      .then((response) => {
        dispatch(loadRecipeSuccess(response.data));
      })
      .catch((error) => {
        let err = error.toString();
        if (err.includes('404')) {
          err = '404. cannot find ingredient with that id';
        };
        dispatch(addMessageToContainer(err, messageType.ERROR));
        dispatch(loadRecipeFailure());
      });
  }
}

export function deleteRecipe(id) {
  return function (dispatch, getState) {
    const { auth } = getState();
    axios.delete(`${URL}/api/recipes/${id}`, { headers: { authorization: auth.token } })
      .then((response) => {
        dispatch(push('/recipes'))
      })
      .catch((error) => {
        let err = error.toString();
        if (err.includes('401')) {
          err = 'You are not authorized to delete that item';
        }
        dispatch(addMessageToContainer(err, messageType.ERROR));
      });
  }
}

export function createRecipe(recipe) {
  console.log('create recipe action called');
  return function (dispatch, getState) {
    const { auth } = getState();
    axios.post(`${URL}/api/recipes`, recipe, { headers: { authorization: auth.token } })
      .then((response) => {
        dispatch(addMessageToContainer('Recipe created successfully!', messageType.SUCCESS));
        dispatch(push(`/recipes/${response.data._id}`));
      })
      .catch((error) => {
        let err = error.toString();
        dispatch(addMessageToContainer(err));
      });
  }
}

export function editRecipe(id, recipe) {
  return function (dispatch, getState) {
    const { auth } = getState();
    axios.put(`${URL}/api/recipes/${id}`, recipe, { headers: { authorization: auth.token } })
      .then((response) => {
        dispatch(push(`/stockitems/${id}`));
      })
      .catch((error) => {
        let err = error.toString();
        if (err.includes('401')) {
          err = 'You are not authorized to edit that item';
        }
        dispatch(addMessageToContainer(err, messageType.ERROR));
        dispatch(push(`/recipes/${id}`));
      });
  }
}

export function initializeNewRecipe() {
  return { type: INITIALIZE_NEW_RECIPE };
}

export function recipeOnChange(item) {
  return { type: ON_RECIPE_CHANGE, payload: item };
}

export function setValidationErrors(errors) {
  return { type: SET_RECIPE_VALIDATION_ERRORS, payload: errors };
}

export function clearValidationErrors() {
  return { type: CLEAR_RECIPE_VALIDATION_ERRORS };
}