import React from 'react';
import PropTypes from 'prop-types';
import { Col, ProgressBar, Row } from 'react-bootstrap';
import { getProgressBarVariant, imageLoader } from '../utils';

export default function PlayersPanel({ playerLives }) {
  const container = [];
  Object.entries(playerLives).forEach(([player, lives]) => {
    const variant = getProgressBarVariant(lives);
    const blur = lives > 0 ? '' : 'dead-player';
    const img = imageLoader(`./${player}.jpeg`).default;
    container.push(
      <Col lg="auto" className="avatar-box" key={player}>
        <img
          className={`player-avatar mx-2 ${blur}`}
          src={img}
          alt="Player avatar"
        />
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
};

export function ChoosingPlayersPanel({ chosenPlayers, onClick }) {
  const container = [];
  Object.entries(chosenPlayers).forEach(([player, chosen]) => {
    const blur = chosen ? '' : 'dead-player';
    const img = imageLoader(`./${player}.jpeg`).default;
    container.push(
      <Col lg="auto" className="avatar-box" key={player}>
        <button type="button" className="unstyled" onClick={onClick(player)}>
          <img
            className={`player-avatar mx-2 ${blur}`}
            src={img}
            alt="Player avatar"
          />
        </button>
      </Col>,
    );
  });

  return <Row className="justify-content-md-center">{container}</Row>;
}

ChoosingPlayersPanel.propTypes = {
  chosenPlayers: PropTypes.objectOf(PropTypes.bool).isRequired,
  onClick: PropTypes.func.isRequired,
};
