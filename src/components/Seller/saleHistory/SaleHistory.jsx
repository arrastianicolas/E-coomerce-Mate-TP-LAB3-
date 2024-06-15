import { useContext } from "react";
import { ApiContext } from "../../../services/apiContext/Api.context";
import NavBarLanding from "../../navs/NavBarLanding";

const SaleHistory = () => {
  const { orderHistory, users } = useContext(ApiContext);

  const getBuyerName = (buyerId) => {
    console.log(buyerId);
    const buyer = users.find((user) => user.id === buyerId);
    return buyer ? buyer.email : "Desconocido";
  };
  localStorage.setItem("purchaseHistory", JSON.stringify(orderHistory));

  return (
    <>
      <NavBarLanding />
      <div className="salesHistory-container">
        <h1>Historial de Pedidos</h1>
        <table className="salesHistory-table">
          <thead>
            <tr>
              <th>ID de Orden</th>
              <th>Fecha</th>
              <th>Productos</th>
              <th>Comprador</th>
            </tr>
          </thead>
          <tbody>
            {orderHistory.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{new Date(order.date).toLocaleString()}</td>
                <td>
                  {order.items.map((item) => (
                    <div key={item.id}>
                      {item.name} - {item.quantity} x ${item.price}
                    </div>
                  ))}
                </td>
                <td>{getBuyerName(order.buyerId)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SaleHistory;
