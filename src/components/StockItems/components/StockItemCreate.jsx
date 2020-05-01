import React, { useEffect } from 'react';
import StockItemForm from './StockItemFormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { initializeNewStockItem, clearStockItem, createStockItem } from '../actions';

function StockItemCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const stockItem = useSelector(state => state.stockItem);

  useEffect(() => {
    dispatch(initializeNewStockItem());
    return () => dispatch(clearStockItem());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSubmit() {
    dispatch(createStockItem(stockItem.current, true));
  }

  function handleCancelClick() {
    history.push('/stockitems');
  }

  return (
    <StockItemForm
      handleSubmit={handleSubmit}
      handleCancelClick={handleCancelClick}
      stockItem={stockItem}
    />
  )
}

export default StockItemCreate;