import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipeList, clearRecipeList } from '../actions';
import RecipeListDisplay from './RecipeListDisplay';
import { useHistory } from 'react-router-dom';

function RecipeListContainer() {
  const [activePage, setActivePage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [searchBox, setSearchBox] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const recipeList = useSelector(state => state.recipeList);
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(getRecipeList(activePage, itemsPerPage, searchBox));
    return () => dispatch(clearRecipeList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handlePageChange(event, newPageNumber) {
    setActivePage(newPageNumber);
    dispatch(getRecipeList(newPageNumber, itemsPerPage, searchBox));
  }

  function handleItemsPerPageChange(event) {
    const newItemsPerPage = event.target.value;
    setItemsPerPage(newItemsPerPage);
    setActivePage(0);
    dispatch(getRecipeList(0, newItemsPerPage, searchBox));
  }

  function handleSearchBoxChange(event) {
    setSearchBox(event.target.value);
  }

  function handleSearchBoxSubmit() {
    dispatch(getRecipeList(0, itemsPerPage, searchBox));
  }

  function handleNewRecipeClick() {
    history.push('/recipes/create');
  }

  console.log('recipelist container loaded');

  return (
    <RecipeListDisplay
      recipeList={recipeList}
      handlePageChange={handlePageChange}
      activePage={activePage}
      itemsPerPage={itemsPerPage}
      handleItemsPerPageChange={handleItemsPerPageChange}
      searchBox={searchBox}
      handleSearchBoxChange={handleSearchBoxChange}
      handleSearchBoxSubmit={handleSearchBoxSubmit}
      handleNewRecipeClick={handleNewRecipeClick}
      auth={auth}
      history={history}
    />
  );
};

export default RecipeListContainer;