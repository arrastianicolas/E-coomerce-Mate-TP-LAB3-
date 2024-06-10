import { useContext, useState } from "react";
import { Button } from "react-bootstrap";

import Footer from "../footer/Footer";
import NavBarLanding from "../navs/NavBarLanding";
import { ApiContext } from "../../services/apiContext/Api.context";

const Cart = () => {
  const [purchaseConfirmed, setPurchaseConfirmed] = useState(false);
  const { cart, setCart } = useContext(ApiContext);
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const handleConfirmPurchase = () => {
    setPurchaseConfirmed(!purchaseConfirmed);
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
                <td>${item.price.toFixed(2)}</td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
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
        {purchaseConfirmed && cart.lenght > 0 && (
          <div className="confirmation-message">
            La compra ha sido Confirmada <span className="checkmark">✔️</span>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
