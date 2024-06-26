import { useContext, useState, useEffect } from "react";
import { ApiContext } from "../../../services/apiContext/Api.context";
import NavBarLanding from "../../navs/NavBarLanding";
import { AuthenticationContext } from "../../../services/auth/Auth.context";
import { Form, Modal, Button } from "react-bootstrap"; // Asegúrate de importar Modal y Button de react-bootstrap

const ProductsForSale = () => {
  // Definimos los estados
  const { products, updateProduct, deleteProduct } = useContext(ApiContext);
  const { user } = useContext(AuthenticationContext);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editedProductName, setEditedProductName] = useState("");
  const [editedProductDescription, setEditedProductDescription] = useState("");
  const [editedProductPrice, setEditedProductPrice] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Estado para controlar la visibilidad del modal
  const [productToDelete, setProductToDelete] = useState(null);

  const hideModalHandler = () => {
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  const showModalHandler = (id) => {
    setShowDeleteModal(true);
    setProductToDelete(id);
  };

  // Funcion para filtrar los productos
  useEffect(() => {
    setFilteredProducts(
      products.filter((product) => product.sellerId === user.id)
    );
  }, [products, user.id]); // Ejecutamos este efecto cuando cambian los productos o el id del usuario

  // Funcion que maneja la edición de un producto
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setEditedProductName(product.name);
    setEditedProductDescription(product.description);
    setEditedProductPrice(product.price);
  };

  // Funcion para manejar el guardado de la edición
  const handleSaveEdit = async () => {
    const updatedProduct = {
      ...editingProduct,
      name: editedProductName,
      description: editedProductDescription,
      price: parseFloat(editedProductPrice),
    };
    await updateProduct(updatedProduct);
    setEditingProduct(null);
    setEditedProductName("");
    setEditedProductDescription("");
    setEditedProductPrice("");
    setFilteredProducts(
      filteredProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  // Función para manejar la eliminación de un producto
  const handleDeleteProduct = async (productId) => {
    setShowDeleteModal(true); // Mostrar el modal de confirmación antes de eliminar
    setProductToDelete(productId);
  };

  // Función para confirmar la eliminación del producto
  const confirmDeleteHandler = async () => {
    await deleteProduct(productToDelete);
    setFilteredProducts(
      filteredProducts.filter((product) => product.id !== productToDelete)
    );
    setShowDeleteModal(false); // Ocultar el modal después de eliminar
    setProductToDelete(null);
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
            {filteredProducts.map((product) => (
              <tr key={product.id}>
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
                      <button
                        type="button"
                        onClick={() => handleDeleteProduct(product.id)}
                        className="btn btn-danger"
                      >
                        Eliminar
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de confirmación */}
      <Modal show={showDeleteModal} onHide={hideModalHandler}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro que deseas eliminar este producto?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideModalHandler}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmDeleteHandler}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductsForSale;
