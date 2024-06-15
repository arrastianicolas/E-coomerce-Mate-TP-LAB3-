import { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";

import Footer from "../footer/Footer";
import NavBarLanding from "../navs/NavBarLanding";
import { ApiContext } from "../../services/apiContext/Api.context";

const Cart = () => {
  const [purchaseConfirmed, setPurchaseConfirmed] = useState(false);
  const { cart, setCart, setPurchaseHistory } = useContext(ApiContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bookIdToDelete, setBookIdToDelete] = useState(null);

  const hideModalHandler = () => {
    setShowDeleteModal(false);
    setBookIdToDelete(null);
  };

  const showModalHandler = (id) => {
    setShowDeleteModal(true);
    setBookIdToDelete(id);
  };

  const removeFromCart = () => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== bookIdToDelete));
    hideModalHandler();
  };

  const handleConfirmPurchase = () => {
    setPurchaseHistory((prevHistory) => [...prevHistory, ...cart]);
    setCart([]);
    setPurchaseConfirmed(true);
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
              <th>SubTotal</th>
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
                    onClick={() => showModalHandler(item.id)}
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
          disabled={cart.length < 1}
        >
          Confirmar Compra
        </Button>
        {purchaseConfirmed && (
          <div className="confirmation-message">
            <span className="checkmark">La compra ha sido Confirmada ✔️</span>
          </div>
        )}
      </div>
      <Footer />

      <Modal show={showDeleteModal} onHide={hideModalHandler}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Está seguro que desea eliminar este producto?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideModalHandler}>
            Cerrar
          </Button>
          <Button variant="danger" onClick={removeFromCart}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Cart;
