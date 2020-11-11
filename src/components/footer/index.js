/* eslint-disable max-len */
import React from 'react';
import {
  Container,
  Navbar,
} from 'shards-react';
import navLogo from '../../images/MineumlogoBW-03.png';

/**
 * Footer for Mineum.
 * @return {React} Footer section.
 */
export default function Footer() {
  return (
    <footer>
      <Navbar type="dark" theme="primary" expand={'lg'} className="bg-dark">
        <Container>
          <img src={navLogo} width="auto" height="75" style={{opacity: 0.5}} className="mr-2" alt="Mineum virtual mobile mining" />
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <a className="nav-link" href="#">Miner <span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="https://discord.gg/yQMmmFw" target="_blank" rel="noreferrer">Support</a>
              </li>
            </ul>
          </div>
        </Container>
      </Navbar>
    </footer>
  );
}
