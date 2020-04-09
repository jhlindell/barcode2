import {
  red,
  orange,
  green,
  blue,
  grey,
  teal
} from '@material-ui/core/colors'
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#000',
    },
    secondary: {
      main: teal[500],
      hover: teal[700]
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
