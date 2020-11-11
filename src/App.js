/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import {React, useState, useEffect} from 'react';
import './App.css';
import {GoogleLogin, GoogleLogout} from 'react-google-login';
import {Switch, Route, Redirect, useHistory} from 'react-router-dom';
import {useIdleTimer} from 'react-idle-timer';
import PropTypes from 'prop-types';
import {
  Nav,
  NavItem,
  NavLink,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  Progress,
  CardTitle,
  Button,
  ButtonGroup,
} from 'shards-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'shards-ui/dist/css/shards.min.css';
import 'shards-ui/dist/css/shards-extras.min.css';
import navLogo from './images/MineumlogoBW-03.png';
import bigLogo from './images/Mineumlogo1.png';
import madeForSolanaLogo from './images/madeforsolana.png';
import joinOnDiscordLogo from './images/joinondiscord.png';
import forAndroidLogo from './images/forandroid.png';
import gnomeIdleGif from './images/gnomeidle.gif';
import fogStyle from './css/fog.module.css';
import Statistics from './components/statistics';
import Settings from './components/settings';
import Rankings from './components/rankings';
import Rewards from './components/rewards';
import Counter from './components/counter';
import SocialMedia from './components/social-media';
import About from './components/about';
import Footer from './components/footer';
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
/* eslint-disable no-unused-vars */
function FogAnimation() {
  return (
    <>
      <div id={`${fogStyle['foglayer_01']}`} className='fog'>
        <div className='image01'></div>
        <div className='image02'></div>
      </div>
      <div id={`${fogStyle['foglayer_02']}`} className='fog'>
        <div className='image01'></div>
        <div className='image02'></div>
      </div>
      <div id={`${fogStyle['foglayer_03']}`} className='fog'>
        <div className='image01'></div>
        <div className='image02'></div>
      </div>
    </>
  );
};

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
      <DashboardNavBar onLogout={handleOnIdle} />
      <Container>
        <div className="py-4">
          <Row>
            <Col sm={'12'} md={'4'} lg={'6'} className={'mt-auto'}>
              <Card className="mb-4">
                <CardTitle><i className="fas fa-gavel"></i> {firstName} {lastName}</CardTitle>
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
                  <ButtonGroup>
                    <Button outline theme="success">START MINING</Button>
                    <Button outline theme="danger">STOP MINING</Button>
                  </ButtonGroup>
                </CardBody>
              </Card>
            </Col>
            <Col sm={'12'} md={'4'} lg={'6'}>
              <Counter></Counter>
            </Col>
          </Row>
        </div>
      </Container>
      <Rewards epochRewards={rewardsThisEpoch} />
      <Settings />
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

  return (
    <Switch>
      <Route exact path="/">
        {isLoggedIn ? <Redirect to="/dashboard" /> :
          <div className="App">
            <HomepageNavBar onLogin={handleLogin} />
            < Container className={`inner-wrapper mt-auto mb-autoinner-wrapper mt-auto mb-auto`}>
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
            <Counter />
            <About />
            <Statistics />
            <Rankings />
            <SocialMedia />
            <Footer />
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

// property type checking
HomepageNavBar.propTypes = {
  onLogin: PropTypes.func,
};

// property type checking
DashboardNavBar.propTypes = {
  onLogout: PropTypes.func,
};

const loginButtonStyle = {
  position: 'absolute',
  top: '50px',
  right: '60px',
  width: 100,
  height: 50,
  backgroundColor: 'rgb(66, 133, 244)',
  alignItems: 'center',
  color: '#fff',
  boxShadow: '0 2px 2px 0 rgba(0, 0, 0, .24), 0 0 1px 0 rgba(0, 0, 0, .24)',
  padding: 2,
  borderRadius: 2,
  border: '1px solid transparent',
  fontSize: 18,
  fontWeight: '500',
  fontFamily: 'Roboto, sans-serif',
};

function HomepageNavBar({onLogin}) {
  const [collapseOpen, setCollapseOpen] = useState(false);

  function toggleNavbar() {
    setCollapseOpen(!collapseOpen);
  }

  const handleGoogleFail = () => {
    console.error('Google failed to login.');
  };

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
            <NavLink href="#statistics"><i className="fas fa-chart-area"></i> Statistics</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#rankings"><i className="fas fa-trophy"></i> Rankings</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#about"><i className="fas fa-info"></i> About</NavLink>
          </NavItem>
          <NavItem></NavItem>
          <NavItem>
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              buttonText="Login"
              onSuccess={onLogin}
              onFailure={handleGoogleFail}
              render={(renderProps) => (
                <button onClick={renderProps.onClick} style={loginButtonStyle}>Login</button>
              )}
            />,
          </NavItem>
        </Nav >
      </Collapse>
    </Navbar >
  );
}

function DashboardNavBar({onLogout}) {
  const [collapseOpen, setCollapseOpen] = useState(false);

  function toggleNavbar() {
    setCollapseOpen(!collapseOpen);
  }

  const handleGoogleFail = () => {
    console.error('Google failed to logout.');
  };

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
            <NavLink href="#rewards"><i className="fas fa-medal"></i> Rewards</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#settings"><i className="fas fa-cogs"></i> Settings</NavLink>
          </NavItem>
          <NavItem>
            <GoogleLogout
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              buttonText="Logout"
              onLogoutSuccess={onLogout}
              onFailure={handleGoogleFail}
              render={(renderProps) => (
                <button onClick={renderProps.onClick} style={loginButtonStyle}>Login</button>
              )}
            />,
          </NavItem>
        </Nav >
      </Collapse>
    </Navbar >
  );
}

export default App;
