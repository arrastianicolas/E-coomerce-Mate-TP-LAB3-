import React, { useState, useEffect } from "react";
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
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    setApiError("");
  }, [showAddUserModal]);

  const checkUserExists = async (field, value) => {
    try {
      const response = await fetch(`http://localhost:8000/users?${field}=${value}`);
      const data = await response.json();

      return data.length > 0;
    } catch (error) {
      console.error("Error, chequeando existencia del usuario:", error);
      return false;
    }
  };

  const handleSave = async () => {
    const isUsernameTaken = await checkUserExists("username", newUser.username);
    const isEmailTaken = await checkUserExists("email", newUser.email);

    if (isUsernameTaken) {
      setApiError("El nombre de usuario ya está registrado");
      return;
    }

    if (isEmailTaken) {
      setApiError("El correo electrónico ya está registrado");
      return;
    }

    handleAddUser();
  };

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
          {apiError && (
            <div className="alert alert-danger" role="alert">
              {apiError}
            </div>
          )}
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
        <Button variant="primary" onClick={handleSave}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddUserModal;
