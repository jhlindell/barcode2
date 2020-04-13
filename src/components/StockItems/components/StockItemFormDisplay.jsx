import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  TextField
} from '@material-ui/core';
import theme from '../../../theme';

const useStyles = makeStyles({
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '92vh'
  },
  card: {
    maxWidth: '60%',
    minWidth: 350
  },
  cardHeader: {
    textAlign: 'center',
    backgroundColor: theme.palette.background.header
  },
  cardActions: {
    justifyContent: 'center'
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  field: {
    paddingBottom: 20,
  }
});

function StockItemFormDisplay(props) {
  const {
    stockItem,
    errors,
    onChange,
    cancel,
    onSubmit
  } = props;
  const classes = useStyles();

  function nameOnChange(event) {
    const newStockItem = { ...stockItem, name: event.target.value }
    onChange(newStockItem);
  }

  function descriptionOnChange(event) {
    const newStockItem = { ...stockItem, description: event.target.value };
    onChange(newStockItem);
  }

  let validationErrors = {
    name: undefined,
    description: undefined
  };


  if (errors) {
    validationErrors.name = errors.name;
    validationErrors.description = errors.description;
  }

  return (
    <div className={classes.cardContainer}>
      <Card className={classes.card}>
        <CardHeader
          title="New Ingredient"
          className={classes.cardHeader}
        />
        <CardContent>
          <div className={classes.formContainer}>
            <TextField
              value={stockItem.name}
              label="Name"
              onChange={nameOnChange}
              className={classes.field}
              error={errors.name !== undefined}
              helperText={errors.name}
            />
            <TextField
              value={stockItem.description}
              label="Description"
              onChange={descriptionOnChange}
              className={classes.field}
              multiline
              error={validationErrors.description !== undefined}
              helperText={validationErrors.description}
            />
          </div>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button
            variant="contained"
            color="secondary"
            onClick={cancel}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={onSubmit}
          >
            Submit
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default StockItemFormDisplay;