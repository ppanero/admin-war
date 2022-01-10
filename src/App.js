import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Enemy from './Components/Enemy';
import Hero from './Components/Hero';
import PlayersPanel from './Components/PlayersPanel';
import TextBox from './Components/TextBox';
import data from '../assets/data/data.json';
import KillerPanel from './Components/KillerPanel';
// eslint-disable-next-line no-var
const imageLoader = require.context('../assets/img/', false);

export default function App() {
  const [players] = useState(data.players);
  const [message, setMessage] = useState('');
  const [warStarted, setWarStarted] = useState(false);
  const [battleEnd, setBattleEnd] = useState(false);
  const [playerNames, setPlayerNames] = useState(Object.keys(players));
  const tmpPlayerLives = {};
  const tmpKillsCount = {};
  playerNames.forEach((name) => {
    tmpPlayerLives[name] = 2;
    tmpKillsCount[name] = 0;
  });
  const [playerLives, setPlayerLives] = useState(tmpPlayerLives);
  const [killsCount, setKillsCount] = useState(tmpKillsCount);
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
            if (playerLives[enemyName] === 1) {
              // will be a kill after the update
              setKillsCount({
                ...killsCount,
                [heroName]: killsCount[heroName] + 1,
              });
            }
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
      setTimeout(() => {
        setWinner(playerNames[0]);
      }, 5000);
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
        <PlayersPanel imageLoader={imageLoader} playerLives={playerLives} />
      </Row>
      <Row className="battle-container">
        <Col sm={2} className="panel">
          <KillerPanel killsCount={killsCount} />
        </Col>
        <Col sm={8} className="justify-content-center">
          {winner === '' ? (
            <div className="px-2 mx-auto panel battle-box">
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
      {!warStarted && (
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
      )}
    </Container>
  );
}
