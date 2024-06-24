import { Modal, Form, FormGroup, Button } from "react-bootstrap";

const AddUserModal = ({
  showAddUserModal,
  hideAddUserModalHandler,
  handleAddUser,
  formErrors,
  handleInputChange,
  formError,
  newUser,
}) => {
  return (
    <Modal show={showAddUserModal} onHide={hideAddUserModalHandler}>
      <Modal.Header closeButton>
        <Modal.Title>Dar de alta usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FormGroup className="mb-4">
            <label>Nombre de usuario:</label>
            <Form.Control
              type="text"
              name="username"
              value={newUser.username}
              className={formErrors.username ? "border border-danger" : ""}
              onChange={handleInputChange}
              placeholder="Ingresar nombre de usuario"
              required
            />
          </FormGroup>
          <FormGroup className="mb-4">
            <label>Rol:</label>
            <Form.Control
              as="select"
              name="userType"
              value={newUser.userType}
              className={formErrors.userType ? "border border-danger" : ""}
              onChange={handleInputChange}
              required
            >
              <option value="">Seleccionar rol</option>
              <option value="client">Cliente</option>
              <option value="seller">Vendedor</option>
              <option value="sysAdmin">Admin</option>
            </Form.Control>
          </FormGroup>
          <FormGroup className="mb-4">
            <label>Email:</label>
            <Form.Control
              type="email"
              name="email"
              value={newUser.email}
              className={formErrors.email ? "border border-danger" : ""}
              onChange={handleInputChange}
              placeholder="Ingresar email"
              required
            />
          </FormGroup>
          <FormGroup className="mb-4">
            <label>Contraseña:</label>
            <Form.Control
              type="password"
              name="password"
              value={newUser.password}
              className={
                formErrors.password || formErrors.passwordLengthAndWordUppercase
                  ? "border border-danger"
                  : ""
              }
              onChange={handleInputChange}
              placeholder="Ingresar contraseña"
              required
            />
            {formErrors.passwordLengthAndWordUppercase && (
              <small className="text-danger">
                La contraseña debe tener más de 6 caracteres y al menos una
                mayúscula.
              </small>
            )}
          </FormGroup>
          {formError && (
            <div className="alert alert-danger" role="alert">
              {formError}
            </div>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={hideAddUserModalHandler}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleAddUser}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddUserModal;
