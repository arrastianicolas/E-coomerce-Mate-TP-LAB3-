import { useContext, useState } from "react";
import { ApiContext } from "../../../services/apiContext/Api.context";
import NavBarLanding from "../../navs/NavBarLanding";
import { AuthenticationContext } from "../../../services/auth/Auth.context";
import { Form, Button, Modal } from "react-bootstrap";

const ProductsForSale = () => {
  const { products, updateProduct, deleteProduct } = useContext(ApiContext);
  const { user } = useContext(AuthenticationContext);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editedProductName, setEditedProductName] = useState("");
  const [editedProductDescription, setEditedProductDescription] = useState("");
  const [editedProductPrice, setEditedProductPrice] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);

  const hideModalHandler = () => {
    setShowDeleteModal(false);
    setProductIdToDelete(null);
  };

  const showModalHandler = (id) => {
    setShowDeleteModal(true);
    setProductIdToDelete(id);
  };

  // Filtrar productos según el vendedor actual
  const filteredProducts = products.filter(
    (product) => product.sellerId === user.id
  );

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setEditedProductName(product.name);
    setEditedProductDescription(product.description);
    setEditedProductPrice(product.price);
  };

  const handleSaveEdit = () => {
    const updatedProduct = {
      ...editingProduct,
      name: editedProductName,
      description: editedProductDescription,
      price: parseFloat(editedProductPrice),
    };
    updateProduct(updatedProduct);
    setEditingProduct(null);
    setEditedProductName("");
    setEditedProductDescription("");
    setEditedProductPrice("");
  };

  const handleDeleteProduct = () => {
    deleteProduct(productIdToDelete);
    hideModalHandler();
  };

  return (
    <>
      <NavBarLanding />
      <div className="productForSale-container">
        <h1>Productos en venta</h1>
        <table className="productForSale-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th className="actions-column">Opciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product, index) => (
              <tr key={index}>
                <td>
                  {editingProduct === product ? (
                    <Form.Control
                      type="text"
                      value={editedProductName}
                      onChange={(e) => setEditedProductName(e.target.value)}
                    />
                  ) : (
                    product.name
                  )}
                </td>
                <td>
                  {editingProduct === product ? (
                    <Form.Control
                      type="text"
                      value={editedProductDescription}
                      onChange={(e) =>
                        setEditedProductDescription(e.target.value)
                      }
                    />
                  ) : (
                    product.description
                  )}
                </td>
                <td>
                  {editingProduct === product ? (
                    <Form.Control
                      type="number"
                      value={editedProductPrice}
                      onChange={(e) => setEditedProductPrice(e.target.value)}
                    />
                  ) : (
                    `$${Number(product.price).toFixed(2)}`
                  )}
                </td>
                <td>
                  {editingProduct === product ? (
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleSaveEdit}
                    >
                      Guardar
                    </button>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => handleEditProduct(product)}
                        className="btn btn-primary"
                      >
                        Editar
                      </button>
                      <br />
                      <Button
                        variant="danger"
                        onClick={() => showModalHandler(product.id)}
                      >
                        Eliminar
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Modal show={showDeleteModal} onHide={hideModalHandler}>
          <Modal.Header closeButton>
            <Modal.Title>Eliminar producto</Modal.Title>
          </Modal.Header>
          <Modal.Body>¿Está seguro que desea eliminar este producto?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={hideModalHandler}>
              Cerrar
            </Button>
            <Button variant="danger" onClick={handleDeleteProduct}>
              Eliminar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default ProductsForSale;
