import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStockItemList, clearStockItemList } from '../actions/stockItemListActions';
import StockItemListDisplay from './StockItemListDisplay';
import { useHistory } from 'react-router-dom';

function StockItemListContainer() {
  const [activePage, setActivePage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [searchBox, setSearchBox] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const stockItemList = useSelector(state => state.stockItemList);

  useEffect(() => {
    dispatch(getStockItemList(activePage, itemsPerPage, searchBox));
    return () => dispatch(clearStockItemList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handlePageChange(event, newPageNumber) {
    setActivePage(newPageNumber);
    dispatch(getStockItemList(newPageNumber, itemsPerPage, searchBox));
  }

  function handleItemsPerPageChange(event) {
    const newItemsPerPage = event.target.value;
    setItemsPerPage(newItemsPerPage);
    setActivePage(0);
    dispatch(getStockItemList(0, newItemsPerPage, searchBox));
  }

  function handleSearchBoxChange(event) {
    setSearchBox(event.target.value);
  }

  function handleSearchBoxSubmit() {
    dispatch(getStockItemList(0, itemsPerPage, searchBox));
  }

  function handleNewItemClick() {
    history.push('/stockitems/create');
  }

  return (
    <StockItemListDisplay
      stockItemList={stockItemList}
      handlePageChange={handlePageChange}
      activePage={activePage}
      itemsPerPage={itemsPerPage}
      handleItemsPerPageChange={handleItemsPerPageChange}
      searchBox={searchBox}
      handleSearchBoxChange={handleSearchBoxChange}
      handleSearchBoxSubmit={handleSearchBoxSubmit}
      handleNewItemClick={handleNewItemClick}
    />
  );
};

export default StockItemListContainer;