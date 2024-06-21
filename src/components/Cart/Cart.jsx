import { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Footer from "../Footer/Footer";
import NavBarLanding from "../Navs/NavBarLanding";
import { ApiContext } from "../../services/apiContext/Api.context";
import { AuthenticationContext } from "../../services/auth/Auth.context";

const Cart = () => {
  const [purchaseConfirmed, setPurchaseConfirmed] = useState(false);
  const { cart, setCart, setPurchaseHistory, setOrderHistory } =
    useContext(ApiContext);
  const { user } = useContext(AuthenticationContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [ProductDelete, setProductDelete] = useState(null);

  const hideModalHandler = () => {
    setShowDeleteModal(false);
    setProductDelete(null);
  };

  const showModalHandler = (id) => {
    setShowDeleteModal(true);
    setProductDelete(id);
  };

  const removeFromCart = () => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== ProductDelete));
    hideModalHandler();
  };

  const addPurchase = async (purchase) => {
    const purchaseWithUserId = { ...purchase, userId: user.id };

    try {
      const response = await fetch("http://localhost:8000/purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(purchaseWithUserId),
      });
      if (response.ok) {
        const newPurchase = await response.json();
        setPurchaseHistory((prev) => [...prev, newPurchase]);
      } else {
        console.error("Error al agregar compra:", response.statusText);
      }
    } catch (error) {
      console.error("Error al agregar compra:", error);
    }
  };

  const handleConfirmPurchase = async () => {
    const order = {
      items: cart,
      date: new Date().toISOString(),
      buyerId: user.id,
    };

    try {
      const response = await fetch("http://localhost:8000/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      if (response.ok) {
        const newOrder = await response.json();
        setOrderHistory((prevHistory) => [...prevHistory, newOrder]);

        // Agregar cada compra al historial de compras
        for (const item of cart) {
          const purchase = {
            name: item.name,
            description: item.description,
            quantity: item.quantity,
            price: item.price,
          };
          await addPurchase(purchase);
        }
      } else {
        console.error("Error placing order:", response.statusText);
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
    }

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
        <Modal.Body>¿Está seguro que desea eliminar este producto?</Modal.Body>
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
