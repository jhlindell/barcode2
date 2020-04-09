import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router'
import theme from './theme';
import configureStore, { history } from './configureStore';
import { AUTH_USER, getUserName } from './components/Login/actions'

const store = configureStore();

const token = localStorage.getItem('token');

if (token) {
  store.dispatch({ type: AUTH_USER, payload: token });
  store.dispatch(getUserName());
}

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);
