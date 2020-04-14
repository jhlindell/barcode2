import React, { Fragment } from 'react';
import cocktail from '../../../cocktail.jpeg';
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  CardMedia,
  Grid,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
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
    maxWidth: '80%',
    minWidth: 350
  },
  cardHeader: {
    backgroundColor: theme.palette.background.header,
    textAlign: 'center'
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'center'
  },
  cardMedia: {
    width: 75,
    alignSelf: 'center',
    justifySelf: 'center',
    display: 'flex',
    margin: 'auto'
  },
  content: {
    display: 'flex',
    flexDirection: 'row'
  },
  deleteButton: {
    color: theme.palette.getContrastText(theme.palette.error.main),
    backgroundColor: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.hover
    }
  },
  editButton: {
    color: theme.palette.getContrastText(theme.palette.warning.main),
    backgroundColor: theme.palette.warning.main,
    '&:hover': {
      backgroundColor: theme.palette.warning.hover
    }
  },
  descriptionGrid: {
    borderBottom: 'solid lightgray 1px',
    marginBottom: 8
  },
  instructionHeader: {
    textAlign: 'center',
    marginBottom: 8
  },
});

function RecipeDetailDisplay(props) {
  const classes = useStyles();
  const {
    recipe,
    goBack,
    handleDelete,
    handleEdit,
    auth,
  } = props;

  return (
    <div className={classes.cardContainer}>
      {recipe.current ?
        <Card className={classes.card}>
          <CardHeader
            className={classes.cardHeader}
            title={recipe.current.name}
          />
          <CardContent>
            <Grid
              container
              spacing={2}
              className={classes.descriptionGrid}
            >
              <Grid item xs={9}>
                <Typography variant="h5">
                  Description:
                </Typography>
                <p>{recipe.current.description}</p>
              </Grid>
              <Grid item xs={3}>
                <CardMedia
                  className={classes.cardMedia}
                  src={cocktail}
                  component="img"
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <RecipeIngredients
                  ingredients={recipe.current.ingredients}
                  deleteIngredient={null}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" className={classes.instructionHeader}>
                  Instructions:
                </Typography>
                <RecipeInstructions
                  instructions={recipe.current.instructions}
                  deleteInstruction={null}
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions className={classes.cardFooter}>
            <Button
              color="secondary"
              variant="contained"
              onClick={() => goBack()}
            >
              Go back
            </Button>
            {auth && auth.authenticated ?
              <Fragment>
                <Button
                  variant="contained"
                  onClick={handleDelete}
                  classes={{
                    root: classes.deleteButton
                  }}
                >
                  Delete
              </Button>
                <Button
                  variant="contained"
                  onClick={handleEdit}
                  classes={{
                    root: classes.editButton
                  }}
                >
                  Edit
              </Button>
              </Fragment>
              : null
            }
          </CardActions>
        </Card>
        : null
      }
    </div>
  )
}

export default RecipeDetailDisplay;