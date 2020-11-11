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
  FormGroup,
} from 'shards-react';

/**
 * Shows settings for Mineum.
 * @return {React} Settings section.
 */
export default function Settings() {
  return (
    <div className="subscribe section bg-dark py-4">
      <h3 className="section-title text-center text-white m-5">
        <i className="fas fa-cogs" style={{color: '#8c8c8c8c'}} ></i>
        Settings</h3>
      <Form>
        <FormGroup></FormGroup>
      </Form>
      <Container>
        <div className="py-4">
          <Row>
            <CardDeck>
              <Col md={'12'} lg={'4'}>
                <Card className="mb-4">
                  <CardBody>
                    <CardTitle>Auto mine</CardTitle>
                    <CardText><i className="fas fa-arrow-circle-up"></i>
                     Automatically start mining time when the page is loaded.
                    </CardText>
                    <div className="custom-control custom-toggle d-block my-1">
                      <input type="checkbox" id="customToggle1" name="customToggle1" className="custom-control-input"></input>
                      <label className="custom-control-label" htmlFor="customToggle1">Automine</label>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col md={'12'} lg={'4'}>
                <Card className="mb-4">
                  <CardBody>
                    <CardTitle>Messages</CardTitle>
                    <CardText><i className="fas fa-arrow-circle-up"></i>
                     Receive status and maintenance messages.</CardText>
                    <div className="custom-control custom-toggle d-block my-2">
                      <input type="checkbox" id="customToggle2" name="customToggle2" className="custom-control-input"></input>
                      <label className="custom-control-label" htmlFor="customToggle2">Status messages</label>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col md={'12'} lg={'4'}>
                <Card className="mb-4">
                  <CardBody>
                    <CardTitle>Setting</CardTitle>
                    <CardText><i className="fas fa-gavel"></i>
                     Some text about the setting. to explain its function.
                    </CardText>
                    <a className="btn btn-outline-success btn-normal" href="" target="_blank">ON →</a>
                    <button type="button" className="btn btn-outline-warning">OFF</button>
                  </CardBody>
                </Card>
              </Col>
            </CardDeck>
          </Row>
        </div>
      </Container>
      <div className="row justify-content-md-center px-4">
        <div className="contact-form col-sm-12 col-md-10 col-lg-7 p-4 mb-4 card">
          <Form>
            <Row>
              <Col md={'6'} sm={'12'}>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <CardTitle>Your Solana wallet address:</CardTitle>
                  <label htmlFor="exampleInputEmail1">Wallet</label>
                  <textarea id="exampleInputEmail1" className="form-control mb-4" rows="1" placeholder="Receive address" name="message"></textarea>
                </FormGroup>
              </Col>
            </Row>
            <input className="btn btn-outline-success btn-normal d-flex ml-auto mr-auto" type="submit" value="Save"></input>
          </Form>
        </div>
      </div>
    </div>
  );
}
