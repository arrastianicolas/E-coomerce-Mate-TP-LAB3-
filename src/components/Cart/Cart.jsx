import { useContext, useState } from "react";
import { Button } from "react-bootstrap";

import Footer from "../footer/Footer";
import NavBarLanding from "../navs/NavBarLanding";
import { ApiContext } from "../../services/apiContext/Api.context";

const Cart = () => {
  const [purchaseConfirmed, setPurchaseConfirmed] = useState(false);
  const { cart, setCart, setPurchaseHistory } = useContext(ApiContext);
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const handleConfirmPurchase = () => {
    setPurchaseConfirmed(!purchaseConfirmed);
    setPurchaseHistory((prevHistory) => [...prevHistory, ...cart]);
    setCart([]);
  };

  return (
    <>
      <NavBarLanding />
      <div className="cart-container">
        <h1>CARRITO</h1>
        <table className="cart-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Total</th>
              <th className="actions-column">Opciones</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>
                  $
                  {typeof item.price === "number"
                    ? item.price.toFixed(2)
                    : item.price}
                </td>
                <td>
                  $
                  {(typeof item.price === "number"
                    ? item.price * item.quantity
                    : 0
                  ).toFixed(2)}
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Button
          variant="success"
          onClick={handleConfirmPurchase}
          className="confirm-button"
        >
          Confirmar Compra
        </Button>
        {purchaseConfirmed && cart.length > 0 && (
          <div className="confirmation-message">
            <span className="checkmark">La compra ha sido Confirmada ✔️</span>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
