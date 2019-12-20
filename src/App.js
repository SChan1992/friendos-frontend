import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './util/theme';
import jwtDecode from 'jwt-decode';

// Components imported
import Navbar from './components/Navbar';
import AuthRoute from './util/AuthRoute';

// Pages imported
import home from './pages/home';
import signup from './pages/signup';
import login from './pages/login';

const theme = createMuiTheme(themeFile);

let authenticated;
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  console.log(decodedToken);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = '/login';
    authenticated = false;
  } else {
    authenticated = true;
  }
}

function App() {
  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <Router>
          <Navbar/>
          <div className='container'>
            <Switch>
              <Route exact path="/" component={ home } />
              <Route exact path="/home" component={ home } />
              <AuthRoute exact path="/signup" component={ signup } authenticated={authenticated} />
              <AuthRoute exact path="/login" component={ login } authenticated={authenticated} />
            </Switch>
          </div>
        </Router>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
