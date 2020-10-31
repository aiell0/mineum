/* eslint-disable max-len */
import {React, useState} from 'react';
import './App.css';
import {GoogleLogin, GoogleLogout} from 'react-google-login';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

const Dashboard = () => {
  return (
    <>
      <div className="container">
        <GoogleLogout
          clientId="313696716932-2i8kgp5113dhrptkqbhhjjli379bhhe5.apps.googleusercontent.com"
          buttonText="Logout"
          onLogoutSuccess={() => {}}
        />,
      </div>
    </>
  );
};

/**
 * Main React App.
 * @return {React}
 */
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const responseGoogle = (response) => {
    setIsLoggedIn(true);
    console.log(response);
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {isLoggedIn ? <Redirect to="/dashboard" /> :
            <div className="App">
              <h1>Mineum</h1>
              <GoogleLogin
                clientId="313696716932-2i8kgp5113dhrptkqbhhjjli379bhhe5.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
              />,
            </div>
          }
        </Route>
        <Route path="/dashboard">
          <Dashboard setIsLoggedIn />
        </Route>
      </Switch>
    </BrowserRouter >
  );
}

export default App;
