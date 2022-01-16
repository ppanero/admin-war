import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import PlayersPanel from './Components/PlayersPanel';
import data from '../assets/data/data.json';
import KillerPanel from './Components/KillerPanel';
import { capitalize, sleep } from './utils';
import Winner from './Components/Winner';
import BattleBox from './Components/BattleBox';
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

  const calculatePlayer = () => {
    const playerIdx = Math.floor(Math.random() * playerNames.length);
    return playerNames[playerIdx];
  };

  const getAttack = (playerName) => {
    const phrases = players[playerName];
    const phraseIdx = Math.floor(Math.random() * phrases.length);
    return phrases[phraseIdx];
  };

  const killPlayer = (killed, killer) => {
    if (playerLives[killed] === 1) {
      setPlayerNames(playerNames.filter((name) => name !== killed));
      setKillsCount({
        ...killsCount,
        [killer]: killsCount[killer] + 1,
      });
    }
  };

  const battle = () => {
    setBattleEnd(false);
    setEnemy('');
    setHero('');
    sleep(2000).then(() => {
      const enemyName = calculatePlayer();
      setMessage(`Un ${capitalize(enemyName)} salvaje aparecio!`);
      setEnemy(enemyName);
      sleep(2000).then(() => {
        let heroName;
        do {
          heroName = calculatePlayer();
        } while (heroName === enemyName);
        setMessage(`... ${capitalize(heroName)} te elijo a ti!`);
        setHero(heroName);
        sleep(2000).then(() => {
          setMessage(getAttack(heroName));
          setBattleEnd(true);
          killPlayer(enemyName, heroName);
          setPlayerLives({
            ...playerLives,
            [enemyName]: playerLives[enemyName] - 1,
          });
        });
      });
    });
  };

  useEffect(() => {
    if (playerNames.length === 1 && warStarted) {
      sleep(5000).then(() => {
        setWinner(playerNames[0]);
      });
    }
  }, [playerNames]);

  useEffect(() => {
    if (playerNames.length > 1 && warStarted) {
      sleep(3000).then(() => battle());
    }
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
            <BattleBox
              enemy={enemy}
              enemyHit={battleEnd}
              hero={hero}
              playerLives={playerLives}
              message={message}
              imageLoader={imageLoader}
            />
          ) : (
            <Winner
              img={imageLoader(`./${winner}.jpeg`).default}
              imgCrown={imageLoader(`./crown.png`).default}
            />
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
