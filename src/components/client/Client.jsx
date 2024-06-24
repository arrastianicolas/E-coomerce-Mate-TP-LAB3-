import { useState, useEffect, useContext, useMemo, useCallback } from "react";
import NavBarLanding from "../navs/NavBarLanding";
import Footer from "../footer/Footer";
import { Card } from "react-bootstrap";
import { ApiContext } from "../../services/apiContext/Api.context";
import SpinnerShops from "../spinner/SpinnerShops";

const Client = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const { products, setCart } = useContext(ApiContext);

  const handleSearch = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const handleFilter = useCallback((category) => {
    setFilter(category);
  }, []);

  const addToCart = useCallback(
    (product) => {
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
    },
    [setCart]
  );

  const productsFiltered = useMemo(() => {
    return products
      .filter(
        (product) =>
          product.name &&
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((product) => !filter || product.category === filter);
  }, [searchTerm, filter, products]);

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

          {loading ? (
            <SpinnerShops />
          ) : productsFiltered.length > 0 ? (
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
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Client;
