import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

import { createTheme, ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import "cropperjs/dist/cropper.css";


const themeL = createTheme({
  palette: {
    background: {
      default: "#efeff1",
    },
    primary: {
      main: "#efeff1"
    },
    secondary: {
      main: "#0b0c10",
    },
    text: {
      primary: "#0b0c10"
    }
  }
});

const themeD = createTheme({
  palette: {
    background: {
      default: "#0b0c10",
    },
    primary: {
      main: "#0b0c10"
    },
    secondary: {
      main: "#efeff1",
    },
    text: {
      primary: "#efeff1"
    }
  }
});

ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={themeD}>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StyledEngineProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
