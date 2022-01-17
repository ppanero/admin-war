import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Modal } from 'react-bootstrap';

export default function WarModal({ show, onClick }) {
  const interval = createRef();

  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div className="text-center">
          <Form>
            <Form.Group className="mb-3" controlId="formInterval">
              <Form.Label>Invervalo entre batallas (en minutos)</Form.Label>
              <Form.Control type="textarea" placeholder="5" ref={interval} />
            </Form.Group>
            <Button
              className="war-button"
              variant="primary"
              size="lg"
              onClick={onClick(interval)}
            >
              War!
            </Button>
          </Form>
        </div>
      </Modal.Body>
    </Modal>
  );
}

WarModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
