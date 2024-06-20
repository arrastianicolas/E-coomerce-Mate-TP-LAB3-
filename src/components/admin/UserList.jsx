import { useContext } from "react";
import NavBarLanding from "../../navs/NavBarLanding";
import { ApiContext } from "../../services/apiContext/Api.context";

const UsersList = () => {
  const { users } = useContext(ApiContext);
  // const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     const response = await fetch("http://localhost:8000/users/${id}");
  //     const data = await response.json();
  //     setUsers(data);
  //   };

  //   fetchUsers();
  // }, []);

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
