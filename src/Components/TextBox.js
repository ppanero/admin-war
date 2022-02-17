import React from 'react';
import PropTypes from 'prop-types';

export default function TextBox({ message }) {
  return <p>{message}</p>;
}

TextBox.propTypes = {
  message: PropTypes.string.isRequired,
};
