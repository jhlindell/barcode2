import React, { Fragment } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
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
  Tooltip,
  Typography
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search'
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import theme from '../../../theme';

const useStyles = makeStyles({
  card: {
    marginTop: 20,
    marginBottom: 20
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
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    marginLeft: 6
  },
  searchButton: {
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.hover
    },
    marginLeft: 10
  },
  searchGroup: {
    display: 'flex',
    alignItems: 'center',
    paddingRight: 6
  }
});

const StyledTableRow = withStyles({
  root: {
    cursor: 'pointer',
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.tableRowHighlight
    },
  }
})(TableRow);

function RecipeListDisplay(props) {
  const classes = useStyles();
  const {
    recipeList,
    handlePageChange,
    activePage,
    itemsPerPage,
    handleItemsPerPageChange,
    searchBox,
    handleSearchBoxChange,
    handleSearchBoxSubmit,
    handleNewRecipeClick,
    auth,
    history
  } = props;

  function renderHeaderNode() {
    return (
      <div className={classes.headerDiv}>
        <div className={classes.title}>
          <Typography variant='h4'>
            Recipes
          </Typography>
        </div>
        <div className={classes.searchGroup}>
          <TextField
            placeholder="Search"
            variant="outlined"
            margin="dense"
            value={searchBox}
            onChange={handleSearchBoxChange}
            label="Search"
            onKeyDown={onKeyDown}
          />
          <Tooltip title="Submit Search">
            <IconButton
              onClick={handleSearchBoxSubmit}
              classes={{
                root: classes.searchButton
              }}
              size="small"
            >
              <SearchIcon />
            </IconButton>
          </Tooltip>
          {auth && auth.authenticated ?
            <Tooltip title="New Recipe">
              <IconButton
                onClick={handleNewRecipeClick}
                size="small"
                classes={{
                  root: classes.searchButton
                }}
              >
                <AddOutlinedIcon />
              </IconButton>
            </Tooltip>
            : null
          }
        </div>
      </div>
    )
  }

  function recipeRedirect(id) {
    history.push(`/recipes/${id}`);
  }

  function onKeyDown(event) {
    if (event.key === 'Enter' || event.key === 'NumpadEnter') {
      event.preventDefault();
      event.stopPropagation();
      handleSearchBoxSubmit();
    }
  }

  return (
    <Fragment>
      {recipeList.docs ?
        (
          <Card className={classes.card}>
            <CardHeader
              className={classes.headerStyles}
              title={renderHeaderNode()}
            />
            <CardContent>
              <TableContainer component={Paper}>
                <Table aria-label="recipe list">
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
                    {recipeList.docs.map((row) => (
                      <StyledTableRow
                        key={row.name + row.description}
                        onClick={() => recipeRedirect(row._id)}
                      >
                        <TableCell component="th" scope="row">{row.name}</TableCell>
                        <TableCell>{row.description}</TableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        rowsPerPageOptions={[5, 10, 20]}
                        count={recipeList.total}
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
        ) : null
      }
    </Fragment>

  );
};

export default RecipeListDisplay;