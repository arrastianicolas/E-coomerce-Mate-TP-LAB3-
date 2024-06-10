import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import NavBarLanding from "../navs/NavBarLanding";
import Footer from "../footer/Footer";
// import mate2 from "../../assets/mate2.png";
// import termoboca from "../../assets/termo.png";
// import termocac from "../../assets/termocac.jpg";
// import termocentrall from "../../assets/termocentrall.png";
import { Card } from "react-bootstrap";

// const products = [
//   {
//     id: 1,
//     category: "Mates",
//     name: "Mate Imperial",
//     price: 40000,
//     image: mate2,
//   },
//   {
//     id: 2,
//     category: "Termos",
//     name: "Termo Stanley",
//     price: 40000,
//     image: termocac,
//   },
//   {
//     id: 3,
//     category: "Mochilas",
//     name: "Mochila Matera",
//     price: 40000,
//     image: termoboca,
//   },
//   {
//     id: 4,
//     category: "Bombillas",
//     name: "Bombilla",
//     price: 40000,
//     image: termocentrall,
//   },
//   {
//     id: 5,
//     category: "Bombillas",
//     name: "Bombilla",
//     price: 40000,
//     image: "img",
//   },
//   {
//     id: 6,
//     category: "Bombillas",
//     name: "Bombilla",
//     price: 40000,
//     image: "img",
//   },
//   {
//     id: 7,
//     category: "Bombillas",
//     name: "Bombilla",
//     price: 40000,
//     image: "img",
//   },
// ];
// const filteredProducts = products
//   .filter((product) =>
//     product.name.toLowerCase().includes(searchTerm.toLowerCase())
//   )
//   .filter((product) => !filter || product.category === filter);
const Client = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [productsFiltered, setProductsFiltered] = useState([]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilter = (category) => {
    setFilter(category);
  };

  useEffect(() => {
    fetch("http://localhost:8000/products", {
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((products) => {
        const filteredProducts = products
          .filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .filter((product) => !filter || product.category === filter);

        setProductsFiltered(filteredProducts);
      })
      .catch((error) => console.log(error));
  }, [searchTerm, filter]);

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
                    <button>Agregar al carrito</button>
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
