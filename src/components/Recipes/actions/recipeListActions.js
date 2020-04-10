import axios from 'axios';
import { addMessageToContainer, messageType } from '../../Messages/actions';
import { RECIPE_LIST, CLEAR_RECIPE_LIST } from './types';
const URL = process.env.REACT_APP_SERVER_URL;

export function getRecipeList(page, limit, search) {
  let queryString = `?page=${page}&limit=${limit}`;
  if (search) {
    queryString += `&search=${search}`;
  }
  return function (dispatch) {
    axios.get(`${URL}/api/recipes${queryString}`)
      .then((response) => {
        dispatch({ type: RECIPE_LIST, payload: response.data });
      })
      .catch((error) => {
        let err = error.toString();
        dispatch(addMessageToContainer(err, messageType.ERROR));
      });
  }
}

export function clearRecipeList() {
  return { type: CLEAR_RECIPE_LIST };
}