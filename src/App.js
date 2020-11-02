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
function Dashboard({onLogout, firstName, lastName, googleId}) {
	let rewardsThisEpoch = 0;
	fetch(`http://localhost:3001/users/${googleId}`).then((response) => {
		console.log(response);
		if (response.ok) {
			return response.json();
		} else {
			console.log(`Adding new user ${googleId} to database.`);
			fetch(`http://localhost:3001/users/${googleId}/${firstName}/${lastName}`, {
				method: 'POST',
			}).then((response) => {
				console.log(response);
				if (response.ok) {
					return response.json();
				} else {
					throw new Error(`Error while adding user ${googleId}`);
				}
			}).then((jsonResponse) => {
				console.log(jsonResponse);
			}).catch((error) => {
				console.error(error);
			});
		}
	}).then((jsonResponse) => {
		console.log(jsonResponse);
		rewardsThisEpoch = jsonResponse['rewardsThisEpoch'];
	}).catch((error) => {
		rewardsThisEpoch = 'N/A';
		console.error(error);
	});

	return (
		<>
			<p>Name: {firstName} {lastName}</p>
			<p>Rewards this Epoch: {rewardsThisEpoch} SOL</p>
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
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [googleId, setGoogleId] = useState('');
	const history = useHistory();

	const handleLogin = (response) => {
		setFirstName(response.profileObj.givenName);
		setLastName(response.profileObj.familyName);
		setGoogleId(response.profileObj.googleId);
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
		console.error('Google failed to login.');
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
				<Dashboard onLogout={handleLogout} firstName={firstName} lastName={lastName} googleId={googleId} />
			</Route>
		</Switch>
	);
}

export default App;
