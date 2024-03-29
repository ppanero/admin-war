import React from 'react';
import PropTypes from 'prop-types';
import { Image, Modal } from 'react-bootstrap';
import { playerImageLoader } from '../utils';
import Crown from '../../assets/img/crown.png';

export default function Winner({ show, winner }) {
  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {/* need to avoid playerImageLoader failure */}
      {show && (
        <Modal.Body className="war-bg">
          <div className="text-center winner-container">
            <div className="animate__animated animate__backInDown">
              <Image className="crown" src={Crown} alt="Winner avatar" />
            </div>
            <div className="animate__animated animate__jackInTheBox">
              <Image
                className="winner-img"
                src={playerImageLoader(`./${winner}.jpeg`).default}
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
