import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  cardHeader: {
    textAlign: 'center',
    backgroundColor: 'lightgray'
  },
  cardActions: {
    justifyContent: 'center'
  },
  cardContent: {
    textAlign: 'center'
  }
});

function TermsOfService(props) {
  const { agreeToTerms } = props;
  const classes = useStyles();
  return (
    <Card>
      <CardHeader
        title="Terms of Service"
        className={classes.cardHeader}
      />
      <CardContent className={classes.cardContent}>
        <p>
          These terms may be updated at any time. When these terms are modified, you must agree to the updated terms to continue using website.
        </p>
        <p>
          Recipes posted should have proper attributions.
        </p>
        <p>
          No Shitposting
        </p>
        <p>
          Be cool.
        </p>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          variant="contained"
          color="primary"
          onClick={agreeToTerms}
        >
          I agree to these terms
        </Button>
      </CardActions>
    </Card>
  )
}

export default TermsOfService;