import red from '@material-ui/core/colors/red';
import orange from '@material-ui/core/colors/orange';
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red[400],
    },
    warning: {
      main: orange[500],
    },
    success: {
      main: green[500],
    },
    info: {
      main: blue[500]
    },
    background: {
      default: '#fff',
    },
  },
});

export default theme;
