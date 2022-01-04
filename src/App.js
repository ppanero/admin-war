import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Enemy from './Components/Enemy';
import Panel from './Components/Panel';
import Player from './Components/Player';
import TextBox from './Components/TextBox';

export default function App() {
  return (
    <Container className="h-100">
      <Row className="panel">
        <Panel
          players={[
            'adri',
            'angu',
            'duff',
            'facun',
            'hector',
            'iñigo',
            'joselu',
            'joel',
            'luis',
            'panero',
            'rene',
            'robin',
            'sohar',
            'xexu',
            'toni',
          ]}
        />
      </Row>
      <Row className="justify-content-center">
        <Col sm={12}>
          <div id="battle-container" className="px-2 mx-auto">
            <Enemy
              name="Mario"
              img="../assets/img/mario.jpeg"
              lives={2}
              hide={false}
              faint={false}
            />
            <Player
              name="Luis"
              img="../assets/img/luis.jpeg"
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
