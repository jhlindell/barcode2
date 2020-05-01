import React, { useEffect, useState, Fragment } from 'react';
import { getStockItemList, clearStockItemList } from '../../StockItems/actions'
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  initializeNewIngredient,
  newIngredientOnChange,
  clearNewIngredient
} from '../actions';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  MenuItem,
  Modal,
  TextField,
  Typography
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
  container: {
    marginTop: 16,
    marginBottom: 16,
    display: 'flex',
    flexDirection: 'column'
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 8
  },
  measureField: {
    width: 85
  },
  unitField: {
    width: 85,
    marginLeft: 8
  },
  ingredientField: {
    width: 300,
    marginLeft: 8,
    marginRight: 8
  },
  infoGroup: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 8
  },
  infoGrid: {
    display: 'flex',
    justifyContent: 'center',
  },
  modal: {
    width: 500
  }
});

function RecipeAddIngredient(props) {
  const { handleNewIngredientSubmit } = props;
  const dispatch = useDispatch();
  const ingredients = useSelector(state => state.stockItemList);
  const newIngredient = useSelector(state => state.newIngredient);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  // const [dialogOpen, setDialogOpen] = useState(false);
  const loading = open && options.length === 0;

  useEffect(() => {
    if (open) {
      setOptions(ingredients.docs);
    }
    if (!open) {
      setOptions([]);
    }
  }, [open, ingredients.docs]);

  useEffect(() => {
    dispatch(initializeNewIngredient());
    dispatch(getStockItemList(0, 5000, ''));
    return () => {
      dispatch(clearNewIngredient());
      dispatch(clearStockItemList());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleIngredientChange(event, value) {
    const newIng = newIngredient.current;
    newIng.stockItem = value;
    dispatch(newIngredientOnChange(newIng));
  }

  function handleMeasureChange(event) {
    const newIng = newIngredient.current;
    newIng.measure = event.target.value;
    dispatch(newIngredientOnChange(newIng));
  }

  function handleUnitChange(event) {
    const newIng = newIngredient.current;
    newIng.unit = event.target.value;
    dispatch(newIngredientOnChange(newIng));
  }

  // function handleDialogOpen() {
  //   setDialogOpen(true);
  // }

  // function handleDialogClose() {
  //   setDialogOpen(false);
  // }

  return (
    <Fragment>
      {newIngredient ?
        (
          <div className={classes.container}>
            <div className={classes.fieldGroup}>
              <TextField
                value={newIngredient.current.measure}
                onChange={handleMeasureChange}
                label="Measure"
                variant="outlined"
                size="small"
                className={classes.measureField}
              />
              <TextField
                value={newIngredient.current.unit}
                onChange={handleUnitChange}
                className={classes.unitField}
                label="Unit"
                variant="outlined"
                size="small"
                select
              >
                <MenuItem value="oz">oz</MenuItem>
                <MenuItem value="tbsp">tbsp</MenuItem>
                <MenuItem value="tsp">tsp</MenuItem>
                <MenuItem value="dash">dash</MenuItem>
                <MenuItem value="drops">drops</MenuItem>
                <MenuItem value="each">each</MenuItem>
                <MenuItem value="piece">piece</MenuItem>
              </TextField>
              <Autocomplete
                id="asynchronous-demo"
                className={classes.ingredientField}
                open={open}
                onOpen={() => {
                  setOpen(true);
                }}
                onClose={() => {
                  setOpen(false);
                }}
                onChange={handleIngredientChange}
                getOptionSelected={(option, value) => option.name === value.name}
                getOptionLabel={(option) => option.name}
                options={options}
                loading={loading}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Ingredient"
                    variant="outlined"
                    size="small"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
                          {loading ? <CircularProgress color="inherit" size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                      ),
                    }}
                  />
                )}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleNewIngredientSubmit}
              >
                Submit
              </Button>
            </div>
            <div className={classes.infoGroup}>
              <Grid
                container
                spacing={2}
                className={classes.infoGrid}
              >
                <Grid item xs={6}>
                  <Typography variant="body2" >
                    Ingredients can only be addd to a recipe if they are already in the database.
                    If you want to add a new ingredient to the database. Click the create new ingredient button.
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Button
                    variant="contained"
                    color="secondary"
                  // onClick={handleDialogOpen}
                  >
                    create new ingredient
                  </Button>
                </Grid>
              </Grid>
            </div>
            {/* <Modal
              open={dialogOpen}
              onClose={handleDialogClose}
            >
              <div className={classes.modal}>some shit in a modal</div>
            </Modal> */}
          </div>
        ) : null
      }
    </Fragment>
  );
}

export default RecipeAddIngredient;