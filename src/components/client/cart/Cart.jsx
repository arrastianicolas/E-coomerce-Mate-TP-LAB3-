import { useState } from "react";
import NavBarLanding from "../../navs/NavBarLanding";

const Cart = () => {
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleConfirmPurchase = () => {
    setIsConfirmed(true);
  };

  return (
    <>
      <NavBarLanding />
      <div className="cart-container">
        <h1>Carrito</h1>
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
            <tr>
              <td>Mate Imperial Personalizable</td>
              <td>Miguel</td>
              <td>$40.000</td>
              <td>$40.000</td>
              <td>
                <button type="button" className="btn btn-danger">
                  Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <button
          type="button"
          className="btn btn-light"
          onClick={handleConfirmPurchase}
          style={{ marginTop: "20px" }}
        >
          Confirmar Compra
        </button>
        {isConfirmed && (
          <div className="confirmation-message">
            La compra ha sido Confirmada <span className="checkmark">✔️</span>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
