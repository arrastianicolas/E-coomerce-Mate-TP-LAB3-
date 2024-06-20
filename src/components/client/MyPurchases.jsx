import { useContext } from "react";
import { ApiContext } from "../../services/apiContext/Api.context";
import { AuthenticationContext } from "../../services/auth/Auth.context";
import NavBarLanding from "../Navs/NavBarLanding";

const MyPurchases = () => {
  const { purchaseHistory } = useContext(ApiContext);
  const { user } = useContext(AuthenticationContext);

  // Filtrar el historial de compras por el ID del usuario autenticado
  const userPurchases = purchaseHistory.filter(
    (purchase) => purchase.userId === user.id
  );

  return (
    <>
      <NavBarLanding />
      <div className="my-purchases-container">
        <h1>Mis Compras</h1>
        <table className="purchases-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Descripción</th>
              <th>Cantidad</th>
              <th>SubTotal</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {userPurchases.map((purchase, index) => (
              <tr key={index}>
                <td>{purchase.name}</td>
                <td>{purchase.description}</td>
                <td>{purchase.quantity}</td>
                <td>
                  {typeof purchase.price === "number"
                    ? `$${purchase.price.toFixed(2)}`
                    : purchase.price}
                </td>
                <td>
                  {typeof purchase.price === "number" &&
                  typeof purchase.quantity === "number"
                    ? `$${(purchase.price * purchase.quantity).toFixed(2)}`
                    : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MyPurchases;
