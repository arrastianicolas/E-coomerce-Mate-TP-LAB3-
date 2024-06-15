import { useState, useEffect } from "react";
import NavBarLanding from "../../navs/NavBarLanding";

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/users"); // URL de tu API
      const data = await response.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  return (
    <>
      <NavBarLanding />
      <div className="usersList-container">
        <h1>Lista de Usuarios</h1>
        <table className="usersList-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th className="actions-column">Opciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button type="button" className="btn btn-primary">
                    Editar
                  </button>
                  <br />
                  <button type="button" className="btn btn-danger">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UsersList;
