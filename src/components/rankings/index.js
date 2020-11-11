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
} from 'shards-react';

/**
 * Shows overall user rankings for Mineum.
 * @return {React} Rankings section.
 */
export default function Rankings() {
  return (
    <div className="blog section section-invert py-4">
      <h3 className="section-title text-center m-5"><i className="fas fa-trophy" style={{color: '#DDDDDD'}} > </i> Rankings</h3>
      <Container>
        <div className="py-4">
          <Row>
            <CardDeck>
              <Col md={'12'} lg={'4'}>
                <Card className="mb-4">
                  <CardBody>
                    <CardTitle>Current Ranking</CardTitle>
                    <CardText>
                      Mine the most time and get the highest reward.
                    </CardText>
                    <table>
                      <tr>
                        <th>Rank</th>
                        <th>Username</th>
                        <th>Upvoted</th>
                        <th>Time </th>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>Username123</td>
                        <td>Yes</td>
                        <td>18:00</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>username456</td>
                        <td>Yes</td>
                        <td>18:00</td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>username689</td>
                        <td>Yes</td>
                        <td>18:00</td>
                      </tr>
                      <tr>
                        <td>4</td>
                        <td>username289</td>
                        <td>Yes</td>
                        <td>18:00</td>
                      </tr>
                      <tr>
                        <td>5</td>
                        <td>username719</td>
                        <td>Yes</td>
                        <td>18:00</td>
                      </tr>
                      <tr>
                        <td>6</td>
                        <td>username349</td>
                        <td>Yes</td>
                        <td>18:00</td>
                      </tr>
                      <tr>
                        <td>7</td>
                        <td>username749</td>
                        <td>Yes</td>
                        <td>18:00</td>
                      </tr>
                      <tr>
                        <td>8</td>
                        <td>username473</td>
                        <td>Yes</td>
                        <td>18:00</td>
                      </tr>
                    </table>
                  </CardBody>
                </Card>
              </Col>
              <Col md={'12'} lg={'4'}>
                <Card className="mb-4">
                  <CardBody>
                    <CardTitle>Last week ranking</CardTitle>
                    <CardText>
                      The rankings from the previous week, well done:
                    </CardText>
                    <table>
                      <tr>
                        <th>Rank</th>
                        <th>Username</th>
                        <th>Rewards</th>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>Username456</td>
                        <td>294.129</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Username456</td>
                        <td>34.121</td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>Username456</td>
                        <td>25.247</td>
                      </tr>
                      <tr>
                        <td>4</td>
                        <td>Username456</td>
                        <td>20.254</td>
                      </tr>
                      <tr>
                        <td>5</td>
                        <td>Username456</td>
                        <td>16.124</td>
                      </tr>
                      <tr>
                        <td>6</td>
                        <td>Username456</td>
                        <td>14.981</td>
                      </tr>
                      <tr>
                        <td>7</td>
                        <td>Username456</td>
                        <td>11.470</td>
                      </tr>
                      <tr>
                        <td>8</td>
                        <td>Username456</td>
                        <td>10.210</td>
                      </tr>
                    </table>
                  </CardBody>
                </Card>
              </Col>
              <Col md={'12'} lg={'4'}>
                <Card className="mb-4">
                  <CardBody>
                    <CardTitle>New Users</CardTitle>
                    <CardText>
                      The latest and most new users that have joined Mineum.
                    </CardText>
                    <table>
                      <tr>
                        <th>Rank</th>
                        <th>Username </th>
                        <th>Posts</th>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>Username456</td>
                        <td>862</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Username456</td>
                        <td>34</td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>Username456</td>
                        <td>25</td>
                      </tr>
                      <tr>
                        <td>4</td>
                        <td>Username456</td>
                        <td>24</td>
                      </tr>
                      <tr>
                        <td>5</td>
                        <td>Username456</td>
                        <td>16</td>
                      </tr>
                      <tr>
                        <td>6</td>
                        <td>Username456</td>
                        <td>14</td>
                      </tr>
                      <tr>
                        <td>7</td>
                        <td>Username456</td>
                        <td>11</td>
                      </tr>
                      <tr>
                        <td>8</td>
                        <td>Username456</td>
                        <td>10</td>
                      </tr>
                    </table>
                  </CardBody>
                </Card>
              </Col>
            </CardDeck>
          </Row>
        </div>
      </Container>
    </div>
  );
}
