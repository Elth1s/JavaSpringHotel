import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes, useRoutes } from 'react-router-dom';
import { createTheme, ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import routes from "./routes"
import { useActions } from './hooks/useActions';
import { useTypedSelector } from './hooks/useTypedSelector';
import { ToastContainer } from 'react-toastify';

function App() {
  const { SetTheme } = useActions();
  const { darkTheme } = useTypedSelector((state) => state.ui);

  const darkThemeLS = localStorage.darkTheme;
  useEffect(() => {
    if (darkThemeLS) {
      SetTheme(JSON.parse(darkThemeLS.toLowerCase()));
    }
  }, []);

  const themeL = createTheme({
    palette: {
      background: {
        default: "#efeff1",
        paper: "#efeff1",
      },
      primary: {
        main: "#45a29e"
      },
      secondary: {
        main: "#0b0c10",
      },
      text: {
        primary: "#0b0c10"
      },
    },
    components: {
      MuiIconButton: {
        defaultProps: {
          color: "primary"
        }
      },
      MuiSwitch: {
        styleOverrides: {
          switchBase: {
            color: "#0b0c10"
          }
        }
      },
    }
  });

  const themeD = createTheme({
    palette: {
      background: {
        default: "#0b0c10",
        paper: "#0b0c10",
      },
      primary: {
        main: "#66fcf1"
      },
      secondary: {
        main: "#efeff1",
      },
      text: {
        primary: "#efeff1"
      }
    },
    components: {
      MuiIconButton: {
        defaultProps: {
          color: "primary"
        }
      },
      MuiSwitch: {
        defaultProps: {
          color: "primary"
        }
      }
    }
  });

  let element = useRoutes(routes)
  return (
    <>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={darkTheme ? themeD : themeL}>
          <CssBaseline />
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark" />
          {element}
        </ThemeProvider>
      </StyledEngineProvider>
    </>
    //   <Routes>
    //     <Route path="/" element={<DefaultLayout />}>
    //       <Route index element={<HomePage />} />

    //     </Route>
    //   <Route element={<AuthLayout />}>
    //       <Route path="/auth/login" element={<LogIn />} />
    //       <Route path="/auth/signup" element={<SignUp />} />

    //     </Route>
    //  <Route path="*" element={<NotFound />} /> 
    //  </Routes>
  );
}

export default App;
