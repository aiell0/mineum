/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import {React, useState, useEffect} from 'react';
import './App.css';
import {GoogleLogin, GoogleLogout} from 'react-google-login';
import {Switch, Route, Redirect, useHistory} from 'react-router-dom';
import {useIdleTimer} from 'react-idle-timer';
import PropTypes from 'prop-types';
import {Nav, NavItem, NavLink, Navbar, NavbarBrand, NavbarToggler, Collapse, Container, Row, Col, Card, CardBody, CardText, Progress} from 'shards-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'shards-ui/dist/css/shards.min.css';
import navLogo from './images/MineumlogoBW-03.png';
import bigLogo from './images/Mineumlogo1.png';
import madeForSolanaLogo from './images/madeforsolana.png';
import joinOnDiscordLogo from './images/joinondiscord.png';
import forAndroidLogo from './images/forandroid.png';
import gnomeIdleGif from './images/gnomeidle.gif';
// import fogStyle from './css/fog.module.css';
import counterStyle from './css/counter.module.css';
require('dotenv').config();

/**
 * Create User in Database.
 * @param {string} firstName - User's first name.
 * @param {string} lastName - User's last name.
 * @param {string} googleId - User's unique Google ID.
 */
function createUser(firstName, lastName, googleId) {
  console.log(`Adding new user "${googleId}" to database.`);
  fetch(`http://localhost:3001/users`, {
    method: 'post',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    body: `googleId=${googleId}&firstName=${firstName}&lastName=${lastName}`,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`User "${googleId}" could not be added to database.`);
    }
  }).then((jsonResponse) => {
    console.log(`User ${googleId} has been added to the database.`);
    console.log(jsonResponse);
  }).catch((error) => {
    console.error(error);
  });
};

/**
 * Create User in Database.
 * @param {string} googleId - User's google ID.
 * @param {string} sessionRewards - User session rewards.
 */
function updateRewards(googleId, sessionRewards) {
  fetch(`http://localhost:3001/users`, {
    method: 'put',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    body: `googleId=${googleId}&rewardsThisSession=${sessionRewards}`,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`Error while adding rewards for user ${googleId}`);
    }
  }).then((jsonResponse) => {
    console.log(`${rewards} SOL rewards for user ${googleId} added.`);
    console.log(jsonResponse);
  }).catch((error) => {
    console.error(error);
  });
};

/* eslint-disable require-jsdoc */
// function FogAnimation() {
//   return (
//     <>
//       <div id="foglayer_01" className="fog">
//         <div className="image01"></div>
//         <div className="image02"></div>
//       </div>
//       <div id="foglayer_02" className="fog">
//         <div className="image01"></div>
//         <div className="image02"></div>
//       </div>
//       <div id="foglayer_03" className="fog">
//         <div className="image01"></div>
//         <div className="image02"></div>
//       </div>
//     </>
//   );
// };

/**
 * User Dashboard Page.
 * @param {function} onLogout - callback to logout function in App.
 * @param {string} firstName - User's first name.
 * @param {string} lastName - User's last name.
 * @param {string} googleId - User's unique Google ID.
 * @return {React} Google Logout Button.
 */
function Dashboard({onLogout, firstName, lastName, googleId}) {
  const timeout = 5000;
  const baseRewardRate = .0000001;
  const [reward, setReward] = useState(0);
  const [rewardsThisEpoch, setRewardsThisEpoch] = useState(0);

  const handleOnIdle = (event) => {
    updateRewards(googleId, reward);
    onLogout();
  };

  const {getElapsedTime} = useIdleTimer({
    timeout,
    onIdle: handleOnIdle,
    debounce: 500,
  });

  useEffect(() => {
    // getting the user from database only once
    fetch(`http://localhost:3001/users/${googleId}`).then((response) => {
      if (response.ok) {
        console.log(`User "${googleId} was found.`);
        return response.json();
      } else {
        throw new Error(`User "${googleId}" does not exist.`);
      }
    }).then((jsonResponse) => {
      setRewardsThisEpoch(parseFloat(jsonResponse['rewardsThisEpoch']));
    }).catch((error) => {
      console.error(error);
      createUser(firstName, lastName, googleId);
    });

    const interval = setInterval(() => {
      setReward(baseRewardRate * getElapsedTime());
    }, 1000);
    // cleanup
    return () => clearInterval(interval);
  }, [firstName, lastName, googleId]);

  return (
    <>
      <h1>Name: {firstName} {lastName}</h1>
      <h1>Rewards This Epoch: {rewardsThisEpoch} SOL</h1>
      <h1>Rewards This Session: {reward} SOL</h1>
      <Col sm={'12'} md={'5'} lg={'4'} className={'mt-auto'}>
        <br></br>
        <Card className="mb-4">
          <CardBody>
            <img src={gnomeIdleGif} style={{opacity: 0.7, float: 'right'}} width="auto" height="75" className="mr-2" alt="Mineum virtual mobile mining" />
            <CardText>
              <i className="fas fa-clock"></i>Mined time: <b>00:00:00</b> <br /> <font size="2" style={{color: '#DDDDDD'}}>Counts up your minded time</font>
              <Progress bar value='75' style={{width: '75%'}}></Progress>
            </CardText>
            <CardText>
              <i className="fas fa-trophy"></i>Your current rank: <b>#24</b> <br /> <font size="2" style={{color: '#DDDDDD'}}><b>#1</b> user343, <b>#2</b> @user345, <b>#3</b> user123</font>
            </CardText>
            <CardText>
              <i className="fas fa-users"></i>Active users: <b>219</b>
            </CardText>
          </CardBody>
        </Card>
      </Col>
      <div className="container">
        <GoogleLogout
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Logout"
          onLogoutSuccess={handleOnIdle}
        />,
      </div>
    </>
  );
};

// property type checking
Dashboard.propTypes = {
  onLogout: PropTypes.func,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  googleId: PropTypes.string,
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
            <NavBar />
            <Container className={`inner-wrapper mt-auto mb-autoinner-wrapper mt-auto mb-auto`}>
              <Row>
                <Col sm={'12'} md={'5'} lg={'5'} className={'mt-auto mb-auto mr-3'}>
                  <img src={bigLogo} width="100%" height="auto" alt="" />
                  <br></br>
                  <p className="text-muted">Mineum is a virtual mining initiative and community on the Solana Blockchain. Users get rewarded based on there committed time. To use Mineum you need to have a free <a href="https://solflare.com/"><b>Solana wallet</b></a> and a <a href="https://google.com/"><b>Google account.</b></a></p>
                  <p className="text-muted">Login now and start to earn your first <a href="https://solflare.com/"><b>SOL</b></a> coins, or <a href="https://solflare.com/"><b>download</b></a> the Mineum Android application.</p>
                  <div className="d-block mt-4">
                    <a href="https://solana.com/" target="_blank" rel="noreferrer"><img className="w-25 mt-2" style={{opacity: 0.7}} src={madeForSolanaLogo} alt="" /></a>
                    <a href="https://discord.gg/yQKxdsXVNb" target="_blank" rel="noreferrer"><img className="w-25 mt-2" style={{opacity: 0.7}} src={joinOnDiscordLogo} alt="" /></a>
                    <a href="https://laiello.com/" target="_blank" rel="noreferrer"><img className="w-25 mt-2" style={{opacity: 0.7}} src={forAndroidLogo} alt="" /></a>
                  </div>
                </Col>
              </Row>
            </Container>
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              buttonText="Login"
              onSuccess={handleLogin}
              onFailure={handleGoogleFail}
              cookiePolicy={'single_host_origin'}
            />,
            <Counter></Counter>
          </div>
        }
      </Route >
      <Route path="/dashboard">
        <Dashboard
          onLogout={handleLogout}
          firstName={firstName}
          lastName={lastName}
          googleId={googleId}
        />
      </Route>
    </Switch >
  );
}

function NavBar() {
  const [collapseOpen, setCollapseOpen] = useState(false);

  function toggleNavbar() {
    setCollapseOpen(!collapseOpen);
  }

  return (
    <Navbar type="dark" theme="primary" expand={'lg'} className="pt-4 px-0">
      <NavbarBrand className="mr-5">
        <img src={navLogo} className="mr-2" width="auto" style={{opacity: 0.5}} height="75" alt="Mineum virtual mobile mining" />
      </NavbarBrand>
      <NavbarToggler onClick={toggleNavbar} />
      <Collapse open={collapseOpen} navbar>
        <Nav navbar>
          <NavItem>
            <NavLink active href="#">Miner</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#statistics"><i className="fas fa-chart-area"></i>Statistics</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#rankings"><i className="fas fa-chart-area"></i>Rankings</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#rewards"><i className="fas fa-chart-area"></i>Rewards</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#settings"><i className="fas fa-chart-area"></i>Settings</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#information"><i className="fas fa-chart-area"></i>Information</NavLink>
          </NavItem>
        </Nav >
      </Collapse>
    </Navbar >
  );
}

function Counter() {
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [days, setDays] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      let curday;
      const nowDate = new Date();
      const dy = 0; // Sunday through Saturday, 0 to 6
      const countertime = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), 20, 0, 0); // 20 out of 24 hours = 8pm

      const curtime = nowDate.getTime(); // current time
      const atime = countertime.getTime(); // countdown time
      let seconds = parseInt((atime - curtime) / 1000);
      if (seconds > 0) {
        curday = dy - nowDate.getDay();
      } else {
        curday = dy - nowDate.getDay() - 1;
      }

      // after countdown time
      if (curday < 0) {
        curday += 7;
      } // already after countdown time, switch to next week
      if (seconds <= 0) {
        seconds += (86400 * 7);
      }

      setDays(Math.floor(seconds / 86400));
      seconds %= 86400;
      setHours(Math.floor(seconds / 3600));
      seconds %= 3600;
      setMinutes(Math.floor(seconds / 60));
      setSeconds(seconds %= 60);
    }, 1000);

    // cleanup
    return () => clearInterval(interval);
  });

  return (
    <center>
      <div id={`${counterStyle['countholder']}`} >
        <div>
          <span className={counterStyle.days} id="days">{days}</span>
          <div className="smalltext">Days</div>
        </div>
        <div>
          <span className={counterStyle.hours} id="hours">{((hours < 10) ? '0' : '') + hours}</span>
          <div className="smalltext">Hours</div>
        </div>
        <div>
          <span className={counterStyle.minutes} id="minutes">{((minutes < 10) ? '0' : '') + minutes}</span>
          <div className="smalltext">Minutes</div>
        </div>
        <div>
          <span className={counterStyle.seconds} id="seconds">{seconds}</span>
          <div className="smalltext">Seconds</div>
        </div>
        <p>
          <font size="3">Time until next <b>SOL</b> rewards are send out. (Sunday 12am (UTC) ) Current rewards in the pool: <b>62 SOL</b><span id="user" /></font>
        </p>
      </div >
    </center >
  );
}

export default App;
