import React, { useEffect, useRef } from 'react';
import StockItemForm from './StockItemFormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getStockItemById, clearStockItem, editStockItem } from '../actions';

function StockItemCreate() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  let mountedRef = useRef(false);
  const stockItem = useSelector(state => state.stockItem);

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

  function handleSubmit() {
    const newStockItem = { name: stockItem.current.name, description: stockItem.current.description }
    dispatch(editStockItem(stockItem.current._id, newStockItem));
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