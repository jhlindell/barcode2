import axios from 'axios';
import { addMessageToContainer, messageType } from '../../Messages/actions';
import { STOCK_ITEM_LIST, CLEAR_STOCK_ITEM_LIST } from './types';
const URL = process.env.REACT_APP_SERVER_URL;

export function getStockItemList(page, limit, search) {
  const zeroAdjustedPageNumber = page + 1;
  let queryString = `?page=${zeroAdjustedPageNumber}&limit=${limit}`;
  if (search) {
    queryString += `&search=${search}`;
  }
  return function (dispatch) {

    axios.get(`${URL}/api/stock_items${queryString}`)
      .then((response) => {
        dispatch({ type: STOCK_ITEM_LIST, payload: response.data });
      })
      .catch((error) => {
        let err = error.toString();
        dispatch(addMessageToContainer(err, messageType.ERROR));
      });
  }
}

export function clearStockItemList() {
  return { type: CLEAR_STOCK_ITEM_LIST };
}