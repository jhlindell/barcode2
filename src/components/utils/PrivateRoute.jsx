import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default function (ComposedComponent) {
  function PrivateRoute() {
    const auth = useSelector(state => state.auth);
    console.log(auth);
    return (
      <Fragment>
        {auth && auth.authenticated ?
          <ComposedComponent /> : <Redirect to="/signin" />
        }
      </Fragment>
    );
  };
  return PrivateRoute;
}

