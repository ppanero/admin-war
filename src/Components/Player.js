import React from 'react';
import PropTypes from 'prop-types';

export default function Player({ name, img, lives }) {
  // calc player progress bar percentage based on HP
  const livesColor = lives > 1 ? 'bg-success' : 'bg-danger';

  return (
    <div>
      {/* HERO POKEMON CONTAINER */}
      <div className="player-container hero-container">
        {/* HERO POKEMON AVATAR PICTURE */}
        <div className="avatar-box ml-sm-5">
          <div className="animate__animated animate__fadeInUp">
            <img className="avatar mx-2" src={img} alt="Player avatar" />
          </div>
          <div className="oval" />
        </div>
        {/* END HERO POKEMON AVATAR PICTURE */}

        {/* HERO POKEMON INFO BOX */}
        <div className="player-info-box">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="player-name">{name}</h2>
          </div>
          <div className="d-flex justify-content-between align-items-center ml-3 mr-1">
            <h5>HP</h5>
            <div className="progress ml-1 both-progress">
              <div
                className={`progress-bar ${livesColor}`}
                role="progressbar"
                style={{ width: `${lives * 50}%` }}
                aria-valuenow="75"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-label="todo"
              />
            </div>
          </div>
        </div>
        {/* END HERO POKEMON INFO BOX */}
      </div>
      {/* END HERO POKEMON CONTAINER */}
    </div>
  );
}

Player.propTypes = {
  img: PropTypes.string.isRequired,
  lives: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};
