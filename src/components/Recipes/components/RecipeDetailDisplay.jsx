import React, { Fragment } from 'react';
import cocktail from '../../../cocktail.jpeg';
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  CardMedia
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../../../theme';

const useStyles = makeStyles({
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '92vh'
  },
  card: {
    maxWidth: '50%'
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
    width: 50,
    marginRight: 20
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
  }
});

function RecipeDetailDisplay(props) {
  const classes = useStyles();
  const {
    recipe,
    goBack,
    handleDelete,
    handleEdit,
    auth
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