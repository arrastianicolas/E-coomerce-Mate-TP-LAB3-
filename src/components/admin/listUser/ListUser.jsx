import { useState, useEffect } from "react";
import NavBarLanding from "../../navs/NavBarLanding";
import "./ListUser.css";

const ListUser = () => {
  const [users, setUsers] = useState([]);

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

  const eliminarUsuario = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/users/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el usuario");
      }

      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      console.log(`Usuario con ID ${id} eliminado correctamente`);
    } catch (error) {
      console.error("Eliminar usuario error:", error.message);
    }
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
        return userType; // Devolver el tipo de usuario en caso de no coincidir con los valores conocidos
    }
  };

  return (
    <>
      <NavBarLanding />
      <div className="list-user-container">
        <h1>Lista de usuarios</h1>
        <button
          className="btn btn-success mb-3"
          onClick={() => console.log("Dar de alta usuario")}
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
                      onClick={() => eliminarUsuario(user.id)}
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
    </>
  );
};

export default ListUser;
