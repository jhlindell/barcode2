import React, { useEffect, useRef } from 'react';
import StockItemDetailDisplay from './StockItemDetailDisplay';
import { getStockItemById, clearStockItem, deleteStockItem } from '../actions/stockItemActions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

function StockItemDetailContainer() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const stockItem = useSelector(state => state.stockItem);
  let mountedRef = useRef(false);

  useEffect(() => {
    if (stockItem.isLoading === false && stockItem.current === undefined && mountedRef === true) {
      history.push('/stockitems');
    }
  }, [stockItem, history]);

  useEffect(() => {
    dispatch(getStockItemById(id));
    mountedRef.current = true;
    return () => dispatch(clearStockItem());
  }, [id, dispatch]);

  function goBack() {
    history.push('/stockitems');
  }

  return (
    <StockItemDetailDisplay
      stockItem={stockItem}
      goBack={goBack}
    />
  );
};

export default StockItemDetailContainer;