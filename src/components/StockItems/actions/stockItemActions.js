import axios from 'axios';
import { addMessageToContainer, messageType } from '../../Messages/actions';
import {
  LOAD_STOCK_ITEM_BEGIN,
  LOAD_STOCK_ITEM_SUCCESS,
  LOAD_STOCK_ITEM_FAILURE,
  CLEAR_STOCK_ITEM
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

export function createStockItem(item, success) {
  return function (dispatch, getState) {
    const { auth } = getState();
    axios.post(`${URL}/api/stock_items/`, item, { headers: { authorization: auth.token } })
      .then((response) => {
        dispatch({ type: 'NEW_STOCK_ITEM', payload: response.data });
        dispatch(addMessageToContainer('Item created successfully!', messageType.SUCCESS));
        success();
      })
      .catch((error) => {
        let err = error.toString();
        dispatch(addMessageToContainer(err, messageType.ERROR));
      });
  }
}

export function clearNewStockItem() {
  return { type: 'CLEAR_NEW_STOCK_ITEM' };
}

export function deleteStockItem(id, success) {
  return function (dispatch, getState) {
    const { auth } = getState();
    axios.delete(`${URL}/api/stock_items/${id}`, { headers: { authorization: auth.token } })
      .then((response) => {
        success();
      })
      .catch((error) => {
        let err = error.toString();
        dispatch(addMessageToContainer(err, messageType.ERROR));
      });
  }
}

export function editStockItem(id, item, success, failure) {
  return function (dispatch, getState) {
    const { auth } = getState();
    axios.put(`${URL}/api/stock_items/${id}`, item, { headers: { authorization: auth.token } })
      .then((response) => {
        success();
      })
      .catch((error) => {
        let err = error.toString();
        dispatch(addMessageToContainer(err, messageType.ERROR));
        failure();
      });
  }
}