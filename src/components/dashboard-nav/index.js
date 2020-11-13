/* eslint-disable max-len */
import React from 'react';
import {
  Navbar,
  NavItem,
  NavLink,
  Nav,
  NavbarBrand,
} from 'shards-react';
import {GoogleLogout} from 'react-google-login';
import navLogo from '../../images/MineumlogoBW-03.png';
import PropTypes from 'prop-types';

DashboardNavBar.propTypes = {
  onLogout: PropTypes.func,
};

const logoutButtonStyle = {
  position: 'absolute',
  top: '50px',
  right: '60px',
  width: 100,
  height: 50,
  backgroundColor: '#25c4f4',
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
 * Dashboard navigation bar.
 * @return {React} Navigation section.
 */
export default function DashboardNavBar({onLogout}) {
  const handleGoogleFail = () => {
    console.error('Google failed to logout.');
  };

  return (
    <Navbar expand={'lg'} className="pt-4 px-0">
      <NavbarBrand className="mr-5">
        <img src={navLogo} className="mr-2" width="auto" style={{opacity: 0.5}} height="75" alt="Mineum virtual mobile mining" />
      </NavbarBrand>
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
            onLogoutSuccess={onLogout}
            onFailure={handleGoogleFail}
            render={(renderProps) => (
              <button onClick={renderProps.onClick} style={logoutButtonStyle}>Logout</button>
            )}
          />,
        </NavItem>
      </Nav >
    </Navbar >
  );
}
