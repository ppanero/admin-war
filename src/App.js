import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Enemy from './Components/Enemy';
import Panel from './Components/Panel';
import Player from './Components/Player';
import TextBox from './Components/TextBox';
import data from '../assets/data/data.json';
// eslint-disable-next-line no-var
const imageLoader = require.context('../assets/img/', false);

export default function App() {
  const { players } = data;
  const playerNames = Object.keys(players);
  const [warStarted, setWarStarted] = useState(false);
  const [player, setPlayer] = useState('');
  const [enemy, setEnemy] = useState('');

  const battle = () => {
    if (warStarted) {
      const playerIdx = Math.floor(Math.random() * playerNames.length);
      let enemyIdx;
      do {
        enemyIdx = Math.floor(Math.random() * playerNames.length);
      } while (enemyIdx === playerIdx);

      setPlayer(playerNames[playerIdx]);
      setEnemy(playerNames[enemyIdx]);
    }
  };

  useEffect(() => {
    battle();
  }, [warStarted]);

  return (
    <Container className="h-100">
      <Row className="panel">
        <Panel imageLoader={imageLoader} players={Object.keys(players)} />
      </Row>
      <Row className="justify-content-center battle-container">
        <Col sm={12}>
          <div className="px-2 mx-auto battle-box">
            {enemy && (
              <Enemy
                name={enemy.toUpperCase()}
                img={imageLoader(`./${enemy}.jpeg`).default}
                lives={2}
                hide={false}
                faint={false}
              />
            )}
            {player && (
              <Player
                name={player.toUpperCase()}
                img={imageLoader(`./${player}.jpeg`).default}
                lives={1}
                hide={false}
                faint={false}
              />
            )}
            <div className="text-container">
              <div className="text-box">
                <div className="text-box-content">
                  {enemy && (
                    <TextBox messageOne={`A wild ${enemy} appeared!`} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <div className="text-center">
          <Button
            className="war-button"
            variant="primary"
            size="lg"
            onClick={() => setWarStarted(true)}
          >
            War!
          </Button>
        </div>
      </Row>
    </Container>
  );
}
