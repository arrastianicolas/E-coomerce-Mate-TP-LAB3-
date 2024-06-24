import { useContext } from "react";
import NavBarLanding from "../../navs/NavBarLanding";
import { ApiContext } from "../../services/apiContext/Api.context";

const UsersList = () => {
  const { users, deleteUser } = useContext(ApiContext);

  const handleEditUser = (userId) => {
    // Lógica para editar usuario
    console.log(`Editar usuario con ID: ${userId}`);
  };

  const handleDeleteUser = async (userId) => {
    // Lógica para eliminar usuario
    try {
      await deleteUser(userId);
      console.log(`Usuario con ID ${userId} eliminado.`);
    } catch (error) {
      console.error(`Error al eliminar usuario: ${error.message}`);
    }
  };

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
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleEditUser(user.id)}
                  >
                    Editar
                  </button>
                  <br />
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDeleteUser(user.id)}
                  >
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
