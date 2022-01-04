import React from 'react';
import PropTypes from 'prop-types';

export default function Player({ name, img, lives, hide, faint }) {
  // calc player progress bar percentage based on HP
  const livesColor =
    lives > 1 ? 'progress-bar bg-success' : 'progress-bar bg-danger';
  const livesBar = lives > 1 ? '100%' : '50%';
  let anim;
  if (hide) {
    anim = 'hide';
  } else {
    anim = faint ? 'animated fadeOut slow' : 'animated fadeInUp';
  }

  return (
    <div>
      {/* HERO POKEMON CONTAINER */}
      <div id="hero-container">
        {/* HERO POKEMON AVATAR PICTURE */}
        <div className="avatar-box ml-sm-5">
          <div className={anim}>
            <img className="avatar mx-2" src={img} alt="Player avatar" />
          </div>
          <div className="oval" />
        </div>
        {/* END HERO POKEMON AVATAR PICTURE */}

        {/* HERO POKEMON INFO BOX */}
        <div id="hero-info-box">
          <div className="d-flex justify-content-between align-items-center">
            <h2 id="hero-name">{name}</h2>
          </div>
          <div className="d-flex justify-content-between align-items-center ml-3 mr-1">
            <h5>HP</h5>
            <div className="progress ml-1 both-progress">
              <div
                className={livesColor}
                role="progressbar"
                style={{ width: livesBar }}
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
  faint: PropTypes.bool,
  hide: PropTypes.bool,
  img: PropTypes.string.isRequired,
  lives: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

Player.defaultProps = {
  hide: false,
  faint: false,
};
