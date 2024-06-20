import { useState, useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import NavBarLanding from "../../navs/NavBarLanding";
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

  const hideModalHandler = () => {
    setShowDeleteModal(false);
  };

  const showModalHandler = (id) => {
    setShowDeleteModal(true);
    setUserIdToDelete(id);
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
      setEditUser((prevUser) => ({ ...prevUser, [name]: value }));
    } else {
      setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
    }
  };

  const handleAddUser = async () => {
    await addUser(newUser);
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
    await updateUser(editUser);
    hideEditUserModalHandler();
  };

  const handleDeleteUser = async () => {
    await deleteUser(userIdToDelete);
    hideModalHandler();
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
          <form>
            <div className="form-group">
              <label>Nombre de usuario</label>
              <input
                type="text"
                name="username"
                value={newUser.username}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Rol</label>
              <select
                name="userType"
                value={newUser.userType}
                onChange={handleInputChange}
                className="form-control"
                required
              >
                <option value="">Seleccionar rol</option>
                <option value="client">Cliente</option>
                <option value="seller">Vendedor</option>
                <option value="sysAdmin">SuperAdmin</option>
              </select>
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={newUser.email}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Contraseña</label>
              <input
                type="password"
                name="password"
                value={newUser.password}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>
          </form>
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
          <form>
            <div className="form-group">
              <label>Nombre de usuario</label>
              <input
                type="text"
                name="username"
                value={editUser.username}
                onChange={(e) => handleInputChange(e, true)}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Rol</label>
              <select
                name="userType"
                value={editUser.userType}
                onChange={(e) => handleInputChange(e, true)}
                className="form-control"
                required
              >
                <option value="">Seleccionar rol</option>
                <option value="client">cliente</option>
                <option value="seller">Vendedor</option>
                <option value="sysAdmin">SuperAdmin</option>
              </select>
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={editUser.email}
                onChange={(e) => handleInputChange(e, true)}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Contraseña</label>
              <input
                type="password"
                name="password"
                value={editUser.password}
                onChange={(e) => handleInputChange(e, true)}
                className="form-control"
                required
              />
            </div>
          </form>
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
          ¿Estás seguro de que deseas eliminar este usuario?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideModalHandler}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDeleteUser}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ListUser;
