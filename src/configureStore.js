import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from './reducers';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const history = createBrowserHistory();

const middleWares = [
  thunk,
  logger,
  routerMiddleware(history)
];

export default function configureStore() {
  const store = createStore(
    createRootReducer(history),
    compose(
      applyMiddleware(...middleWares)
    )
  )
  return store;
}
