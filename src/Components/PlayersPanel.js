import React from 'react';
import PropTypes from 'prop-types';
import { Col, Image, ProgressBar, Row } from 'react-bootstrap';
import { getProgressBarVariant, playerImageLoader } from '../utils';

export default function PlayersPanel({ playersHp, playersDiscovery }) {
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
  playersDiscovery: PropTypes.objectOf(PropTypes.bool).isRequired,
};
