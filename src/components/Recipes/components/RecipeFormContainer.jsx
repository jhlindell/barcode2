import React, { Fragment, useState } from 'react';
import RecipeFormDisplay from './RecipeFormDisplay';
import { useDispatch } from 'react-redux';
import { recipeOnChange, setValidationErrors, clearValidationErrors } from '../actions';

function RecipeFormContainer(props) {
  const [showAddInstruction, setShowAddInstruction] = useState(false);
  const [newInstruction, setNewInstruction] = useState('');
  const [newInstructionError, setNewInstructionError] = useState(undefined);
  const dispatch = useDispatch();
  const { handleSubmit, handleCancelClick, recipe } = props;

  function deleteIngredient(index) {
    console.log('deleting ingredient #', index);
  }

  function handleRecipeSubmit() {
    console.log('submitting recipe: ', recipe.current);
  }

  // changing name property on recipe
  function nameOnChange(event) {
    const newRecipe = { ...recipe.current, name: event.target.value }
    dispatch(recipeOnChange(newRecipe));
  }

  //changing description property on recipe
  function descriptionOnChange(event) {
    const newRecipe = { ...recipe.current, description: event.target.value };
    dispatch(recipeOnChange(newRecipe));
  }

  // functions for changing instructions on recipe
  function deleteInstruction(deleteIndex) {
    const newInstructions = recipe.current.instructions;
    newInstructions.splice(deleteIndex, 1);
    const newRecipe = { ...recipe.current, instructions: newInstructions };
    dispatch(recipeOnChange(newRecipe));
  }

  function toggleAddNewInstruction() {
    setShowAddInstruction(!showAddInstruction);
  }

  function newInstructionOnChange(event) {
    setNewInstruction(event.target.value);
  }

  function validateNewInstruction() {
    if (newInstruction === '') {
      setNewInstructionError('Please enter instruction text');
      return false;
    }
    return true;
  }

  function submitNewInstruction() {
    const isValid = validateNewInstruction();
    if (isValid) {
      const newInstructions = [...recipe.current.instructions, newInstruction];
      const newRecipe = { ...recipe.current, instructions: newInstructions };
      dispatch(recipeOnChange(newRecipe));
      setShowAddInstruction(false);
      setNewInstruction('');
      setNewInstructionError(undefined);
    }
  }

  return (
    <Fragment>
      {recipe.current ?
        (
          <RecipeFormDisplay
            recipe={recipe.current}
            deleteIngredient={deleteIngredient}
            deleteInstruction={deleteInstruction}
            cancel={handleCancelClick}
            onSubmit={handleRecipeSubmit}
            errors={recipe.errors}
            nameOnChange={nameOnChange}
            descriptionOnChange={descriptionOnChange}
            showAddInstruction={showAddInstruction}
            newInstruction={newInstruction}
            newInstructionOnChange={newInstructionOnChange}
            toggleAddNewInstruction={toggleAddNewInstruction}
            submitNewInstruction={submitNewInstruction}
            newInstructionError={newInstructionError}
          />
        ) : null
      }
    </Fragment>

  )
}

export default RecipeFormContainer;
