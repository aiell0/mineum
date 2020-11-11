import React from 'react';
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
                    <CardTitle>26.87 </CardTitle>
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
                    <CardTitle>2.00</CardTitle>
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
