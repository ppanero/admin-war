import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';

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
            War!
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
