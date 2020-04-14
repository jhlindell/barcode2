import React, { useEffect, useRef } from 'react';
import RecipeForm from './RecipeFormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getRecipeById, clearRecipe, editRecipe } from '../actions';

function RecipeCreate() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  let mountedRef = useRef(false);
  const recipe = useSelector(state => state.recipe);

  useEffect(() => {
    if (recipe.isLoading === false && recipe.current === undefined && mountedRef === true) {
      history.push('/recipes');
    }
  }, [recipe, history]);

  useEffect(() => {
    dispatch(getRecipeById(id));
    mountedRef.current = true;
    return () => dispatch(clearRecipe());
  }, [id, dispatch]);

  function handleSubmit() {
    console.log('recipe to edit: ', recipe.current);
    const newRecipe = { name: recipe.current.name, description: recipe.current.description }
    dispatch(editRecipe(recipe.current._id, newRecipe));
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
}

export default RecipeCreate;