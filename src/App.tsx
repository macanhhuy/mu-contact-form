import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { Home } from './pages/Home';
import { Success } from './pages/Success';
import { ThemeProvider, Container, makeStyles, createTheme } from '@material-ui/core';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#337ab7'
    }
  }
});

const useStyles = makeStyles((t) => ({
  wrapper: {
    marginTop: t.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

export default function App() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Container component='main'>
        <div className={classes.wrapper}>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='success' element={<Success />} />
            </Routes>
          </BrowserRouter>
        </div>
      </Container>
    </ThemeProvider>
  );
}