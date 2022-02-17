import React from 'react';
import PropTypes from 'prop-types';
import { capitalize } from '../utils';

export default function AttacksBox({ attacks }) {
  const container = [];

  attacks.forEach((attack) => {
    container.push(<li key={attack}>{capitalize(attack)}</li>);
  });

  return <ul className="attacks-list">{container}</ul>;
}

AttacksBox.propTypes = {
  attacks: PropTypes.arrayOf(PropTypes.string).isRequired,
};
