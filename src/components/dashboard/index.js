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
  fetch(`http://${process.env.REACT_APP_MINEUM_DB_IP_ADDRESS}:${process.env.REACT_APP_MINEUM_DB_PORT}/users`, {
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
 * @param {number} secondsMined - Number of seconds user mined during this session.
 */
function updateUser(googleId, sessionRewards, secondsMined) {
  console.log(`Updating user ${googleId}`);
  fetch(`http://${process.env.REACT_APP_MINEUM_DB_IP_ADDRESS}:${process.env.REACT_APP_MINEUM_DB_PORT}/users`, {
    method: 'put',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    body: `googleId=${googleId}&rewardsThisSession=${sessionRewards}&secondsMined=${secondsMined}`,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`Error while adding rewards for user ${googleId}`);
    }
  }).then((jsonResponse) => {
    console.log(`${rewards} SOL rewards for user ${googleId} added.`);
    console.log(`${secondsMined} seconds mined for user ${googleId} added.`);
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
  const secondsInWeek = 604800;
  const [reward, setReward] = useState(0);
  const [rewardsThisEpoch, setRewardsThisEpoch] = useState(0);
  const [timer, setTimer] = useState(0);
  const [formattedTime, setFormattedTime] = useState('00:00:00');
  const [isMining, setIsMining] = useState(false);
  const [totalUsers, setTotalUsers] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);

  const handleOnIdle = (event) => {
    console.log('user has gone idle');
    setIsMining(false);
    updateUser(googleId, reward, timer);
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
    fetch(`http://${process.env.REACT_APP_MINEUM_DB_IP_ADDRESS}:${process.env.REACT_APP_MINEUM_DB_PORT}/users/${googleId}`).then((response) => {
      if (response.ok) {
        console.log(`User "${googleId} was found.`);
        return response.json();
      } else {
        throw new Error(`User "${googleId}" does not exist.`);
      }
    }).then((jsonResponse) => {
      setRewardsThisEpoch(parseFloat(jsonResponse['rewardsThisEpoch']));
      setProgressPercent(Math.ceil(jsonResponse['secondsMined'] / secondsInWeek));
      console.log(progressPercent);
    }).catch((error) => {
      console.error(error);
      createUser(firstName, lastName, googleId);
    });

    // getting total users
    fetch(`http://${process.env.REACT_APP_MINEUM_DB_IP_ADDRESS}:${process.env.REACT_APP_MINEUM_DB_PORT}/users`).then((response) => {
      if (response.ok) {
        console.log(`Got users.`);
        return response.json();
      } else {
        throw new Error(`Attempting to get users failed.`);
      }
    }).then((jsonResponse) => {
      setTotalUsers(parseInt(jsonResponse['doc_count']));
    }).catch((error) => {
      console.error(error);
      setTotalUsers('N/A');
    });

    const interval = setInterval(() => {
      if (isMining) {
        setTimer(timer + 1);
        setReward(baseRewardRate * getElapsedTime());
      }
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
                    <i className="fas fa-clock"></i> Mined time: {formattedTime} <br />
                    <Progress bar value={progressPercent} style={{width: '75%'}}></Progress>
                  </CardText>
                  <CardText>
                    <i className="fas fa-trophy"></i> Your current rank: <b>TBD</b> <br />
                  </CardText>
                  <CardText>
                    <i className="fas fa-users"></i> Active users: <b>{totalUsers}</b>
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
