/* eslint-disable max-len */
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
  Form,
  FormInput,
  FormGroup,
  Button,
} from 'shards-react';
import PropTypes from 'prop-types';

// property type checking
Rewards.propTypes = {
  epochRewards: PropTypes.number,
};

/**
 * Shows overall user rewards for Mineum.
 * @return {React} Rewards section.
 */
export default function Rewards({epochRewards}) {
  return (
    <div className="blog section section-invert py-4">
      <h3 className="section-title text-center m-5"><i className="fas fa-trophy" style={{color: '#DDDDDD'}} > </i> Rewards</h3>
      <Container>
        <div className="py-4">
          <Row>
            <CardDeck>
              <Col md={'12'} lg={'4'}>
                <Card className="mb-4">
                  <CardBody>
                    <CardTitle>SOL</CardTitle>
                    <CardText>You received: <b>{epochRewards} SOL</b></CardText>
                    <CardText>Improve the weekly SOL rewards pool by voting for our <a href="">Solana validator server</a></CardText>
                    <table>
                      <tr>
                        <th>Week</th>
                        <th>Amount</th>
                      </tr>
                      <tr>
                        <td>Week 8</td>
                        <td>0.253</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Week 7</td>
                        <td>0.385</td>
                      </tr>
                      <tr>
                        <td>Week 6</td>
                        <td>0.307</td>
                      </tr>
                      <tr>
                        <td>Week 5</td>
                        <td>0.201</td>
                      </tr>
                      <tr>
                        <td>Week 4</td>
                        <td>0.178</td>
                      </tr>
                      <tr>
                        <td>Week 3</td>
                        <td>0.249</td>
                      </tr>
                      <tr>
                        <td>Week 2</td>
                        <td>0.189</td>
                      </tr>
                      <tr>
                        <td>Week 1</td>
                        <td>0.224</td>
                      </tr>
                    </table>
                  </CardBody>
                </Card>
              </Col>
              <Col md={'12'} lg={'4'}>
                <Card className="mb-4">
                  <CardBody>
                    <CardTitle>Other Coins</CardTitle>
                    <CardText>You received: <b>37 OTHER</b></CardText>
                    <CardText>Get tokens, every week <b>6000</b> Other in the pool, to be shared. Keep or use them in <a href="">Other</a></CardText>
                    <table>
                      <tr>
                        <th>Week</th>
                        <th>Amount</th>
                      </tr>
                      <tr>
                        <td>Week 8</td>
                        <td>6</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Week 7</td>
                        <td>4</td>
                      </tr>
                      <tr>
                        <td>Week 6</td>
                        <td>6</td>
                      </tr>
                      <tr>
                        <td>Week 5</td>
                        <td>3</td>
                      </tr>
                      <tr>
                        <td>Week 4</td>
                        <td>4</td>
                      </tr>
                      <tr>
                        <td>Week 3</td>
                        <td>6</td>
                      </tr>
                      <tr>
                        <td>Week 2</td>
                        <td>3</td>
                      </tr>
                      <tr>
                        <td>Week 1</td>
                        <td>4</td>
                      </tr>
                    </table>
                  </CardBody>
                </Card>
              </Col>
              <Col md={'12'} lg={'4'}>
                <Card className="mb-4">
                  <CardBody>
                    <CardTitle><i className="fa fa-calculator"></i> SOL rewards calculator</CardTitle>
                    <CardText>Calculate the total received miner rewards (SOL) by typing in a Solana wallet address</CardText>
                    <Form>
                      <FormGroup>
                        <label htmlFor="#wallet">Wallet</label>
                        <FormInput id="#wallet" placeholder="Wallet Address" size='16' /><Button><i className="fa fa-search" ></i></Button>
                      </FormGroup>
                    </Form>
                    <table>
                      <tr>
                        <td><p id="stats-title">Total SOL received by </p></td>
                        <td><b><h5 style={{color: '#4bc4d8'}} className="text-xl font-bold" id="sol-gained">0 SOL</h5></b></td>
                      </tr>
                    </table>
                    <br />
                    <br />
                    <br />
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
