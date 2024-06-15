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
  const [orderHistory, setOrderHistory] = useState([]);
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [productsForSale, setProductsForSale] = useState([]);
  const [currentUser, setCurrentUser] = useState(null); // Assuming you have a way to set the current user

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Funciones para manejar la API
  const fetchUsers = async () => {
    const response = await fetch("http://localhost:8000/users");
    const data = await response.json();
    setUsers(data);
    setCurrentUser(data);
  };

  const fetchProducts = async () => {
    const response = await fetch("http://localhost:8000/products");
    const data = await response.json();
    setProducts(data);
  };

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  // const placeOrder = async (order) => {
  //   const response = await fetch("http://localhost:8000/order", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(order),
  //   });

  //   if (response.ok) {
  //     const newOrder = await response.json();
  //     setOrderHistory((prevHistory) => [...prevHistory, newOrder]);
  //   } else {
  //     console.error("Error placing order:", response.statusText);
  //   }
  // };

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
        // placeOrder,
        orderHistory,
        setOrderHistory,
        purchaseHistory,
        setPurchaseHistory,
        productsForSale,
        setProductsForSale,
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
