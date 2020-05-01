import React, { Fragment, useState } from 'react';
import RecipeFormDisplay from './RecipeFormDisplay';
import { useDispatch, useSelector } from 'react-redux';
import { recipeOnChange, setNewIngValidationErrors, clearNewIngValidationErrors } from '../actions';

function RecipeFormContainer(props) {
  const [showAddInstruction, setShowAddInstruction] = useState(false);
  const [newInstruction, setNewInstruction] = useState('');
  const [newInstructionError, setNewInstructionError] = useState(undefined);
  const [showAddIngredient, setShowAddIngredient] = useState(false);
  const dispatch = useDispatch();
  const newIngredient = useSelector(state => state.newIngredient);
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

  // functions for changing ingredients on recipe
  function toggleAddNewIngredient() {
    setShowAddIngredient(!showAddIngredient);
  }

  function validateNewIngredient() {
    let isValid = true;
    let errors = {
      measure: undefined,
      unit: undefined,
      stockItem: undefined
    };

    if (parseFloat(newIngredient.current.measure) <= 0) {
      errors.measure = 'Please enter a positive measure value';
      isValid = false;
    }

    if (typeof parseFloat(newIngredient.current.measure) !== 'number') {
      errors.measure = "Can't use Fractions";
      isValid = false;
    }

    if (newIngredient.current.stockItem === undefined) {
      errors.ingredient = 'Please pick an ingredient';
      isValid = false;
    }
    console.log('errors: ', errors);
    if (!isValid) {
      dispatch(setNewIngValidationErrors(errors));
    }
    return isValid;
  }

  function handleNewIngredientSubmit() {
    const isValid = validateNewIngredient();
    if (isValid) {
      let ingredientArray = recipe.current.ingredients;
      let newIng = {
        measure: newIngredient.current.measure,
        unit: newIngredient.current.unit,
        name: newIngredient.current.stockItem.name,
        _id: newIngredient.current.stockItem._id
      }
      ingredientArray.push(newIng);
      const newRecipe = { ...recipe.current, ingredients: ingredientArray };
      dispatch(recipeOnChange(newRecipe));
      toggleAddNewIngredient();
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
            showAddIngredient={showAddIngredient}
            toggleAddNewIngredient={toggleAddNewIngredient}
            handleNewIngredientSubmit={handleNewIngredientSubmit}
          />
        ) : null
      }
    </Fragment>

  )
}

export default RecipeFormContainer;
