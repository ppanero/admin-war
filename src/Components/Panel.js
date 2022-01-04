import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';

export default function Panel({ players }) {
  const container = [];
  players.forEach((player) => {
    container.push(
      <Col lg="auto" className="avatar-box" key={player}>
        <img
          className="avatar mx-2"
          src={`../assets/img/${player}.jpeg`}
          alt="Player avatar"
        />
      </Col>,
    );
  });

  return <Row className="justify-content-md-center">{container}</Row>;
}

Panel.propTypes = {
  players: PropTypes.arrayOf(PropTypes.string).isRequired,
};
