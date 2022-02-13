import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Image, ProgressBar, Row } from 'react-bootstrap';
import { getProgressBarVariant, playerImageLoader } from '../utils';
import PlayersContext from '../context/players';

export default function PlayersPanel({ playersHp, players }) {
  const tmpPlayersDiscovery = {};
  players.forEach((name) => {
    tmpPlayersDiscovery[name] = false;
  });
  const [playersDiscovery, setPlayersDiscovery] = useState(tmpPlayersDiscovery);
  const battle = useContext(PlayersContext);

  useEffect(() => {
    console.log('test');
    setPlayersDiscovery({
      ...playersDiscovery,
      [battle.heroName]: true,
      [battle.enemyName]: true,
    });
  });

  const container = [];
  Object.entries(playersHp).forEach(([player, hp]) => {
    const variant = getProgressBarVariant(hp);
    const deadPlayer = hp > 0 ? '' : 'dead-player';
    const imgName = playersDiscovery[player]
      ? `./${player}.jpeg`
      : `./${player}-silhouette.jpeg`;
    const img = playerImageLoader(imgName).default;

    container.push(
      <Col lg="auto" className="avatar-box" key={player}>
        <Image
          className={`player-avatar mx-2 ${deadPlayer}`}
          src={img}
          alt="Player avatar"
        />
        <div className="px-2">
          <ProgressBar now={hp} variant={variant} />
        </div>
      </Col>,
    );
  });

  return <Row className="justify-content-md-center">{container}</Row>;
}

PlayersPanel.propTypes = {
  playersHp: PropTypes.objectOf(PropTypes.number).isRequired,
  players: PropTypes.arrayOf(PropTypes.string).isRequired,
};
