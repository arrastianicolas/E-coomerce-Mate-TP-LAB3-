import { useState, useEffect, useContext } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import { ApiContext } from "../../../services/apiContext/Api.context";
import NavBarLanding from "../../navs/NavBarLanding";
import Footer from "../../footer/Footer";
import SpinnerShops from "../../spinner/SpinnerShops";

const ShopAdmin = () => {

  // Definimos los estados del componente
  const [searchTerm, setSearchTerm] = useState(""); 
  const [filter, setFilter] = useState(""); 
  const [productsFiltered, setProductsFiltered] = useState([]); 
  const [editProduct, setEditProduct] = useState(null); 
  const [editedFields, setEditedFields] = useState({ 
    name: "",
    price: 0,
    description: "",
    image: "",
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false); 
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const { products, updateProduct, deleteProduct } = useContext(ApiContext); 
  const [loading, setLoading] = useState(true); 
  
  //Definimos funciones

  // Manejar barra de búsqueda
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Función para manejar el filtro por categoría
  const handleFilter = (category) => {
    setFilter(category);
  };

  // Función para abrir el formulario de edición de un producto
  const openEditForm = (product) => {
    if (!product || !product.id) {
      console.error("Producto no válido para la edición:", product);
      return;
    }

    setEditProduct(product);
    setEditedFields({
      name: product.name,
      price: parseFloat(product.price),
      description: product.description,
      image: product.image,
    });
  };

  // Función para manejar el cambio en los campos editados
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  // Función para enviar la edición de un producto
  const handleEditSubmit = () => {
    if (!editProduct || !editProduct.id) {
      console.error("Producto no válido para la edición:", editProduct);
      return;
    }

    const updatedProduct = {
      ...editProduct,
      name: editedFields.name,
      price: parseFloat(editedFields.price),
      description: editedFields.description,
      image: editedFields.image,
    };

    updateProduct(updatedProduct);
    setEditProduct(null);
  };

  // Manejar la solicitud de eliminación de un producto
  const handleDeleteProduct = (productId) => {
    setProductIdToDelete(productId);
    setShowDeleteModal(true);
  };

  // Confirmar la eliminación de un producto
  const handleConfirmDelete = () => {
    deleteProduct(productIdToDelete);
    setProductIdToDelete(null);
    setShowDeleteModal(false);
  };

  // Filtrar productos basado en término de búsqueda y filtro de categoría
  useEffect(() => {
    const filteredProducts = products
      .filter(
        (product) =>
          product.name &&
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((product) => !filter || product.category === filter);

    setLoading(false);
    setProductsFiltered(filteredProducts);
  }, [searchTerm, filter, products]);

  // Funcion para manejar el spinner
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [products]);

  return (
    <div>
      <NavBarLanding />
      <div className="container">
        <div className="filter-container">
          <h3>Filtrar:</h3>
          <button onClick={() => handleFilter("Mates")}>Mates</button>
          <button onClick={() => handleFilter("Termos")}>Termos</button>
          <button onClick={() => handleFilter("Mochilas")}>Materas</button>
          <button onClick={() => handleFilter("Bombillas")}>Bombillas</button>
          <button onClick={() => handleFilter("")}>Todos</button>
        </div>

        <div className="product-container">
          <div className="search-bar">
            <i className="bi bi-search"></i>
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          {/* Renderizado del spinner */}
          {loading ? (
            <SpinnerShops />
          ) : (
            /* Mostramos productos filtrados o mensaje de no encontrado */
            productsFiltered.length > 0 ? (
              <div className="card-container">
                {productsFiltered.map((product) => (
                  <Card
                    key={product.id}
                    className={`product-cardadmin ${
                      editProduct && editProduct.id === product.id
                        ? "editing"
                        : ""
                    }`}
                  >
                    <div>
                      <img src={product.image} alt={product.name} />
                      <h4>{product.name}</h4>
                      <p>${product.price}</p>
                      <button
                        onClick={() => openEditForm(product)}
                        className="btn btn-primary"
                      >
                        Editar
                      </button>
                      <br />
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        Eliminar
                      </button>
                    </div>

                    {/* Formulario de edición */}
                    {editProduct && editProduct.id === product.id && (
                      <div className="edit-form">
                        <input
                          type="text"
                          name="name"
                          placeholder="Nombre"
                          value={editedFields.name}
                          onChange={handleInputChange}
                        />
                        <input
                          type="number"
                          name="price"
                          placeholder="Precio"
                          value={editedFields.price}
                          onChange={handleInputChange}
                        />
                        <textarea
                          name="description"
                          placeholder="Descripción"
                          value={editedFields.description}
                          onChange={handleInputChange}
                        ></textarea>
                        <input
                          type="text"
                          name="image"
                          placeholder="URL de imagen"
                          value={editedFields.image}
                          onChange={handleInputChange}
                        />
                        <button
                          onClick={handleEditSubmit}
                          className="save-changes-button"
                        >
                          Guardar Cambios
                        </button>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            ) : (
              <h3 className="message-not-product">
                ¡No se encontraron Productos!
              </h3>
            )
          )}
        </div>
      </div>

      <Footer />
      
      {/* Modal de confirmación de eliminación de producto */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro que deseas eliminar este producto?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ShopAdmin;
