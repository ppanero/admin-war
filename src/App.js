import React, { useCallback, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import PlayersPanel from './Components/PlayersPanel';
import data from '../assets/data/data.json';
import KillerPanel from './Components/KillerPanel';
import { capitalize, sleep } from './utils';
import playerStatus from './playerStatus';
import Winner from './Components/Winner';
import BattleBox from './Components/BattleBox';
import WarModal from './Components/WarModal';

export default function App() {
  const [players] = useState(data.players);
  const [message, setMessage] = useState('');
  const [warStarted, setWarStarted] = useState(false);
  const [battleInterval, setBattleInterval] = useState(5);
  const [enemyStatus, setEnemyStatus] = useState(playerStatus('APPEAR'));
  const [playerNames, setPlayerNames] = useState(Object.keys(players));
  const tmpChosenPlayers = {};
  playerNames.forEach((name) => {
    tmpChosenPlayers[name] = true;
  });
  const [chosenPlayers, setChosenPlayers] = useState(tmpChosenPlayers);
  const [playerLives, setPlayerLives] = useState({});
  const [killsCount, setKillsCount] = useState({});
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
    // due to the synchronous logic it would never be in the list if lives were 0
    if (playerLives[killed] === 1) {
      setPlayerNames(playerNames.filter((name) => name !== killed));
      setKillsCount({
        ...killsCount,
        [killer]: killsCount[killer] + 1,
      });
      setEnemyStatus(playerStatus('DEAD'));
    }
  };

  const battle = () => {
    setEnemy('');
    setEnemyStatus(playerStatus('APPEAR'));
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
          setEnemyStatus(playerStatus('HIT'));
          sleep(2000).then(() => {
            killPlayer(enemyName, heroName);
            setPlayerLives({
              ...playerLives,
              [enemyName]: playerLives[enemyName] - 1,
            });
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
      sleep(battleInterval).then(() => battle());
    }
  }, [playerLives]);

  useEffect(() => {
    if (warStarted) {
      const tmpPlayerLives = {};
      const tmpKillsCount = {};
      playerNames.forEach((name) => {
        tmpPlayerLives[name] = 2;
        tmpKillsCount[name] = 0;
      });
      setKillsCount(tmpKillsCount);
      setPlayerLives(tmpPlayerLives); // this will trigger the battle
    }
  }, [warStarted]);

  return (
    <Container className="h-100">
      <WarModal
        show={!warStarted}
        onWarClick={useCallback(
          (interval) => () => {
            setWarStarted(true);
            setBattleInterval(interval.current.value * 60 * 1000);
          },
          [],
        )}
        onPlayerClick={useCallback(
          (player) => () => {
            setChosenPlayers({
              ...chosenPlayers,
              [player]: !chosenPlayers[player],
            });
          },
          [],
        )}
        players={chosenPlayers}
      />
      <Row className="panel">
        <PlayersPanel playerLives={playerLives} />
      </Row>
      <Row className="battle-container">
        <Col sm={2} className="panel">
          <KillerPanel killsCount={killsCount} />
        </Col>
        <Col sm={8} className="justify-content-center">
          <BattleBox
            enemy={enemy}
            enemyStatus={enemyStatus}
            hero={hero}
            playerLives={playerLives}
            message={message}
          />
          <Winner show={winner !== ''} winner={winner} />
        </Col>
      </Row>
    </Container>
  );
}
