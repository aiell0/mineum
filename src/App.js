import React, { useState } from "react";
import './App.css';
import GoogleLogin from 'react-google-login';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

const Dashboard = () => {
  // const authInstance = window.gapi.auth2.getAuthInstance()
  // const user = authInstance.currentUser.get()
  // const profile = user.getBasicProfile()
  // const email = profile.getEmail()
  // const imageUrl = profile.getImageUrl()

  return (
    <>
      {/* <nav>
        <div>BookFace</div>
        <img className="push" src={imageUrl} />
        <Dropdown>
          <Dropdown.Toggle>
            {email}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={authInstance.signOut}>Sign out</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </nav> */}
      <div className="container">
        <p>Look at this bookface</p>
        <img src="https://christianlauersen.files.wordpress.com/2015/11/img_0423.png" />
      </div>
    </>
  )
}

function App() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");
  const [userSignedIn, setUserSignedIn] = useState(false);

  const responseGoogle = response => {
    setName(response.profileObj.name);
    setEmail(response.profileObj.email);
    setUrl(response.profileObj.imageUrl);
    setUserSignedIn(true);
    console.log(response);
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {userSignedIn ? <Redirect to="/dashboard" /> :
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
          <Dashboard />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
