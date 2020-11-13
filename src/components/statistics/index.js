/* eslint-disable max-len */
import {React, useEffect, useState} from 'react';
import * as solanaWeb3 from '@solana/web3.js';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  CardDeck,
  CardTitle,
} from 'shards-react';

/**
 * Shows statistics for Mineum.
 * @return {React} Statistics section.
 */
export default function Statistics() {
  const [solanaPrice, setSolanaPrice] = useState('retrieving...');
  const [poolBalance, setPoolBalance] = useState('retrieving...');

  useEffect(() => {
    fetch(`https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd`, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
      },
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Could not get Solana price from Coingecko. Possible API failure?`);
      }
    }).then((jsonResponse) => {
      setSolanaPrice(jsonResponse['solana']['usd']);
    }).catch((error) => {
      console.error(error);
      setSolanaPrice('N/A');
    });

    const connection = new solanaWeb3.Connection('https://devnet.solana.com');
    const publicKey = new solanaWeb3.PublicKey(`${process.env.REACT_APP_MINEUM_ADDRESS}`);
    connection.getBalance(publicKey).then((balance) => {
      setPoolBalance(balance);
    }).catch((error) => {
      console.error(error);
      setPoolBalance('N/A');
    });
  }, []);

  return (
    <div className="blog section section-invert py-4">
      <h3 className="section-title text-center m-5">
        <i className="fas fa-chart-area" style={{color: '#DDDDDD'}} ></i>
        Statistics
      </h3>
      <Container>
        <center><p className="text-muted">Pool and miner related statistics, historical statistics can be found in the <a href="https://explorer.solana.com/">Solana block explorer.</a></p></center>
        <div className="py-4">
          <Row>
            <CardDeck>
              <Col md={'12'} lg={'4'}>
                <Card className="mb-4">
                  <CardBody>
                    <CardTitle>248</CardTitle>
                    <CardText>
                      <i className="fas fa-users"></i>
                      Total users this week
                    </CardText>
                  </CardBody>
                </Card>
              </Col>
              <Col md={'12'} lg={'4'}>
                <Card className="mb-4">
                  <CardBody>
                    <CardTitle>248</CardTitle>
                    <CardText>
                      <i className="fas fa-users"></i>
                       Users active now
                    </CardText>
                  </CardBody>
                </Card>
              </Col>
              <Col md={'12'} lg={'4'}>
                <Card className="mb-4">
                  <CardBody>
                    <CardTitle>.248 </CardTitle>
                    <CardText>
                      <i className="fas fa-money-bill-wave"></i>
                       Average payout (SOL)
                    </CardText>
                  </CardBody>
                </Card>
              </Col>
              <Col md={'12'} lg={'4'}>
                <Card className="mb-4">
                  <CardBody>
                    <CardTitle>{poolBalance}</CardTitle>
                    <CardText>
                      <i className="fas fa-money-bill-wave"></i>
                       Currently in the pool (SOL)
                    </CardText>
                  </CardBody>
                </Card>
              </Col>
              <Col md={'12'} lg={'4'}>
                <Card className="mb-4">
                  <CardBody>
                    <CardTitle>6:05:46:21</CardTitle>
                    <CardText>
                      <i className="fas fa-clock"></i>
                       Time until next payout (d:h:m:s)
                    </CardText>
                  </CardBody>
                </Card>
              </Col>
              <Col md={'12'} lg={'4'}>
                <Card className="mb-4">
                  <CardBody>
                    <CardTitle>{solanaPrice}</CardTitle>
                    <CardText>
                      <i className="fas fa-money-bill-wave"></i>
                       SOL Price (USD)
                    </CardText>
                  </CardBody>
                </Card>
              </Col>
            </CardDeck>
          </Row>
        </div>
      </Container>
    </div >
  );
}
