import React, { Fragment } from 'react';
import StockItemFormDisplay from './StockItemFormDisplay';
import { useDispatch } from 'react-redux';
import { stockItemOnChange, setValidationErrors, clearValidationErrors } from '../actions';

function StockItemFormContainer(props) {
  const dispatch = useDispatch();
  const { handleSubmit, handleCancelClick, stockItem } = props;

  function handleOnChange(newStockItemValue) {
    dispatch(stockItemOnChange(newStockItemValue));
  }

  function validate() {
    dispatch(clearValidationErrors());
    const errors = {
      name: undefined,
      description: undefined
    };
    let isValid = true;

    if (!stockItem.current.name) {
      errors.name = 'Name must not be blank';
      isValid = false;
    }

    if (!stockItem.current.description) {
      errors.description = 'Description must not be blank';
      isValid = false;
    }

    if (isValid === false) {
      dispatch(setValidationErrors(errors));
    }
    return isValid;
  }

  function handleStockItemSubmit() {
    const valid = validate();
    if (valid) {
      handleSubmit();
    }
  }

  return (
    <Fragment>
      {stockItem.current ?
        (
          <StockItemFormDisplay
            stockItem={stockItem.current}
            onChange={handleOnChange}
            cancel={handleCancelClick}
            onSubmit={handleStockItemSubmit}
            errors={stockItem.errors}
          />
        ) : null
      }
    </Fragment>

  );
};

export default StockItemFormContainer;