import React from 'react';
import PropTypes from 'prop-types';
import { ProgressBar } from 'react-bootstrap';
import { getProgressBarVariant, imageLoader } from '../utils';
import playerStatus from '../playerStatus';

export default function Enemy({ name, lives, status }) {
  const variant = getProgressBarVariant(lives);

  let anim = '';
  if (status === playerStatus('APPEAR')) {
    anim = 'animate__zoomIn';
  } else if (status === playerStatus('HIT')) {
    anim = 'animate__shakeX';
  } else if (status === playerStatus('DEAD')) {
    anim = 'animate__fadeOut slow';
  }

  return (
    <div>
      <div className="player-container enemy-container">
        <div className="player-info-box">
          <div className="d-flex justify-content-between align-items-center">
            <h2>{name.toUpperCase()}</h2>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <h5>HP</h5>
            <ProgressBar now={lives * 50} variant={variant} />
          </div>
        </div>
        <div className="mr-sm-4 avatar-box">
          <div className={`animate__animated ${anim}`}>
            <img
              className="avatar mt-4"
              src={imageLoader(`./${name}.jpeg`).default}
              alt="Enemy avatar"
            />
          </div>
          <div className="oval" />
        </div>
      </div>
    </div>
  );
}

Enemy.propTypes = {
  name: PropTypes.string.isRequired,
  lives: PropTypes.number.isRequired,
  status: PropTypes.string,
};

Enemy.defaultProps = {
  status: playerStatus('APPEAR'),
};
