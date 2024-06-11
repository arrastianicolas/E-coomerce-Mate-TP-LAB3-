import { useState, useContext } from "react";
import { Button, Card, Col, Form, Row, FormGroup } from "react-bootstrap";
import { ApiContext } from "../../services/apiContext/Api.context"; // Asegúrate de importar el contexto de la API

const NewProduct = () => {
  const { setProducts } = useContext(ApiContext); // Obtén la función para actualizar los productos desde el contexto
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState(null); // Define el estado de error

  const changeNameHandler = (event) => {
    setName(event.target.value);
  };
  const changePriceHandler = (event) => {
    setPrice(event.target.value);
  };
  const changeDescriptionHandler = (event) => {
    setDescription(event.target.value);
  };
  const changeCategoryHandler = (event) => {
    setCategory(event.target.value);
  };
  const changeImageHandler = (event) => {
    setImage(event.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const newProduct = {
      category: category,
      name: name,
      description: description,
      price: price,
      image: image,
    };

    try {
      const response = await fetch("http://localhost:8000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error("Error al añadir el producto");
      }

      // Actualizar el contexto de productos con el nuevo producto creado
      setProducts((prevProducts) => [...prevProducts, newProduct]);

      // Limpiar los campos después de la creación exitosa del producto
      setName("");
      setPrice("");
      setDescription("");
      setCategory("");
      setImage("");
      setError(null); // Limpiar el estado de error
    } catch (error) {
      setError(error.message);
    }
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
            {error && <p>{error}</p>}{" "}
            {/* Muestra el mensaje de error si está definido */}
            <Form onSubmit={submitHandler}>
              <FormGroup className="mb-4">
                <Form.Label>Nombre:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresar el nombre del producto"
                  value={name}
                  onChange={changeNameHandler}
                />
              </FormGroup>

              <FormGroup className="mb-4">
                <Form.Label>Precio:</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Ingresar el precio del producto"
                  value={price}
                  onChange={changePriceHandler}
                />
              </FormGroup>

              <FormGroup className="mb-4">
                <Form.Label>Descripción:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Ingrese una breve descripción del producto"
                  value={description}
                  onChange={changeDescriptionHandler}
                />
              </FormGroup>
              <FormGroup className="mb-4">
                <Form.Label>Quieres Vender...</Form.Label>
                <Form.Select value={category} onChange={changeCategoryHandler}>
                  <option value="" disabled>
                    Selecciona una opción...
                  </option>
                  <option value="Mates">Mate</option>
                  <option value="Termos">Termo</option>
                  <option value="Bombillas">Bombilla</option>
                  <option value="Materas">Matera</option>
                </Form.Select>
              </FormGroup>
              <FormGroup className="mb-4">
                <Form.Label>URL de la imagen:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese la imagen del producto por URL"
                  value={image}
                  onChange={changeImageHandler}
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
