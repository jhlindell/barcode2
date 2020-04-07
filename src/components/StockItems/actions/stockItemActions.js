import axios from 'axios';
import { addMessageToContainer, messageType } from '../../Messages/actions';
const URL = process.env.REACT_APP_SERVER_URL;

export function getStockItemById(id, failure) {
  return function (dispatch) {
    axios.get(`${URL}/api/stock_items/${id}`)
      .then((response) => {
        dispatch({ type: 'SINGLE_STOCK_ITEM', payload: response.data });
      })
      .catch((error) => {
        let err = error.toString();
        if (err.includes('404')) {
          err = '404. cannot find ingredient with that id';
        }
        dispatch(addMessageToContainer(err, messageType.ERROR));
        failure();
      });
  }
}

export function clearSingleStockItem() {
  return { type: 'CLEAR_SINGLE_STOCK_ITEM' };
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