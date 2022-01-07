import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Enemy from './Components/Enemy';
import Hero from './Components/Hero';
import Panel from './Components/Panel';
import TextBox from './Components/TextBox';
import data from '../assets/data/data.json';
// eslint-disable-next-line no-var
const imageLoader = require.context('../assets/img/', false);

export default function App() {
  const [players] = useState(data.players);
  const [message, setMessage] = useState('');
  const [warStarted, setWarStarted] = useState(false);
  const [battleEnd, setBattleEnd] = useState(false);
  const [playerNames, setPlayerNames] = useState(Object.keys(players));
  const tmpPlayerLives = {};
  playerNames.forEach((name) => {
    tmpPlayerLives[name] = 2;
  });
  const [playerLives, setPlayerLives] = useState(tmpPlayerLives);
  const [hero, setHero] = useState('');
  const [enemy, setEnemy] = useState('');
  const [winner, setWinner] = useState('');

  const battle = () => {
    if (warStarted) {
      const enemyIdx = Math.floor(Math.random() * playerNames.length);
      const enemyName = playerNames[enemyIdx];
      setTimeout(() => {
        setMessage(`Un ${enemyName} salvaje aparecio!`);
        setEnemy(enemyName);
        let heroIdx;
        do {
          heroIdx = Math.floor(Math.random() * playerNames.length);
        } while (heroIdx === enemyIdx);
        const heroName = playerNames[heroIdx];

        setTimeout(() => {
          setMessage(`... ${heroName} te elijo a ti!`);
          setHero(heroName);
          if (playerLives[enemyName] === 1) {
            setPlayerNames(playerNames.filter((name) => name !== enemyName));
          }

          setTimeout(() => {
            const phrases = players[heroName];
            const phraseIdx = Math.floor(Math.random() * phrases.length);
            setMessage(phrases[phraseIdx]);
            setBattleEnd(true);
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
      setBattleEnd(false);
      setEnemy('');
      setHero('');
      battle();
    }, 3000);
  }, [warStarted, playerLives]);

  return (
    <Container className="h-100">
      <Row className="panel">
        <Panel imageLoader={imageLoader} playerLives={playerLives} />
      </Row>
      <Row className="justify-content-center battle-container">
        <Col sm={12}>
          {winner === '' ? (
            <div className="px-2 mx-auto battle-box">
              {enemy && (
                <Enemy
                  name={enemy.toUpperCase()}
                  img={imageLoader(`./${enemy}.jpeg`).default}
                  lives={playerLives[enemy]}
                  shake={battleEnd}
                />
              )}
              {hero && (
                <Hero
                  name={hero.toUpperCase()}
                  img={imageLoader(`./${hero}.jpeg`).default}
                  lives={playerLives[hero]}
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
          ) : (
            <div className="text-center winner-container">
              <div className="animate__animated animate__backInDown">
                <img
                  className="crown"
                  src={imageLoader(`./crown.png`).default}
                  alt="Winner avatar"
                />
              </div>
              <div className="animate__animated animate__jackInTheBox">
                <img
                  className="winner-img"
                  src={imageLoader(`./${winner}.jpeg`).default}
                  alt="Winner avatar"
                />
              </div>
            </div>
          )}
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
