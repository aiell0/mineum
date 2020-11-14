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
                        <th>Time</th>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>-</td>
                        <td>-</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>-</td>
                        <td>-</td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>-</td>
                        <td>-</td>
                      </tr>
                      <tr>
                        <td>4</td>
                        <td>-</td>
                        <td>-</td>
                      </tr>
                      <tr>
                        <td>5</td>
                        <td>-</td>
                        <td>-</td>
                      </tr>
                      <tr>
                        <td>6</td>
                        <td>-</td>
                        <td>-</td>
                      </tr>
                      <tr>
                        <td>7</td>
                        <td>-</td>
                        <td>-</td>
                      </tr>
                      <tr>
                        <td>8</td>
                        <td>-</td>
                        <td>-</td>
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
                        <td>-</td>
                        <td>-</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>-</td>
                        <td>-</td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>-</td>
                        <td>-</td>
                      </tr>
                      <tr>
                        <td>4</td>
                        <td>-</td>
                        <td>-</td>
                      </tr>
                      <tr>
                        <td>5</td>
                        <td>-</td>
                        <td>-</td>
                      </tr>
                      <tr>
                        <td>6</td>
                        <td>-</td>
                        <td>-</td>
                      </tr>
                      <tr>
                        <td>7</td>
                        <td>-</td>
                        <td>-</td>
                      </tr>
                      <tr>
                        <td>8</td>
                        <td>-</td>
                        <td>-</td>
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
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>-</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>-</td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>-</td>
                      </tr>
                      <tr>
                        <td>4</td>
                        <td>-</td>
                      </tr>
                      <tr>
                        <td>5</td>
                        <td>-</td>
                      </tr>
                      <tr>
                        <td>6</td>
                        <td>-</td>
                      </tr>
                      <tr>
                        <td>7</td>
                        <td>-</td>
                      </tr>
                      <tr>
                        <td>8</td>
                        <td>-</td>
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
