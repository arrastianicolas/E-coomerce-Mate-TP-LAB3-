import { useState, useEffect } from "react";
import { Modal, Form, FormGroup, Button } from "react-bootstrap";

const EditUserModal = ({
  showEditUserModal,
  hideEditUserModalHandler,
  handleEditUser,
  formErrors,
  handleInputChange,
  formError,
  editUser,
  existingUsers,
}) => {
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    setApiError("");
  }, [showEditUserModal]); // Clear error message when modal shows

  const checkUserExists = async (field, value) => {
    try {
      const response = await fetch(`http://localhost:8000/users?${field}=${value}`);
      const data = await response.json();

      // Exclude current user from check
      const filteredUsers = data.filter(user => user.id !== editUser.id);

      return filteredUsers.length > 0;
    } catch (error) {
      console.error("Error checking user existence:", error);
      return false;
    }
  };

  const handleSave = async () => {
    const isEmailTaken = await checkUserExists("email", editUser.email);
    const isUsernameTaken = await checkUserExists("username", editUser.username);

    if (isEmailTaken) {
      setApiError("El correo electrónico ya está registrado");
      return;
    }

    if (isUsernameTaken) {
      setApiError("El nombre de usuario ya está registrado");
      return;
    }

    handleEditUser();
  };

  return (
    <Modal show={showEditUserModal} onHide={hideEditUserModalHandler}>
      <Modal.Header closeButton>
        <Modal.Title>Editar usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FormGroup className="mb-4">
            <label>Nombre de usuario:</label>
            <Form.Control
              type="text"
              name="username"
              value={editUser.username}
              className={formErrors.username ? "border border-danger" : ""}
              onChange={(e) => handleInputChange(e, true)}
              placeholder="Ingresar nombre de usuario"
              required
            />
          </FormGroup>
          <FormGroup className="mb-4">
            <label>Rol:</label>
            <Form.Control
              as="select"
              name="userType"
              value={editUser.userType}
              className={formErrors.userType ? "border border-danger" : ""}
              onChange={(e) => handleInputChange(e, true)}
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
              value={editUser.email}
              className={formErrors.email ? "border border-danger" : ""}
              onChange={(e) => handleInputChange(e, true)}
              placeholder="Ingresar email"
              required
            />
          </FormGroup>
          <FormGroup className="mb-4">
            <label>Contraseña:</label>
            <Form.Control
              type="password"
              name="password"
              value={editUser.password}
              className={
                formErrors.password || formErrors.passwordLengthAndWordUppercase
                  ? "border border-danger"
                  : ""
              }
              onChange={(e) => handleInputChange(e, true)}
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
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={hideEditUserModalHandler}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditUserModal;
