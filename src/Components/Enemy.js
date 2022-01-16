import React from 'react';
import PropTypes from 'prop-types';
import { ProgressBar } from 'react-bootstrap';
import { getProgressBarVariant, imageLoader } from '../utils';

export default function Enemy({ name, lives, shake }) {
  const variant = getProgressBarVariant(lives);

  let anim = 'animate__fadeOut slow';
  if (shake) {
    anim = 'animate__shakeX';
  } else if (lives > 0) {
    anim = 'animate__zoomIn';
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
  shake: PropTypes.bool,
};

Enemy.defaultProps = {
  shake: false,
};