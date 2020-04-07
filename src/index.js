import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import theme from './theme';
import reducers from './reducers';
import logger from 'redux-logger';

const middleWares = [
  thunk,
  logger
];

const store = createStore(reducers, applyMiddleware(...middleWares));

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);
