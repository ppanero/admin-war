import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';

export default function Panel({ playerLives, imageLoader }) {
  const container = [];
  Object.entries(playerLives).forEach(([player, lives]) => {
    const livesColor =
      lives > 1 ? 'progress-bar bg-success' : 'progress-bar bg-danger';
    const imgStyle = lives > 0 ? 'avatar mx-2' : 'avatar mx-2 dead-player';
    const img = imageLoader(`./${player}.jpeg`).default;
    container.push(
      <Col lg="auto" className="avatar-box" key={player}>
        <img className={imgStyle} src={img} alt="Player avatar" />
        <div className="px-2">
          {lives > 0 && (
            <div className="progress both-progress">
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
          )}
        </div>
      </Col>,
    );
  });

  return <Row className="justify-content-md-center">{container}</Row>;
}

Panel.propTypes = {
  playerLives: PropTypes.objectOf(PropTypes.number).isRequired,
  imageLoader: PropTypes.func.isRequired,
};
