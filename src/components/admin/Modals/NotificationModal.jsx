import React from "react";
import Modal from "react-bootstrap/Modal"; 
import Button from "react-bootstrap/Button";

const NotificationModal = ({ showNotificationModal, hideNotificationModalHandler, message }) => {
  return (
    <Modal show={showNotificationModal} onHide={hideNotificationModalHandler} centered>
      <Modal.Header closeButton>
        <Modal.Title>Notificación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={hideNotificationModalHandler}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NotificationModal;
