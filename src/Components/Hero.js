import React from 'react';
import PropTypes from 'prop-types';
import { ProgressBar } from 'react-bootstrap';
import { getProgressBarVariant } from '../utils';

export default function Hero({ name, img, lives }) {
  const variant = getProgressBarVariant(lives);

  return (
    <div>
      <div className="player-container hero-container">
        <div className="avatar-box ml-sm-5">
          <div className="animate__animated animate__fadeInUp">
            <img className="avatar" src={img} alt="Hero avatar" />
          </div>
          <div className="oval" />
        </div>
        <div className="player-info-box">
          <div className="d-flex justify-content-between align-items-center">
            <h2>{name}</h2>
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
  img: PropTypes.string.isRequired,
  lives: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};
