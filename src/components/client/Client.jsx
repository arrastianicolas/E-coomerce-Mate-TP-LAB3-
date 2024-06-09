import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import NavBarLanding from "../Navs/NavBarLanding";
import Footer from "../footer/Footer";
import mate2 from "../../assets/mate2.png";
import termocac from "../../assets/termocac.jpg";
import { Card } from "react-bootstrap";

const products = [
  {
    id: 1,
    category: "Mates",
    name: "Mate Imperial",
    price: 40000,
    image: mate2,
  },
  {
    id: 2,
    category: "Termos",
    name: "Termo Stanley",
    price: 40000,
    image: termocac,
  },
  {
    id: 3,
    category: "Mochilas",
    name: "Mochila Matera",
    price: 40000,
    image: "img",
  },
  {
    id: 4,
    category: "Bombillas",
    name: "Bombilla",
    price: 40000,
    image: "img",
  },
  {
    id: 5,
    category: "Bombillas",
    name: "Bombilla",
    price: 40000,
    image: "img",
  },
  {
    id: 6,
    category: "Bombillas",
    name: "Bombilla",
    price: 40000,
    image: "img",
  },
  {
    id: 7,
    category: "Bombillas",
    name: "Bombilla",
    price: 40000,
    image: "img",
  },
];

const Client = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  // const navigate = useNavigate();

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilter = (category) => {
    setFilter(category);
  };

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((product) => !filter || product.category === filter);

  return (
    <div>
      <NavBarLanding />
      <div className="container">
        <div className="filter-container">
          <h3>Filtrar:</h3>
          <button onClick={() => handleFilter("Mates")}>Mates</button>
          <button onClick={() => handleFilter("Termos")}>Termos</button>
          <button onClick={() => handleFilter("Mochilas")}>Mochilas</button>
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
          <div className="card-container">
            {filteredProducts.map((product) => (
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
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Client;
