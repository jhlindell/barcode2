import red from '@material-ui/core/colors/red';
import orange from '@material-ui/core/colors/orange';
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';
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
      hover: red[700]
    },
    warning: {
      main: orange[500],
      hover: orange[700]
    },
    success: {
      main: green[500],
    },
    info: {
      main: blue[500],
    },
    background: {
      default: '#fff',
      tableRowHighlight: grey[300],
      header: grey[400],
    },
  },
});

export default theme;
