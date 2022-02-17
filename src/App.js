import React, { useCallback, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import PlayersPanel from './Components/PlayersPanel';
import data from '../assets/data/data.json';
import KillerPanel from './Components/KillerPanel';
import { capitalize, sleep, MAX_DAMAGE, MIN_DAMAGE, MAX_LIFE } from './utils';
import playerStatus from './playerStatus';
import Winner from './Components/Winner';
import BattleBox from './Components/BattleBox';
import WarModal from './Components/WarModal';

export default function App() {
  const [players] = useState(data.players);
  const [message, setMessage] = useState('');
  const [attacks, setAttacks] = useState([]);
  const [warStarted, setWarStarted] = useState(false);
  const [battleInterval, setBattleInterval] = useState(5);
  const [enemyStatus, setEnemyStatus] = useState(playerStatus('APPEAR'));
  const [heroStatus, setHeroStatus] = useState(playerStatus('APPEAR'));
  const [playerNames, setPlayerNames] = useState(Object.keys(players));
  const tmpPlayerHp = {};
  const tmpKillsCount = {};
  const tmpPlayersDiscovery = {};
  playerNames.forEach((name) => {
    tmpPlayerHp[name] = MAX_LIFE;
    tmpKillsCount[name] = 0;
    tmpPlayersDiscovery[name] = false;
  });
  const [playersHp, setPlayerHp] = useState(tmpPlayerHp);
  const [killsCount, setKillsCount] = useState(tmpKillsCount);
  const [playersDiscovery, setPlayersDiscovery] = useState(tmpPlayersDiscovery);
  const [hero, setHero] = useState('');
  const [enemy, setEnemy] = useState('');
  const [winner, setWinner] = useState('');

  const calculatePlayer = () => {
    const playerIdx = Math.floor(Math.random() * playerNames.length);
    return playerNames[playerIdx];
  };

  const getAttacks = (playerName) => players[playerName];

  const getAttack = (playerName) => {
    const playerAttacks = getAttacks(playerName);
    const idx = Math.floor(Math.random() * playerAttacks.length);
    return playerAttacks[idx];
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

  const calculateDamage = () =>
    Math.floor(Math.random() * (MAX_DAMAGE - MIN_DAMAGE)) + MIN_DAMAGE;

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
        setPlayersDiscovery({
          ...playersDiscovery,
          [heroName]: true,
          [enemyName]: true,
        });
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

          setAttacks(getAttacks(attacker));

          sleep(3000).then(() => {
            setAttacks([]);
            setMessage(`¡${capitalize(attacker)} usó ${getAttack(attacker)}!`);
            if (luck) {
              setEnemyStatus(playerStatus('HIT'));
            } else {
              setHeroStatus(playerStatus('HIT'));
            }
            const damage = calculateDamage();
            sleep(2000).then(() => {
              if (damage < 10) {
                setMessage(
                  `¡Es muy poco efectivo! Causó ${damage} puntos de daño.`,
                );
              } else if (damage > 25) {
                setMessage(
                  `¡Es un golpe crítico! Causó ${damage} puntos de daño.`,
                );
              } else {
                setMessage(`Causó ${damage} puntos de daño.`);
              }

              sleep(2000).then(() => {
                const updateLife =
                  playersHp[attacked] > damage
                    ? playersHp[attacked] - damage
                    : 0;
                if (updateLife === 0) {
                  setMessage(`¡${capitalize(attacked)} ha caído!`);
                  killPlayer(attacked, attacker, luck);
                }
                setPlayerHp({
                  ...playersHp,
                  [attacked]: updateLife,
                });
              });
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
        <PlayersPanel
          playersHp={playersHp}
          playersDiscovery={playersDiscovery}
        />
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
            attacks={attacks}
          />
          <Winner show={winner !== ''} winner={winner} />
        </Col>
      </Row>
    </Container>
  );
}
