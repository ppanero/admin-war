import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import { imageLoader } from '../utils';

export default function Winner({ show, winner }) {
  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {/* need to avoid imageLoader failure */}
      {show && (
        <Modal.Body className="war-bg">
          <div className="text-center winner-container">
            <div className="animate__animated animate__backInDown">
              <img
                className="crown"
                src={imageLoader(`./crown.png`).default}
                alt="Winner avatar"
              />
            </div>
            <div className="animate__animated animate__jackInTheBox">
              <img
                className="winner-img"
                src={imageLoader(`./${winner}.jpeg`).default}
                alt="Winner avatar"
              />
            </div>
          </div>{' '}
        </Modal.Body>
      )}
    </Modal>
  );
}

Winner.propTypes = {
  show: PropTypes.bool.isRequired,
  winner: PropTypes.string.isRequired,
};
