import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#7A7B9F', // cor principal
    },
    secondary: {
      main: '#1A1B2D', // cor secundária
    },
    error: {
      main: '#F44336', // cor de erro
    },
    success: {
      main: '#892CCD'
    },
    background: {
      default: '#0F0F1A', // cor de fundo
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0',
    },
  },
});

export default theme;