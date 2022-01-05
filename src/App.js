import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Enemy from './Components/Enemy';
import Panel from './Components/Panel';
import Player from './Components/Player';
import TextBox from './Components/TextBox';
import data from '../assets/data/data.json';
// eslint-disable-next-line no-var
const imageLoader = require.context('../assets/img/', false);

export default function App() {
  const { players } = data;

  return (
    <Container className="h-100">
      <Row className="panel">
        <Panel imageLoader={imageLoader} players={Object.keys(players)} />
      </Row>
      <Row className="justify-content-center">
        <Col sm={12}>
          <div id="battle-container" className="px-2 mx-auto">
            <Enemy
              name="Mario"
              img={imageLoader('./mario.jpeg').default}
              lives={2}
              hide={false}
              faint={false}
            />
            <Player
              name="Luis"
              img={imageLoader('./luis.jpeg').default}
              lives={1}
              hide={false}
              faint={false}
            />
            <div id="text-box">
              <div id="text-box-content">
                <TextBox messageOne="A wild Mario appeared!" />
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
