import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';

export default function Panel({ players, imageLoader }) {
  const container = [];
  players.forEach((player) => {
    const img = imageLoader(`./${player}.jpeg`).default;
    container.push(
      <Col lg="auto" className="avatar-box" key={player}>
        <img className="avatar mx-2" src={img} alt="Player avatar" />
        <div className="px-2">
          <div className="progress both-progress">
            <div
              className="progress-bar bg-success"
              role="progressbar"
              style={{ width: '100%' }}
              aria-valuenow="75"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-label="todo"
            />
          </div>
        </div>
      </Col>,
    );
  });

  return <Row className="justify-content-md-center">{container}</Row>;
}

Panel.propTypes = {
  players: PropTypes.arrayOf(PropTypes.string).isRequired,
  imageLoader: PropTypes.func.isRequired,
};
