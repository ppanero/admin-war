import React from 'react';
import PropTypes from 'prop-types';
import { ProgressBar } from 'react-bootstrap';
import { getProgressBarVariant, imageLoader } from '../utils';

export default function Hero({ name, lives }) {
  const variant = getProgressBarVariant(lives);

  return (
    <div>
      <div className="player-container hero-container">
        <div className="avatar-box ml-sm-5">
          <div className="animate__animated animate__fadeInUp">
            <img
              className="avatar"
              src={imageLoader(`./${name}.jpeg`).default}
              alt="Hero avatar"
            />
          </div>
          <div className="oval" />
        </div>
        <div className="player-info-box">
          <div className="d-flex justify-content-between align-items-center">
            <h2>{name.toUpperCase()}</h2>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <h5>HP</h5>
            <ProgressBar now={lives * 50} variant={variant} />
          </div>
        </div>
      </div>
    </div>
  );
}

Hero.propTypes = {
  name: PropTypes.string.isRequired,
  lives: PropTypes.number.isRequired,
};
