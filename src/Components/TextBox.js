import React from 'react';
import PropTypes from 'prop-types';

export default function TextBox({ messageOne, messageTwo }) {
  return (
    <div className="battle-text-content">
      <p>
        {messageOne} <br /> {messageTwo}
      </p>
    </div>
  );
}

TextBox.propTypes = {
  messageOne: PropTypes.string.isRequired,
  messageTwo: PropTypes.string,
};

TextBox.defaultProps = {
  messageTwo: '',
};
