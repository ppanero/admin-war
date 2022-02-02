import React from 'react';
import PropTypes from 'prop-types';
import { Col, ProgressBar, Row } from 'react-bootstrap';
import { getProgressBarVariant, imageLoader } from '../utils';

export default function PlayersPanel({ playersHp }) {
  const container = [];
  Object.entries(playersHp).forEach(([player, hp]) => {
    const variant = getProgressBarVariant(hp);
    const imgStyle =
      hp > 0 ? 'player-avatar mx-2' : 'player-avatar mx-2 dead-player';
    const img = imageLoader(`./${player}.jpeg`).default;
    container.push(
      <Col lg="auto" className="avatar-box" key={player}>
        <img className={imgStyle} src={img} alt="Player avatar" />
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
};
