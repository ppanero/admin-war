import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-bootstrap';

export default function KillerPanel({ killsCount }) {
  const container = [];
  Object.entries(killsCount).forEach(([player, kills]) => {
    container.push(
      <li>
        {player}: {kills}
      </li>,
    );
  });

  return (
    <Row className="text-center">
      <h2>Kills</h2>
      <ul className="kills-list">{container}</ul>
    </Row>
  );
}

KillerPanel.propTypes = {
  killsCount: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string))
    .isRequired,
};
