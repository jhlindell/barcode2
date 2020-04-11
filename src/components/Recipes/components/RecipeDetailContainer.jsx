import React, { useEffect, useRef } from 'react';
import RecipeDetailDisplay from './RecipeDetailDisplay';
import { getRecipeById, clearRecipe, deleteRecipe } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

function RecipeDetailContainer() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const recipe = useSelector(state => state.recipe);
  const auth = useSelector(state => state.auth);
  let mountedRef = useRef(false);

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

  function goBack() {
    history.push('/recipes');
  }

  function handleDelete() {
    dispatch(deleteRecipe(recipe.current._id));
  }

  function handleEdit() {
    history.push(`/recipes/edit/${recipe.current._id}`)
  }

  return (
    <RecipeDetailDisplay
      recipe={recipe}
      goBack={goBack}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
      auth={auth}
    />
  );
};

export default RecipeDetailContainer;