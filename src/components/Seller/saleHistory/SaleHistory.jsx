import { useContext, useEffect, useState } from "react";
import { ApiContext } from "../../../services/apiContext/Api.context";
import NavBarLanding from "../../Navs/NavBarLanding";
import { AuthenticationContext } from "../../../services/auth/Auth.context";

const SaleHistory = () => {
  const { orderHistory, users } = useContext(ApiContext);
  const { user } = useContext(AuthenticationContext);
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    if (orderHistory && orderHistory.length > 0) {
      const ordersWithSellerItems = orderHistory
        .map((order) => ({
          ...order,
          items: order.items.filter((item) => item.sellerId === user.id),
        }))
        .filter((order) => order.items.length > 0);
      setFilteredOrders(ordersWithSellerItems);
    }
  }, [orderHistory, user.id]);

  const getBuyerName = (buyerId) => {
    const buyer = users.find((user) => user.id === buyerId);
    return buyer ? buyer.email : "Desconocido";
  };

  return (
    <>
      <NavBarLanding />
      <div className="salesHistory-container">
        <h1>Historial de Pedidos</h1>
        {orderHistory.length === 0 ? (
          <p>No hay pedidos.</p>
        ) : (
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
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="4">
                    No se encontraron pedidos para este vendedor.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
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
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default SaleHistory;
