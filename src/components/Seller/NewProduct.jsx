import { Button, Card, Col, Form, Row, FormGroup } from "react-bootstrap";
import { useState } from "react";

const NewProduct = () => {
  const [selection, setSelection] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const handleSelectionChange = (event) => {
    setSelection(event.target.value);
  };

  return (
    <>
      <div className="register-container">
        <Card className="content-register">
          <Card.Body>
            <Row>
              <h5>Publicar un nuevo producto</h5>
            </Row>
            <hr />
            <Form onSubmit={submitHandler}>
              <FormGroup className="mb-4">
                <Form.Label>Nombre:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresar el nombre del producto"
                />
              </FormGroup>

              <FormGroup className="mb-4">
                <Form.Label>Precio:</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Ingresar el precio del producto"
                />
              </FormGroup>

              <FormGroup className="mb-4">
                <Form.Label>Descripción:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Ingrese una breve descripción del producto"
                />
              </FormGroup>
              <FormGroup className="mb-4">
                <Form.Label>Quieres Vender...</Form.Label>
                <Form.Select value={selection} onChange={handleSelectionChange}>
                  <option value="" disabled>
                    Selecciona una opción...
                  </option>
                  <option value="mate">Mate</option>
                  <option value="termo">Termo</option>
                  <option value="bombilla">Bombilla</option>
                  <option value="matera">Matera</option>
                </Form.Select>
              </FormGroup>
              <FormGroup className="mb-4">
                <Form.Label>URL de la imagen:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese la imagen del producto por URL"
                />
              </FormGroup>
              <hr />
              <Row>
                <Col />
                <div>
                  <Col style={{ display: "flex", justifyContent: "center" }}>
                    <Button className="btnLogIn" type="submit">
                      Publicar
                    </Button>
                  </Col>
                </div>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default NewProduct;
