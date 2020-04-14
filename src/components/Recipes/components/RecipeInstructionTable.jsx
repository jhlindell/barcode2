import React, { Fragment } from 'react';
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import theme from '../../../theme';

const useStyles = makeStyles({
  deleteButton: {
    backgroundColor: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.hover
    },
    marginLeft: 10
  }
})

function RecipeInstructionTable(props) {
  const { instructions, deleteInstruction } = props;
  const classes = useStyles();

  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {instructions.map((instruction, index) => (
              <TableRow key={instruction}>
                <TableCell component="th" scope="row">{index + 1}. {instruction}</TableCell>
                {deleteInstruction && (
                  <TableCell>
                    <Tooltip title="Delete Instruction">
                      <IconButton
                        onClick={() => deleteInstruction(index)}
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

export default RecipeInstructionTable;