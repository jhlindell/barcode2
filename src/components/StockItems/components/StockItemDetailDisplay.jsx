import React from 'react';
import bottle from '../../../bottle.jpeg';
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
  }
});

function StockItemDetailDisplay(props) {
  const classes = useStyles();
  const { stockItem, goBack } = props;

  return (
    <div className={classes.cardContainer}>
      {stockItem.current ? (
        <Card className={classes.card}>
          <CardHeader
            className={classes.cardHeader}
            title={stockItem.current.name}
          />
          <CardContent className={classes.content}>
            <CardMedia
              className={classes.cardMedia}
              src={bottle}
              component="img"
            />
            {stockItem.current.description}
          </CardContent>

          <CardActions className={classes.cardFooter}>
            <Button
              color="secondary"
              variant="contained"
              onClick={() => goBack()}
            >
              Go back
            </Button>
          </CardActions>
        </Card>
      ) : null
      }
    </div>
  );
};

export default StockItemDetailDisplay;