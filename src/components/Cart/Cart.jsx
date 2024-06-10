import { useState } from "react";
import { Button, Table, Container, Row, Col } from "react-bootstrap";
import "./Cart.css";
import Footer from "../footer/Footer";
import NavBarLanding from "../Navs/NavBarLanding";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "MATE IMPERIAL PERSONALIZABLE",
      description: "MIGUEL",
      quantity: 1,
      price: 40.0,
    },
  ]);
  const [purchaseConfirmed, setPurchaseConfirmed] = useState(false);

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleConfirmPurchase = () => {
    setPurchaseConfirmed(true);
  };

  return (
    <div className="cart-page">
      <NavBarLanding />
      <Container className="cart-container">
        <Row>
          <Col>
            <h1 className="cart-title">CARRITO</h1>
            <Table bordered hover className="cart-table">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Descripción</th>
                  <th>Precio</th>
                  <th>Total</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Button
              variant="success"
              onClick={handleConfirmPurchase}
              className="confirm-button"
            >
              Confirmar Compra
            </Button>
            {purchaseConfirmed && (
              <div className="confirmation-message">
                La compra ha sido Confirmada{" "}
                <span className="checkmark">✔️</span>
              </div>
            )}
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default Cart;
