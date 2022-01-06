import React from 'react';
import PropTypes from 'prop-types';

export default function TextBox({ message }) {
  return (
    <div className="battle-text-content">
      <p>{message}</p>
    </div>
  );
}

TextBox.propTypes = {
  message: PropTypes.string.isRequired,
};
