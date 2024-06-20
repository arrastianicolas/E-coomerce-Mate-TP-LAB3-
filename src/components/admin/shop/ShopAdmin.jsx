import { useState, useEffect, useContext } from "react";
import { Card } from "react-bootstrap";
import { ApiContext } from "../../../services/apiContext/Api.context";
import NavBarLanding from "../../navs/NavBarLanding";
import Footer from "../../footer/Footer";

const ShopAdmin = () => {
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

  const { products, updateProduct, deleteProduct } = useContext(ApiContext);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilter = (category) => {
    setFilter(category);
  };

  const openEditForm = (product) => {
    if (!product || !product.id) {
      console.error("Producto no válido para la edición:", product);
      return;
    }

    setEditProduct(product);
    setEditedFields({
      name: product.name,
      price: parseFloat(product.price), // Asegúrate de convertir price a tipo numérico
      description: product.description,
      image: product.image,
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleEditSubmit = () => {
    if (!editProduct || !editProduct.id) {
      console.error("Producto no válido para la edición:", editProduct);
      return;
    }
  
    const updatedProduct = {
      ...editProduct,
      name: editedFields.name,
      price: parseFloat(editedFields.price), // Asegúrate de convertir price a tipo numérico
      description: editedFields.description,
      image: editedFields.image,
    };
  
    updateProduct(updatedProduct);
    setEditProduct(null);
  };

  const handleDeleteProduct = (productId) => {
    deleteProduct(productId);
    // Aquí podrías actualizar el estado de los productos filtrados si lo consideras necesario
  };

  useEffect(() => {
    const filteredProducts = products
      .filter(
        (product) =>
          product.name &&
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((product) => !filter || product.category === filter);

    setProductsFiltered(filteredProducts);
  }, [searchTerm, filter, products]);

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
          {productsFiltered.length > 0 ? (
            <div className="card-container">
              {productsFiltered.map((product) => (
                <Card key={product.id} className="product-card">
                  <div>
                    <img src={product.image} alt={product.name} />
                    <h4>{product.name}</h4>
                    <p>${product.price}</p>
                    <button onClick={() => openEditForm(product)}>Editar</button>
                    <button className="btndelete" onClick={() => handleDeleteProduct(product.id)}>
                      Eliminar
                    </button>
                  </div>
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
                      <button onClick={handleEditSubmit}>Guardar Cambios</button>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          ) : (
            <h3 className="message-not-product">
              ¡No se encontraron Productos!
            </h3>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ShopAdmin;
