import React from 'react';
import PropTypes from 'prop-types';
import { Button, Image, Modal } from 'react-bootstrap';
import PokeWars from '../../assets/img/team-rocket-pokewars.png';

export default function WarModal({ show, onClick }) {
  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div className="text-center">
          <Button
            className="war-button"
            variant="primary"
            size="lg"
            onClick={onClick}
          >
            <Image
              src={PokeWars}
              alt="Logo PokeWars"
              width="400"
              height="400"
            />
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

WarModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
