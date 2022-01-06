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
  const [players] = useState(data.players);
  const [message, setMessage] = useState('');
  const [warStarted, setWarStarted] = useState(false);
  const [playerNames, setPlayerNames] = useState(Object.keys(players));
  const tmpPlayerLives = {};
  playerNames.forEach((name) => {
    tmpPlayerLives[name] = 2;
  });
  const [playerLives, setPlayerLives] = useState(tmpPlayerLives);
  const [player, setPlayer] = useState('');
  const [enemy, setEnemy] = useState('');
  const [winner, setWinner] = useState('');

  const battle = () => {
    if (warStarted) {
      const enemyIdx = Math.floor(Math.random() * playerNames.length);
      const enemyName = playerNames[enemyIdx];
      setTimeout(() => {
        setMessage(`A wild ${enemyName} appeared!`);
        setEnemy(enemyName);
        let playerIdx;
        do {
          playerIdx = Math.floor(Math.random() * playerNames.length);
        } while (playerIdx === enemyIdx);
        const playerName = playerNames[playerIdx];

        setTimeout(() => {
          setMessage(`... ${playerName} will fight him!`);
          setPlayer(playerName);
          if (playerLives[enemyName] === 1) {
            setPlayerNames(playerNames.filter((name) => name !== enemyName));
          }

          setTimeout(() => {
            const phrases = players[playerName];
            const phraseIdx = Math.floor(Math.random() * phrases.length);
            setMessage(phrases[phraseIdx]);
            setPlayerLives({
              ...playerLives,
              [enemyName]: playerLives[enemyName] - 1,
            });
          }, 2000);
        }, 2000);
      }, 2000);
    }
  };

  useEffect(() => {
    if (playerNames.length === 1) {
      setWinner(playerNames[0]);
    }
  }, [playerNames]);

  useEffect(() => {
    setTimeout(() => {
      setEnemy('');
      setPlayer('');
      battle();
    }, 3000);
  }, [warStarted, playerLives]);

  return (
    <Container className="h-100">
      {winner === '' ? (
        <>
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
                      {enemy && <TextBox message={message} />}
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
        </>
      ) : (
        <Row className="battle-container">
          <Col sm={12}>
            <div className="px-2 mx-auto battle-box">
              <div className="mr-sm-4 avatar-box text-center">
                <div className="animated fadeInUp">
                  <img
                    className="avatar mr-3 mt-4"
                    src={imageLoader(`./${winner}.jpeg`).default}
                    alt="Player avatar"
                  />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
}
