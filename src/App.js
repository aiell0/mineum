/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import {React, useState} from 'react';
import './App.css';
import {Switch, Route, Redirect, useHistory} from 'react-router-dom';
import {Container, Row, Col} from 'shards-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'shards-ui/dist/css/shards.min.css';
import 'shards-ui/dist/css/shards-extras.min.css';
import bigLogo from './images/Mineumlogo1.png';
import madeForSolanaLogo from './images/madeforsolana.png';
import joinOnDiscordLogo from './images/joinondiscord.png';
import forAndroidLogo from './images/forandroid.png';
// import fogStyle from './css/fog.module.css';
import Statistics from './components/statistics';
import Rankings from './components/rankings';
import Counter from './components/counter';
import SocialMedia from './components/social-media';
import About from './components/about';
import Footer from './components/footer';
import HomepageNavBar from './components/homepage-nav';
import Dashboard from './components/dashboard';
require('dotenv').config();

/* eslint-disable require-jsdoc */
// function FogAnimation() {
//   return (
//     <>
//       <div id={`${fogStyle['foglayer_01']}`} className='fog'>
//         <div className='image01'></div>
//         <div className='image02'></div>
//       </div>
//       <div id={`${fogStyle['foglayer_02']}`} className='fog'>
//         <div className='image01'></div>
//         <div className='image02'></div>
//       </div>
//       <div id={`${fogStyle['foglayer_03']}`} className='fog'>
//         <div className='image01'></div>
//         <div className='image02'></div>
//       </div>
//     </>
//   );
// };

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
                  <br></br>
                  <img src={bigLogo} width="100%" height="auto" alt="" />
                  <br></br>
                  <p style={{color: '#c4c7ca'}}>Mineum is a virtual mining initiative and community on the Solana Blockchain. Users get rewarded based on there committed time. To use Mineum you need to have a free <a style={{color: '#c1c2c3'}} href="https://solflare.com/"><b>Solana wallet</b></a> and a <a style={{color: '#c1c2c3'}} href="https://google.com/"><b>Google account.</b></a></p>
                  <p style={{color: '#c4c7ca'}}>Login now and start to earn your first <a style={{color: '#c1c2c3'}} href="https://www.coingecko.com/en/coins/solana"><b>SOL</b></a> coins, or download the Mineum Android application.</p>
                  <div className="d-block mt-4">
                    <a href="https://solana.com/" target="_blank" rel="noreferrer"><img className="w-25 mt-2" style={{opacity: 0.7}} src={madeForSolanaLogo} alt="" /></a>
                    <a href="https://discord.gg/yQKxdsXVNb" target="_blank" rel="noreferrer"><img className="w-25 mt-2" style={{opacity: 0.7}} src={joinOnDiscordLogo} alt="" /></a>
                    <a href="https://laiello.com/" target="_blank" rel="noreferrer"><img className="w-25 mt-2" style={{opacity: 0.7}} src={forAndroidLogo} alt="" /></a>
                  </div>
                </Col>
              </Row>
            </Container>
            <br></br>
            <br></br>
            <Counter />
            <a name="about"><About /></a>
            <a name="statistics"><Statistics /></a>
            <a name="rankings"><Rankings /></a>
            <a name="contact"><SocialMedia /></a>
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

export default App;
