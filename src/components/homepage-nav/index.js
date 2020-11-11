/* eslint-disable max-len */
import React from 'react';
import {
  Navbar,
  NavItem,
  NavLink,
  Nav,
  NavbarBrand,
} from 'shards-react';
import {GoogleLogin} from 'react-google-login';
import navLogo from '../../images/MineumlogoBW-03.png';
import PropTypes from 'prop-types';

HomepageNavBar.propTypes = {
  onLogin: PropTypes.func,
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

/**
 * Homepage navigation bar.
 * @return {React} Navigation section.
 */
export default function HomepageNavBar({onLogin}) {
  const handleGoogleFail = () => {
    console.error('Google failed to login.');
  };

  return (
    <Navbar type="dark" theme="primary" expand={'lg'} className="pt-4 px-0">
      <NavbarBrand className="mr-5">
        <img src={navLogo} className="mr-2" width="auto" style={{opacity: 0.5}} height="75" alt="Mineum virtual mobile mining" />
      </NavbarBrand>
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
    </Navbar >
  );
}
