import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles({
  tableHead: {
    textAlign: 'center',
    marginBottom: 8
  }
});

function RecipeIngredientTable(props) {
  const classes = useStyles();
  const { ingredients } = props;
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
    <React.Fragment>
      <Typography variant="h6" className={classes.tableHead}>
        Ingredients:
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {sortedIngredients.map(ingredient => (
              <TableRow key={ingredient.name}>
                <TableCell component="th" scope="row">{ingredient.measure}</TableCell>
                <TableCell>{ingredient.unit}</TableCell>
                <TableCell>{ingredient.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  )
}

export default RecipeIngredientTable;