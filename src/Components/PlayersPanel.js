import React from 'react';
import PropTypes from 'prop-types';
import { Col, ProgressBar, Row } from 'react-bootstrap';

export default function PlayersPanel({ playerLives, imageLoader }) {
  const container = [];
  Object.entries(playerLives).forEach(([player, lives]) => {
    const variant = lives < 2 ? 'danger' : 'success';
    const imgStyle = lives > 0 ? 'avatar mx-2' : 'avatar mx-2 dead-player';
    const img = imageLoader(`./${player}.jpeg`).default;
    container.push(
      <Col lg="auto" className="avatar-box" key={player}>
        <img className={imgStyle} src={img} alt="Player avatar" />
        <div className="px-2">
          <ProgressBar now={lives * 50} variant={variant} />
        </div>
      </Col>,
    );
  });

  return <Row className="justify-content-md-center">{container}</Row>;
}

PlayersPanel.propTypes = {
  playerLives: PropTypes.objectOf(PropTypes.number).isRequired,
  imageLoader: PropTypes.func.isRequired,
};
