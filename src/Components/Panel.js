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
      </Col>,
    );
  });

  return <Row className="justify-content-md-center">{container}</Row>;
}

Panel.propTypes = {
  players: PropTypes.arrayOf(PropTypes.string).isRequired,
  imageLoader: PropTypes.func.isRequired,
};
