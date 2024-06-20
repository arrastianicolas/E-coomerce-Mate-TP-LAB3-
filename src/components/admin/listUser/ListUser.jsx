import { useState, useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import NavBarLanding from "../../Navs/NavBarLanding";
import { ApiContext } from "../../../services/apiContext/Api.context";

const ListUser = () => {
  const { users, deleteUser } = useContext(ApiContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
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

  const hideModalHandler = () => {
    setShowDeleteModal(false);
    setUserIdToDelete(null);
  };

  const showModalHandler = (id) => {
    setShowDeleteModal(true);
    setUserIdToDelete(id);
  };

  const handleDeleteUser = async () => {
    console.log(`Attempting to delete user with id ${userIdToDelete}`);
    try {
      await deleteUser(userIdToDelete);
      console.log(`User with id ${userIdToDelete} deleted successfully`);
    } catch (error) {
      console.error(`Failed to delete user with id ${userIdToDelete}`, error);
    }
    hideModalHandler();
  };

  const getRolLabel = (userType) => {
    switch (userType) {
      case "admin":
        return "Administrador";
      case "seller":
        return "Vendedor";
      case "client":
        return "Cliente";
      default:
        return userType;
    }
  };

  const hideAddUserModalHandler = () => {
    setShowAddUserModal(false);
    setNewUser({
      username: "",
      userType: "",
      email: "",
      password: "",
    });
  };

  const showAddUserModalHandler = () => {
    setShowAddUserModal(true);
  };

  const handleInputChange = (e, isEdit = false) => {
    const { name, value } = e.target;
    if (isEdit) {
      setEditUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    } else {
      setNewUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    }
  };

  const handleAddUser = async () => {
    // Lógica para agregar usuario usando el contexto
    hideAddUserModalHandler();
  };

  const hideEditUserModalHandler = () => {
    setShowEditUserModal(false);
    setEditUser({
      id: null,
      username: "",
      userType: "",
      email: "",
      password: "",
    });
  };

  const showEditUserModalHandler = (user) => {
    setEditUser(user);
    setShowEditUserModal(true);
  };

  const handleEditUser = async () => {
    // Lógica para editar usuario usando el contexto
    hideEditUserModalHandler();
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
                <th className="actions-column">Opciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{getRolLabel(user.userType)}</td>
                  <td>{user.email}</td>
                  <td>
                    <button
                      className="btn btn-primary me-2 custom-button"
                      onClick={() => showEditUserModalHandler(user)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger custom-button"
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

      {/*confirmación de eliminación */}
      <Modal show={showDeleteModal} onHide={hideModalHandler}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Estás seguro que deseas eliminar este usuario?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideModalHandler}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDeleteUser}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* agregar usuario */}
      <Modal show={showAddUserModal} onHide={hideAddUserModalHandler}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Nombre de Usuario
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={newUser.username}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="userType" className="form-label">
                Rol
              </label>
              <select
                className="form-control"
                id="userType"
                name="userType"
                value={newUser.userType}
                onChange={handleInputChange}
              >
                <option value="">Seleccione un rol</option>
                <option value="admin">Administrador</option>
                <option value="seller">Vendedor</option>
                <option value="client">Cliente</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={newUser.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={newUser.password}
                onChange={handleInputChange}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideAddUserModalHandler}>
            Cancelar
          </Button>
          <Button variant="success" onClick={handleAddUser}>
            Agregar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* editar usuario */}
      <Modal show={showEditUserModal} onHide={hideEditUserModalHandler}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="edit-username" className="form-label">
                Nombre de Usuario
              </label>
              <input
                type="text"
                className="form-control"
                id="edit-username"
                name="username"
                value={editUser.username}
                onChange={(e) => handleInputChange(e, true)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="edit-userType" className="form-label">
                Rol
              </label>
              <select
                className="form-control"
                id="edit-userType"
                name="userType"
                value={editUser.userType}
                onChange={(e) => handleInputChange(e, true)}
              >
                <option value="">Seleccione un rol</option>
                <option value="admin">Administrador</option>
                <option value="seller">Vendedor</option>
                <option value="client">Cliente</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="edit-email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="edit-email"
                name="email"
                value={editUser.email}
                onChange={(e) => handleInputChange(e, true)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="edit-password" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="edit-password"
                name="password"
                value={editUser.password}
                onChange={(e) => handleInputChange(e, true)}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideEditUserModalHandler}>
            Cancelar
          </Button>
          <Button variant="success" onClick={handleEditUser}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ListUser;
