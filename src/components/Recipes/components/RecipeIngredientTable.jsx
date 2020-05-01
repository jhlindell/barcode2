import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
  Typography
} from '@material-ui/core';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import theme from '../../../theme';

const useStyles = makeStyles({
  tableHead: {
    textAlign: 'center',
    marginBottom: 8
  },
  deleteButton: {
    backgroundColor: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.hover
    },
    marginLeft: 10
  }
});

function RecipeIngredientTable(props) {
  const classes = useStyles();
  const { ingredients, deleteIngredient } = props;
  const sortedIngredients = ingredients.sort((a, b) => {
    if (a.measure > b.measure) {
      return -1;
    }
    if (a.measure < b.measure) {
      return 1;
    }
    return 0
  });

  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {sortedIngredients.map((ingredient, index) => (
              <TableRow key={ingredient.name}>
                <TableCell component="th" scope="row">{ingredient.measure}</TableCell>
                <TableCell>{ingredient.unit}</TableCell>
                <TableCell>{ingredient.name}</TableCell>
                {deleteIngredient && (
                  <TableCell>
                    <Tooltip title="Delete Ingredient">
                      <IconButton
                        onClick={() => deleteIngredient(index)}
                        classes={{
                          root: classes.deleteButton
                        }}
                        size="small"
                      >
                        <ClearOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  )
}

export default RecipeIngredientTable;