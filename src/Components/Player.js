import React from 'react';
import PropTypes from 'prop-types';
import { Image, ProgressBar } from 'react-bootstrap';
import {
  getProgressBarVariant,
  getAnimationForStatus,
  imageLoader,
} from '../utils';
import playerStatus from '../playerStatus';

export function LifeBox({ name, lives, variant }) {
  return (
    <div className="player-info-box">
      <div className="d-flex justify-content-between align-items-center">
        <h2>{name.toUpperCase()}</h2>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <h5>HP</h5>
        <ProgressBar now={lives} variant={variant} />
      </div>
    </div>
  );
}

LifeBox.propTypes = {
  name: PropTypes.string.isRequired,
  lives: PropTypes.number.isRequired,
  variant: PropTypes.string.isRequired,
};

export function AvatarBox({ name, anim, hero }) {
  return (
    <div className={`${hero ? 'ml-sm-5' : 'mr-sm-4'} avatar-box`}>
      <div className={`animate__animated ${anim}`}>
        <Image
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

export default function Player({ name, lives, status, hero }) {
  const variant = getProgressBarVariant(lives);
  const anim = getAnimationForStatus(status);

  return (
    <div>
      {hero ? (
        <div className="player-container hero-container">
          <AvatarBox name={name} anim={anim} hero={hero} />
          <LifeBox name={name} lives={lives} variant={variant} />
        </div>
      ) : (
        <div className="player-container enemy-container">
          <LifeBox name={name} lives={lives} variant={variant} />
          <AvatarBox name={name} anim={anim} hero={hero} />
        </div>
      )}
    </div>
  );
}

Player.propTypes = {
  name: PropTypes.string.isRequired,
  lives: PropTypes.number.isRequired,
  status: PropTypes.string,
  hero: PropTypes.bool,
};

Player.defaultProps = {
  status: playerStatus('APPEAR'),
  hero: true,
};
