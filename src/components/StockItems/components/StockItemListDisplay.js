import React, { Fragment } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  TextField,
  Typography
} from '@material-ui/core';
// import { Link } from 'react-router-dom';
import theme from '../../../theme';

const useStyles = makeStyles({
  cardContainer: {
    width: '80%',
    display: 'flex',
    margin: '20px auto 20px auto',
  },
  tableHeader: {
    backgroundColor: theme.palette.secondary.main,
  },
  headerStyles: {
    backgroundColor: theme.palette.background.header,
    padding: 0
  },
  headerDiv: {
    padding: 10,
    display: 'flex',
    justifyContent: 'space-between'
  },
  title: {
    marginLeft: 20
  },
  searchGroup: {
    marginRight: 6,
    display: 'flex',
    alignItems: 'center'
  },
  searchField: {
    marginRight: 10
  }
});

const StyledTableRow = withStyles({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.tableRowHighlight
    },
  }
})(TableRow);

function StockItemListDisplay(props) {
  const classes = useStyles();
  const {
    stockItemList,
    handlePageChange,
    activePage,
    itemsPerPage,
    handleItemsPerPageChange,
    searchBox,
    handleSearchBoxChange,
    handleSearchBoxSubmit
  } = props;

  function renderHeaderNode() {
    return (
      <div className={classes.headerDiv}>
        <div className={classes.title}>
          <Typography variant='h4'>
            Ingredients
          </Typography>
        </div>
        <div className={classes.searchGroup}>
          <TextField
            value={searchBox}
            error={undefined}
            onChange={handleSearchBoxChange}
            label="Search Ingredients"
            className={classes.searchField}
          />
          <Button
            variant="contained"
            onClick={handleSearchBoxSubmit}
            color="secondary"
          >
            Submit
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Fragment>
      {stockItemList.docs ?
        (
          <div className={classes.cardContainer}>
            <Card>
              <CardHeader
                className={classes.headerStyles}
                title={renderHeaderNode()}
              />
              <CardContent>
                <TableContainer component={Paper}>
                  <Table aria-label="stock item list">
                    <TableHead className={classes.tableHeader}>
                      <TableRow>
                        <TableCell>
                          <Typography variant='h6'>
                            Name
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='h6'>
                            Description
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {stockItemList.docs.map((row) => (
                        <StyledTableRow key={row.name + row.description}>
                          <TableCell component="th" scope="row">{row.name}</TableCell>
                          <TableCell>{row.description}</TableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TablePagination
                          rowsPerPageOptions={[5, 10, 20]}
                          count={stockItemList.total}
                          onChangePage={handlePageChange}
                          page={activePage}
                          rowsPerPage={itemsPerPage}
                          onChangeRowsPerPage={handleItemsPerPageChange}
                        />
                      </TableRow>
                    </TableFooter>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </div>
        ) : null
      }
    </Fragment>

  );
};

export default StockItemListDisplay;