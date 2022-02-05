import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-bootstrap';
import { capitalize, imageLoader } from '../utils';

export default function KillerPanel({ killsCount }) {
  const container = [];
  const img = imageLoader(`./logo.png`).default;
  Object.entries(killsCount).forEach(([player, kills]) => {
    container.push(
      <li key={player}>
        {capitalize(player)}: {kills}
      </li>,
    );
  });

  return (
    <Row className="text-center">
      <h2>
        <img src={img} alt="Kills" />
      </h2>
      <ul className="kills-list">{container}</ul>
    </Row>
  );
}

KillerPanel.propTypes = {
  killsCount: PropTypes.objectOf(PropTypes.number).isRequired,
};
