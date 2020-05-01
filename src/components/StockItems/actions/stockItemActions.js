import axios from 'axios';
import { addMessageToContainer, messageType } from '../../Messages/actions';
import { push } from 'connected-react-router';
import {
  LOAD_STOCK_ITEM_BEGIN,
  LOAD_STOCK_ITEM_SUCCESS,
  LOAD_STOCK_ITEM_FAILURE,
  CLEAR_STOCK_ITEM,
  INITIALIZE_NEW_STOCK_ITEM,
  ON_STOCK_ITEM_CHANGE,
  SET_STOCK_ITEM_VALIDATION_ERRORS,
  CLEAR_STOCK_ITEM_VALIDATION_ERRORS
} from './types';
const URL = process.env.REACT_APP_SERVER_URL;

export const loadStockItemBegin = () => ({ type: LOAD_STOCK_ITEM_BEGIN });
export const loadStockItemSuccess = data => ({
  type: LOAD_STOCK_ITEM_SUCCESS,
  payload: data
});
export const loadStockItemFailure = () => ({ type: LOAD_STOCK_ITEM_FAILURE });
export const clearStockItem = () => ({ type: CLEAR_STOCK_ITEM });

export function getStockItemById(id) {
  return function (dispatch) {
    dispatch(loadStockItemBegin());
    axios.get(`${URL}/api/stock_items/${id}`)
      .then((response) => {
        dispatch(loadStockItemSuccess(response.data));
      })
      .catch((error) => {
        let err = error.toString();
        if (err.includes('404')) {
          err = '404. cannot find ingredient with that id';
        }
        dispatch(addMessageToContainer(err, messageType.ERROR));
        dispatch(loadStockItemFailure());
      });
  }
}

export function createStockItem(item, redirectBool) {
  return function (dispatch, getState) {
    const { auth } = getState();
    axios.post(`${URL}/api/stock_items/`, item, { headers: { authorization: auth.token } })
      .then((response) => {
        dispatch(addMessageToContainer('Item created successfully!', messageType.SUCCESS));
        if (redirectBool) {
          dispatch(push(`/stockitems/${response.data._id}`));
        }
      })
      .catch((error) => {
        let err = error.toString();
        if (err.includes('401')) {
          err = 'You must be logged in to create an item'
        }
        dispatch(addMessageToContainer(err, messageType.ERROR));
      });
  }
}

export function deleteStockItem(id) {
  return function (dispatch, getState) {
    const { auth } = getState();
    axios.delete(`${URL}/api/stock_items/${id}`, { headers: { authorization: auth.token } })
      .then((response) => {
        dispatch(push('/stockitems'))
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

export function editStockItem(id, item) {
  return function (dispatch, getState) {
    const { auth } = getState();
    axios.put(`${URL}/api/stock_items/${id}`, item, { headers: { authorization: auth.token } })
      .then((response) => {
        dispatch(push(`/stockitems/${id}`));
      })
      .catch((error) => {
        let err = error.toString();
        if (err.includes('401')) {
          err = 'You are not authorized to edit that item';
        }
        dispatch(addMessageToContainer(err, messageType.ERROR));
        dispatch(push(`/stockitems/${id}`));
      });
  }
}

export function initializeNewStockItem() {
  return { type: INITIALIZE_NEW_STOCK_ITEM };
}

export function stockItemOnChange(item) {
  return { type: ON_STOCK_ITEM_CHANGE, payload: item };
}

export function setValidationErrors(errors) {
  return { type: SET_STOCK_ITEM_VALIDATION_ERRORS, payload: errors };
}

export function clearValidationErrors() {
  return { type: CLEAR_STOCK_ITEM_VALIDATION_ERRORS };
}