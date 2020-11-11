/* eslint-disable max-len */
import {React, useState, useEffect} from 'react';
import {
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
import {useIdleTimer} from 'react-idle-timer';
import PropTypes from 'prop-types';
import gnomeIdleGif from '../../images/gnomeidle.gif';
import DashboardNavBar from '../dashboard-nav';
import Counter from '../counter';
import Rewards from '../rewards';
import Settings from '../settings';

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

// property type checking
Dashboard.propTypes = {
  onLogout: PropTypes.func,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  googleId: PropTypes.string,
};

/**
 * User Dashboard Page.
 * @param {function} onLogout - callback to logout function in App.
 * @param {string} firstName - User's first name.
 * @param {string} lastName - User's last name.
 * @param {string} googleId - User's unique Google ID.
 * @return {React} Google Logout Button.
 */
export default function Dashboard({onLogout, firstName, lastName, googleId}) {
  const timeout = 5000;
  const baseRewardRate = .0000001;
  const [reward, setReward] = useState(0);
  const [rewardsThisEpoch, setRewardsThisEpoch] = useState(0);
  const [timer, setTimer] = useState(0);
  const [formattedTime, setFormattedTime] = useState('00:00:00');
  const [isMining, setIsMining] = useState(false);

  const handleOnIdle = (event) => {
    console.log('user has gone idle');
    setIsMining(false);
    updateRewards(googleId, reward);
    onLogout();
  };

  const handleStart = () => {
    console.log('start mining');
    setIsMining(true);
  };

  const handleStop = () => {
    console.log('stop mining');
    setIsMining(false);
  };

  const formatTime = () => {
    const getSeconds = `0${(timer % 60)}`.slice(-2);
    const minutes = `${Math.floor(timer / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);
    return `${getHours}:${getMinutes}:${getSeconds}`;
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
      if (isMining) {
        setTimer(timer + 1);
      }
      setReward(baseRewardRate * getElapsedTime());
      setFormattedTime(formatTime());
    }, 1000);
    // cleanup
    return () => clearInterval(interval);
  }, [firstName, lastName, googleId, timer, isMining]);

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
                    <i className="fas fa-clock"></i>Mined time: {formattedTime} <br />
                    <Progress bar value='0' style={{width: '75%'}}></Progress>
                  </CardText>
                  <CardText>
                    <i className="fas fa-trophy"></i>Your current rank: <b>#24</b> <br />
                  </CardText>
                  <CardText>
                    <i className="fas fa-users"></i>Active users: <b>219</b>
                  </CardText>
                  <ButtonGroup> {
                    isMining ? (
                      <>
                        <Button outline theme='dark' disabled={true}>START MINING</Button>
                        <Button outline theme='danger' onClick={handleStop}>STOP MINING</Button>
                      </>
                    ) :
                      (
                        <>
                          <Button outline theme='success' onClick={handleStart}>START MINING</Button>
                          <Button outline theme='dark' disabled={true}>STOP MINING</Button>
                        </>
                      )
                  }
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
