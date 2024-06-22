import { useState, useEffect, useContext } from "react";
import NavBarLanding from "../navs/NavBarLanding";
import Footer from "../footer/Footer";
import { Card } from "react-bootstrap";
import { ApiContext } from "../../services/apiContext/Api.context";
import SpinnerShops from "../spinnerShops/SpinnerShops";

const Client = () => {

  // Definimos los estados del componente
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const { products, setCart } = useContext(ApiContext);

  //Definimos funciones

  // Manejar barra de búsqueda
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Función para manejar el filtro por categoría
  const handleFilter = (category) => {
    setFilter(category);
  };

  // Funcion para agregar los productos al carrito
  const addToCart = (product) => {
    setCart((prevCart) => {
      const itemInCart = prevCart.find((item) => item.id === product.id);
      if (itemInCart) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
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

    setProductsFiltered(filteredProducts);
    setLoading(false);
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
                  <Card key={product.id} className="product-card">
                    <div>
                      <img src={product.image} alt={product.name} />
                      <h4>{product.name}</h4>
                      <p>${product.price}</p>
                      <button onClick={() => addToCart(product)}>
                        Agregar al carrito
                      </button>
                    </div>
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
    </div>
  );
};

export default Client;
