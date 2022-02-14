import React from 'react';
import PropTypes from 'prop-types';
import { ProgressBar } from 'react-bootstrap';
import {
  getProgressBarVariant,
  getAnimationForStatus,
  imageLoader,
  MAX_LIFE,
} from '../utils';
import playerStatus from '../playerStatus';

export function LifeBox({ name, hp, variant }) {
  return (
    <div className="player-info-box">
      <div className="d-flex justify-content-between align-items-center">
        <h2>{name.toUpperCase()}</h2>
        <h5>{`HP ${hp}/${MAX_LIFE}`}</h5>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <ProgressBar now={hp} variant={variant} />
      </div>
    </div>
  );
}

LifeBox.propTypes = {
  name: PropTypes.string.isRequired,
  hp: PropTypes.number.isRequired,
  variant: PropTypes.string.isRequired,
};

export function AvatarBox({ name, anim, hero }) {
  return (
    <div className={`${hero ? 'ml-sm-5' : 'mr-sm-4'} avatar-box`}>
      <div className={`animate__animated ${anim}`}>
        <img
          className="avatar"
          src={imageLoader(`./${name}.jpeg`).default}
          alt={hero ? 'Hero avatar' : 'Enemy avatar'}
        />
      </div>
      <div className="oval" />
    </div>
  );
}

AvatarBox.propTypes = {
  name: PropTypes.string.isRequired,
  anim: PropTypes.string.isRequired,
  hero: PropTypes.bool.isRequired,
};

export default function Player({ name, hp, status, hero }) {
  const variant = getProgressBarVariant(hp);
  const anim = getAnimationForStatus(status);

  return (
    <div>
      {hero ? (
        <div className="player-container hero-container">
          <AvatarBox name={name} anim={anim} hero={hero} />
          <LifeBox name={name} hp={hp} variant={variant} />
        </div>
      ) : (
        <div className="player-container enemy-container">
          <LifeBox name={name} hp={hp} variant={variant} />
          <AvatarBox name={name} anim={anim} hero={hero} />
        </div>
      )}
    </div>
  );
}

Player.propTypes = {
  name: PropTypes.string.isRequired,
  hp: PropTypes.number.isRequired,
  status: PropTypes.string,
  hero: PropTypes.bool,
};

Player.defaultProps = {
  status: playerStatus('APPEAR'),
  hero: true,
};
