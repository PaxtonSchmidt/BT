import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  typography: {
    fontFamily:
      'Lucida Sans, Lucida Sans Regular, Lucida Grande, Lucida Sans Unicode, Geneva, Verdana, sans-serif',
  },
  palette: {
    primary: {
      main: '#1a1a1a',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#efff0a',
      contrastText: '#FFFFFF'
    },
    info: {
      main: '#efff0a',
      contrastText: '#FFFFFF'
    },
  }
});
