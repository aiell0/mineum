/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
import React from 'react';

/**
 * Shows information about Mineum.
 * @return {React} About section.
 */
export default function About() {
  return (
    <div className="subscribe section bg-dark py-4">
      <h3 className="section-title text-center text-white m-5">About</h3>
      <p className="text-muted col-md-6 text-center mx-auto">The Mineum project started in October 2020 its goal is to bring the Solana blockchain to more users and to get the new users it will send out rewards to the most committed users.
        <br></br>
          The Mineum application is available for multiple devices and systems, and only requires a Google account and Solana wallet.
          Mineum was developed during the Solana hackthon by <a style={{color: '#c1c2c3'}} href="https://github.com/techtek">techtek</a>, a project developer and engineer who has worked on similar products for Hive and Steem, alongside <a style={{color: '#c1c2c3'}} href="https://github.com/aiell0">aiell0</a>, an IT Cloud Architecture Consultant by day and blockchain investor and hacker by night.
        <br></br>
          To develop the Mineum project, 25% of the Hackathon rewards will be used to fill up 52 weeks of rewards. Solana enthusiasts can compete for them each week by using the app.
          25% of the Hackathon rewards will be used for new development and investments such as a dedicated Solana validator node. The rewards generated from this validator will be partially be used to fill Mineum's weekly rewards pool. This will help to grow the project into its full potential and have its own funding from the Solana ecosystem.
      </p>
      <form className="form-inline d-table mb-5 mx-auto" action="/">
        <div className="form-group"></div>
      </form>
    </div >
  );
}
