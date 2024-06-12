import { createContext, useState, useEffect } from "react";

// Crear el contexto
export const ApiContext = createContext();

// Proveedor del contexto
export const ApiContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [salesHistory, setSalesHistory] = useState([]);
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [productsForSale, setProductsForSale] = useState([]);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  // Funciones para manejar la API
  const fetchUsers = async () => {
    const response = await fetch("http://localhost:8000/users");
    const data = await response.json();
    setUsers(data);
  };

  const fetchProducts = async () => {
    const response = await fetch("http://localhost:8000/products");
    const data = await response.json();
    setProducts(data);
  };
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };
  //   const fetchSalesHistory = async () => {
  //     const response = await fetch("/api/salesHistory");
  //     const data = await response.json();
  //     setSalesHistory(data);
  //   };

  //   const fetchPurchaseHistory = async () => {
  //     const response = await fetch("/api/purchaseHistory");
  //     setPurchaseHistory(data);
  //   };

  // UseEffect para cargar los datos al inicio
  useEffect(() => {
    fetchUsers();
    fetchProducts();
    // fetchSalesHistory();
    // fetchPurchaseHistory();
  }, []);

  return (
    <ApiContext.Provider
      value={{
        users,
        setUsers,
        products,
        setProducts,
        cart,
        setCart,
        addToCart,
        salesHistory,
        setSalesHistory,
        purchaseHistory,
        setPurchaseHistory,
        productsForSale,
        setProductsForSale,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
