import { Modal, Button } from "react-bootstrap";

const ConfirmDeleteModal = ({
  showDeleteModal,
  hideModalHandler,
  removeUser,
}) => {
  return (
    <Modal show={showDeleteModal} onHide={hideModalHandler}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar eliminación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>¿Estás seguro de que deseas eliminar este usuario?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={hideModalHandler}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={removeUser}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmDeleteModal;
