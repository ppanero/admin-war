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
  // state variables
  const [warStarted, setWarStarted] = useState(false);
  const [playerNames, setPlayerNames] = useState(Object.keys(players));
  const tmpPlayerLives = {};
  playerNames.forEach((name) => {
    tmpPlayerLives[name] = 2;
  });
  const [playerLives, setPlayerLives] = useState(tmpPlayerLives);
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
      const enemyName = playerNames[enemyIdx];
      setEnemy(enemyName);
      if (playerLives[enemyName] === 1) {
        setPlayerNames(playerNames.filter((name) => name !== enemyName));
      }
      setPlayerLives({
        ...playerLives,
        [enemyName]: playerLives[enemyName] - 1,
      });
      setWarStarted(false);
    }
  };

  useEffect(() => {
    battle();
  }, [warStarted, playerLives]);

  return (
    <Container className="h-100">
      <Row className="panel">
        <Panel imageLoader={imageLoader} playerLives={playerLives} />
      </Row>
      <Row className="justify-content-center battle-container">
        <Col sm={12}>
          <div className="px-2 mx-auto battle-box">
            {enemy && (
              <Enemy
                name={enemy.toUpperCase()}
                img={imageLoader(`./${enemy}.jpeg`).default}
                lives={playerLives[enemy]}
                hide={false}
                faint={false}
              />
            )}
            {player && (
              <Player
                name={player.toUpperCase()}
                img={imageLoader(`./${player}.jpeg`).default}
                lives={playerLives[player]}
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
