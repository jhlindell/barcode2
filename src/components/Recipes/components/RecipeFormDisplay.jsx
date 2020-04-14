import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  IconButton,
  TextField,
  Tooltip,
  Typography
} from '@material-ui/core';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import theme from '../../../theme';
import RecipeIngredients from './RecipeIngredientTable';
import RecipeInstructions from './RecipeInstructionTable';

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
  },
  centering: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  instructionHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8
  },
  addInstButton: {
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.hover
    },
    marginLeft: 16
  },
  instSubmitButton: {
    marginLeft: 8
  },
  newInstGroup: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.light,
    padding: 8
  }
});

function RecipeFormDisplay(props) {
  const {
    recipe,
    deleteIngredient,
    deleteInstruction,
    cancel,
    onSubmit,
    errors,
    nameOnChange,
    descriptionOnChange,
    showAddInstruction,
    newInstruction,
    newInstructionOnChange,
    toggleAddNewInstruction,
    submitNewInstruction,
    newInstructionError
  } = props;
  const classes = useStyles();

  return (
    <div className={classes.cardContainer}>
      {recipe ?
        (
          <Card className={classes.card}>
            <CardHeader
              title="New Recipe"
              className={classes.cardHeader}
            />
            <CardContent>
              <div className={classes.formContainer}>
                <TextField
                  value={recipe.name}
                  label="Name"
                  onChange={nameOnChange}
                  className={classes.field}
                  error={errors.name !== undefined}
                  helperText={errors.name}
                />
                <TextField
                  value={recipe.description}
                  label="Description"
                  onChange={descriptionOnChange}
                  className={classes.field}
                  multiline
                  error={errors.description !== undefined}
                  helperText={errors.description}
                />
              </div>
              <div>
                <RecipeIngredients
                  ingredients={recipe.ingredients}
                  deleteIngredient={deleteIngredient}
                />
              </div>
              <div>
                <div className={classes.instructionHeader}>
                  <Typography variant="h6" >
                    Instructions:
                  </Typography>
                  <Tooltip title="Add new Instruction">
                    <IconButton
                      onClick={toggleAddNewInstruction}
                      size="small"
                      classes={{
                        root: classes.addInstButton
                      }}
                    >
                      <AddOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                </div>

                {recipe.instructions.length ?
                  (
                    <RecipeInstructions
                      instructions={recipe.instructions}
                      deleteInstruction={deleteInstruction}
                    />
                  ) : (
                    <p className={classes.centering}>No Instructions</p>
                  )}

                {showAddInstruction &&
                  (
                    <div className={classes.newInstGroup}>
                      <TextField
                        value={newInstruction}
                        label="New Instruction"
                        onChange={newInstructionOnChange}
                        // variant="outlined"
                        size="small"
                        error={newInstructionError !== undefined}
                        helperText={newInstructionError}
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={submitNewInstruction}
                        className={classes.instSubmitButton}
                      >
                        Submit
                      </Button>
                    </div>
                  )
                }
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
        ) : <div>not showing a damn thing</div>
      }
    </div>
  );
}

export default RecipeFormDisplay;