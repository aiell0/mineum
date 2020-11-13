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
  CardImg,
} from 'shards-react';
import discordLogo from '../../images/card-3.jpg';
import twitterLogo from '../../images/card-2.jpg';

/**
 * Shows social media information for Mineum.
 * @return {React} Social media section.
 */
export default function SocialMedia() {
  return (
    <div className="blog section section-invert py-4">
      <h3 className="section-title text-center m-5"><i className="fas fa-share-square" style={{color: '#DDDDDD'}} > </i> Social Media</h3>
      <Container>
        <div className="py-4">
          <Row>
            <CardDeck>
              <Col md={'12'} lg={'4'}>
                <Card className="mb-4">
                  <CardBody>
                    <CardImg width="100%" height="100%" src={discordLogo}></CardImg>
                    <CardTitle>Chat on Discord</CardTitle>
                    <CardText>Join the Mineum Discord chat, and get in contact with other users.</CardText>
                    <a className="btn btn-outline-success btn-normal" href="https://discord.gg/yQKxdsXVNb" target="_blank" rel="noreferrer">Discord</a>
                  </CardBody>
                </Card>
              </Col>
              <Col md={'12'} lg={'4'}>
                <Card className="mb-4">
                  <CardBody>
                    <CardImg width="100%" height="100%" src={twitterLogo}></CardImg>
                    <CardTitle>Follow on Twitter</CardTitle>
                    <CardText>Read our latest tweets, and follow the Mineum project on Twitter.</CardText>
                    <a className="btn btn-outline-success btn-normal" target="_blank" rel="noreferrer">Twitter</a>
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
