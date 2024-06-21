import { useState, useContext } from "react";
import { Button, Modal, Form, FormGroup } from "react-bootstrap";
import NavBarLanding from "../../Navs/NavBarLanding";
import { ApiContext } from "../../../services/apiContext/Api.context";

const ListUser = () => {
  const { users, addUser, updateUser, deleteUser } = useContext(ApiContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  const [newUser, setNewUser] = useState({
    username: "",
    userType: "",
    email: "",
    password: "",
  });

  const [editUser, setEditUser] = useState({
    id: null,
    username: "",
    userType: "",
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    username: false,
    userType: false,
    email: false,
    password: false,
    passwordLengthAndWordUppercase: false,
  });
  const [formError, setFormError] = useState("");

  const hideModalHandler = () => {
    setShowDeleteModal(false);
    setUserIdToDelete(null);
  };

  const showModalHandler = (id) => {
    setShowDeleteModal(true);
    setUserIdToDelete(id);
  };

  const removeUser = async () => {
    await deleteUser(userIdToDelete);
    hideModalHandler();
  };

  const hideAddUserModalHandler = () => {
    setShowAddUserModal(false);
    setNewUser({
      username: "",
      userType: "",
      email: "",
      password: "",
    });
    setFormErrors({
      username: false,
      userType: false,
      email: false,
      password: false,
      passwordLengthAndWordUppercase: false,
    });
    setFormError("");
  };

  const showAddUserModalHandler = () => setShowAddUserModal(true);
  const hideEditUserModalHandler = () => {
    setShowEditUserModal(false);
    setEditUser({
      id: null,
      username: "",
      userType: "",
      email: "",
      password: "",
    });
    setFormErrors({
      username: false,
      userType: false,
      email: false,
      password: false,
      passwordLengthAndWordUppercase: false,
    });
    setFormError("");
  };

  const showEditUserModalHandler = (user) => {
    setEditUser({
      id: user.id,
      username: user.username,
      userType: user.userType,
      email: user.email,
      password: "",
    });
    setShowEditUserModal(true);
  };

  const handleInputChange = (e, isEdit = false) => {
    const { name, value } = e.target;
    if (isEdit) {
      setEditUser((prevUser) => ({ ...prevUser, [name]: value }));
    } else {
      setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
    }
  };

  const validateForm = (user) => {
    const { username, userType, email, password } = user;
    const errors = {
      username: username.trim() === "",
      userType: userType.trim() === "",
      email: email.trim() === "" || !email.includes("@"),
      password: password.trim() === "",
      passwordLengthAndWordUppercase:
        password.length <= 6 || !/[A-Z]/.test(password),
    };

    setFormErrors(errors);

    if (Object.values(errors).some((error) => error)) {
      setFormError("Todos los campos son obligatorios.");
      return false;
    }

    setFormError("");
    return true;
  };

  const handleAddUser = async () => {
    if (validateForm(newUser)) {
      await addUser(newUser);
      hideAddUserModalHandler();
    }
  };

  const handleEditUser = async () => {
    if (validateForm(editUser)) {
      await updateUser(editUser);
      hideEditUserModalHandler();
    }
  };

  return (
    <>
      <NavBarLanding />
      <div className="list-user-container">
        <h1>Lista de usuarios</h1>
        <button
          className="btn btn-success mb-3"
          onClick={showAddUserModalHandler}
        >
          Dar de alta usuario
        </button>
        <div className="list-user-table-container">
          <table className="list-user-table">
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Rol</th>
                <th>Email</th>
                <th className="actions-column">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.userType}</td>
                  <td>{user.email}</td>
                  <td className="actions-column">
                    <button
                      className="btn btn-primary"
                      onClick={() => showEditUserModalHandler(user)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => showModalHandler(user.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal para dar de alta usuario */}
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
                  formErrors.password ||
                  formErrors.passwordLengthAndWordUppercase
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

      {/* Modal para editar usuario */}
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
                  formErrors.password ||
                  formErrors.passwordLengthAndWordUppercase
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
            {formError && (
              <div className="alert alert-danger" role="alert">
                {formError}
              </div>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideEditUserModalHandler}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleEditUser}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para confirmar eliminación */}
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
    </>
  );
};

export default ListUser;
