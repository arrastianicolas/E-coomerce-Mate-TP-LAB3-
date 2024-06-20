import { useContext, useState, useEffect } from "react";
import { ApiContext } from "../../../services/apiContext/Api.context";
import NavBarLanding from "../../Navs/NavBarLanding";
import { AuthenticationContext } from "../../../services/auth/Auth.context";
import { Form } from "react-bootstrap";

const ProductsForSale = () => {
  const { products, updateProduct, deleteProduct } = useContext(ApiContext);
  const { user } = useContext(AuthenticationContext);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editedProductName, setEditedProductName] = useState("");
  const [editedProductDescription, setEditedProductDescription] = useState("");
  const [editedProductPrice, setEditedProductPrice] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) => product.sellerId === user.id)
    );
  }, [products, user.id]);

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setEditedProductName(product.name);
    setEditedProductDescription(product.description);
    setEditedProductPrice(product.price);
  };

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
    // Actualizar el estado local después de la edición
    setFilteredProducts(
      filteredProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  const handleDeleteProduct = async (productId) => {
    await deleteProduct(productId);
    // Actualizar el estado local después de la eliminación
    setFilteredProducts(
      filteredProducts.filter((product) => product.id !== productId)
    );
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
    </>
  );
};

export default ProductsForSale;
