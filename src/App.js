/* eslint-disable max-len */
/* eslint-disable indent */
/* eslint-disable no-tabs */
/* eslint-disable react/prop-types */
import {React, useState} from 'react';
import './App.css';
import {GoogleLogin, GoogleLogout} from 'react-google-login';
import {Switch, Route, Redirect, useHistory} from 'react-router-dom';
require('dotenv').config();

/**
 * User Dashboard Page.
 * @param {function} onLogout - callback to logout function in App.
 * @return {React} Google Logout Button.
 */
function Dashboard({onLogout}) {
	return (
		<>
			<div className="container">
				<GoogleLogout
					clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
					buttonText="Logout"
					onLogoutSuccess={onLogout}
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
	const history = useHistory();
	const handleLogin = (response) => {
		setIsLoggedIn(true);
		console.log('Logged in to Google.');
		console.log(response);
	};
	const handleLogout = () => {
		setIsLoggedIn(false);
		console.log('Logged out of Google.');
		history.push('/');
	};
	const handleGoogleFail = () => {
		console.log('ya dun fucked up');
	};

	return (
		<Switch>
			<Route exact path="/">
				{isLoggedIn ? <Redirect to="/dashboard" /> :
					<div className="App">
						<h1>Mineum</h1>
						<GoogleLogin
							clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
							buttonText="Login"
							onSuccess={handleLogin}
							onFailure={handleGoogleFail}
							cookiePolicy={'single_host_origin'}
						/>,
            </div>
				}
			</Route>
			<Route path="/dashboard">
				<Dashboard onLogout={handleLogout} />
			</Route>
		</Switch>
	);
}

export default App;
