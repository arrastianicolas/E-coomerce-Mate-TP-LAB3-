import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import NavBarLanding from "../../navs/NavBarLanding";

const ListUser = () => {
  const [users, setUsers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    userType: "",
    email: "",
    password: "",
  });

  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8000/users");
        if (!response.ok) {
          throw new Error("Error al obtener la lista de usuarios");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Fetch users error:", error.message);
      }
    };

    fetchUsers();
  }, []);

  const hideModalHandler = () => {
    setShowDeleteModal(false);
    setUserIdToDelete(null);
  };

  const showModalHandler = (id) => {
    setShowDeleteModal(true);
    setUserIdToDelete(id);
  };

  const handleDeleteUser = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/users/${userIdToDelete}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Error al eliminar el usuario");
      }

      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== userIdToDelete)
      );
      console.log(`Usuario con ID ${userIdToDelete} eliminado correctamente`);
    } catch (error) {
      console.error("Eliminar usuario error:", error.message);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleAddUser = async () => {
    try {
      const response = await fetch("http://localhost:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error("Error al agregar el usuario");
      }

      const createdUser = await response.json();
      setUsers((prevUsers) => [...prevUsers, createdUser]);
      console.log("Usuario agregado correctamente");
    } catch (error) {
      console.error("Agregar usuario error:", error.message);
    }

    hideAddUserModalHandler();
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
                      onClick={() => console.log("Editar")}
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

      <Modal show={showDeleteModal} onHide={hideModalHandler}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Está seguro que desea eliminar este usuario?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideModalHandler}>
            Cerrar
          </Button>
          <Button variant="danger" onClick={handleDeleteUser}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showAddUserModal} onHide={hideAddUserModalHandler}>
        <Modal.Header closeButton>
          <Modal.Title>Dar de alta usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Usuario
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
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleAddUser}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ListUser;
