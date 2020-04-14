import React, { useEffect } from 'react';
import RecipeForm from './RecipeFormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { initializeNewRecipe, clearRecipe, createRecipe } from '../actions';

function RecipeCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const recipe = useSelector(state => state.recipe);

  useEffect(() => {
    dispatch(initializeNewRecipe());
    return () => dispatch(clearRecipe());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSubmit() {
    dispatch(createRecipe(recipe.current));
  }

  function handleCancelClick() {
    history.push('/recipes');
  }

  return (
    <RecipeForm
      handleSubmit={handleSubmit}
      handleCancelClick={handleCancelClick}
      recipe={recipe}
    />
  )
};

export default RecipeCreate;