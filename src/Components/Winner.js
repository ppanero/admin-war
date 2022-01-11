import React from 'react';
import PropTypes from 'prop-types';

export default function Winner({ img, imgCrown }) {
  return (
    <div className="text-center winner-container">
      <div className="animate__animated animate__backInDown">
        <img className="crown" src={imgCrown} alt="Winner avatar" />
      </div>
      <div className="animate__animated animate__jackInTheBox">
        <img className="winner-img" src={img} alt="Winner avatar" />
      </div>
    </div>
  );
}

Winner.propTypes = {
  img: PropTypes.string.isRequired,
  imgCrown: PropTypes.string.isRequired,
};
