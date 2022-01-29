import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Modal } from 'react-bootstrap';
import { ChoosingPlayersPanel } from './PlayersPanel';

export default function WarModal({ show, onWarClick, onPlayerClick, players }) {
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
          <ChoosingPlayersPanel
            chosenPlayers={players}
            onClick={onPlayerClick}
          />
          <hr />
          <Form>
            <Form.Group className="mb-3" controlId="formInterval">
              <Form.Label>Invervalo entre batallas (en minutos)</Form.Label>
              <Form.Control type="textarea" placeholder="5" ref={interval} />
            </Form.Group>
            <Button
              className="war-button"
              variant="primary"
              size="lg"
              onClick={onWarClick(interval)}
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
  onWarClick: PropTypes.func.isRequired,
  onPlayerClick: PropTypes.func.isRequired,
  players: PropTypes.objectOf(PropTypes.bool).isRequired,
};
