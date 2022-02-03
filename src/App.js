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
  const [heroStatus, setHeroStatus] = useState(playerStatus('APPEAR'));
  const [playerNames, setPlayerNames] = useState(Object.keys(players));
  const tmpPlayerHp = {};
  const tmpKillsCount = {};
  playerNames.forEach((name) => {
    tmpPlayerHp[name] = 100;
    tmpKillsCount[name] = 0;
  });
  const [playersHp, setPlayerHp] = useState(tmpPlayerHp);
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

  const killPlayer = (killed, killer, luck) => {
    setPlayerNames(playerNames.filter((name) => name !== killed));
    setKillsCount({
      ...killsCount,
      [killer]: killsCount[killer] + 1,
    });
    if (luck) {
      setEnemyStatus(playerStatus('DEAD'));
    } else {
      setHeroStatus(playerStatus('DEAD'));
    }
  };

  const battle = () => {
    setEnemy('');
    setEnemyStatus(playerStatus('APPEAR'));
    setHero('');
    setHeroStatus(playerStatus('APPEAR'));
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
          const luck = Math.random() < 0.5;
          let attacker;
          let attacked;
          if (luck) {
            attacker = heroName;
            attacked = enemyName;
          } else {
            attacker = enemyName;
            attacked = heroName;
          }

          setMessage(getAttack(attacker));
          sleep(2000).then(() => {
            if (luck) {
              setEnemyStatus(playerStatus('HIT'));
            } else {
              setHeroStatus(playerStatus('HIT'));
            }
            const updateLife =
              playersHp[attacked] > 15 ? playersHp[attacked] - 15 : 0;
            setPlayerHp({
              ...playersHp,
              [attacked]: updateLife,
            });
            if (updateLife === 0) {
              killPlayer(attacked, attacker, luck);
            }
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
  }, [warStarted, playersHp]);

  return (
    <Container className="h-100">
      <WarModal
        show={!warStarted}
        onClick={useCallback(
          (interval) => () => {
            setWarStarted(true);
            setBattleInterval(interval.current.value * 60 * 1000);
          },
          [],
        )}
      />
      <Row className="panel">
        <PlayersPanel playersHp={playersHp} />
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
            heroStatus={heroStatus}
            playersHp={playersHp}
            message={message}
          />
          <Winner show={winner !== ''} winner={winner} />
        </Col>
      </Row>
    </Container>
  );
}
