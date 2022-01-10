import React from 'react';
import PropTypes from 'prop-types';
import { ProgressBar } from 'react-bootstrap';

export default function Enemy({ name, img, lives, shake }) {
  // calc enemy progress bar percentage based on HP
  const variant = lives < 2 ? 'danger' : 'success';

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
            <h2>{name}</h2>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <h5>HP</h5>
            <ProgressBar now={lives * 50} variant={variant} />
          </div>
        </div>
        <div className="mr-sm-4 avatar-box">
          <div className={`animate__animated ${anim}`}>
            <img className="avatar mr-3 mt-4" src={img} alt="Enemy avatar" />
          </div>
          <div className="oval" />
        </div>
      </div>
    </div>
  );
}

Enemy.propTypes = {
  img: PropTypes.string.isRequired,
  lives: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  shake: PropTypes.bool,
};

Enemy.defaultProps = {
  shake: false,
};
