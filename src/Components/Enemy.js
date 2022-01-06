import React from 'react';
import PropTypes from 'prop-types';

export default function Enemy({ name, img, lives, hide, faint }) {
  // calc enemy progress bar percentage based on HP
  const livesColor =
    lives > 1 ? 'progress-bar bg-success' : 'progress-bar bg-danger';
  let anim;
  if (hide) {
    anim = 'hide';
  } else {
    anim = faint ? 'animated fadeOut slow' : 'animated fadeInUp';
  }

  return (
    <div>
      {/* ENEMY POKEMON CONTAINER */}
      <div id="enemy-container">
        {/* ENEMY POKEMON INFO BOX */}
        <div id="enemy-info-box">
          <div className="d-flex justify-content-between align-items-center">
            <h2 id="enemy-name">{name}</h2>
          </div>
          <div className="d-flex justify-content-between align-items-center ml-3 mr-1">
            <h5>HP</h5>
            <div className="progress ml-1 both-progress">
              <div
                className={livesColor}
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
        {/* END ENEMY POKEMON INFO BOX */}

        {/* ENEMY POKEMON AVATAR PICTURE */}
        <div className="mr-sm-4 avatar-box">
          <div className={anim}>
            <img className="avatar mr-3 mt-4" src={img} alt="Player avatar" />
          </div>
          <div className="oval" />
        </div>
        {/* END ENEMY POKEMON AVATAR PICTURE */}
      </div>
      {/* END ENEMY POKEMON CONTAINER */}
    </div>
  );
}

Enemy.propTypes = {
  faint: PropTypes.bool,
  hide: PropTypes.bool,
  img: PropTypes.string.isRequired,
  lives: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

Enemy.defaultProps = {
  hide: false,
  faint: false,
};
