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

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

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

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:8000/order");
      const data = await response.json();
      setOrderHistory(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const updateProduct = (updatedProduct) => {
    fetch(`http://localhost:8000/products/${updatedProduct.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    })
      .then((response) => {
        if (response.ok) {
          setProducts((prevProducts) =>
            prevProducts.map((product) =>
              product.id === updatedProduct.id ? updatedProduct : product
            )
          );
        } else {
          console.error("Error al actualizar producto:", response.statusText);
        }
      })
      .catch((error) => console.error("Error al actualizar producto:", error));
  };

  const deleteProduct = (productId) => {
    fetch(`http://localhost:8000/products/${productId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== productId)
          );
        } else {
          console.error("Error al eliminar producto:", response.statusText);
        }
      })
      .catch((error) => console.error("Error al eliminar producto:", error));
  };

  const deleteUser = async (userId, token) => {
    const response = await fetch(`http://localhost:8000/users/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } else {
      throw new Error("Error al eliminar usuario");
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchProducts();
    fetchOrders();
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
        orderHistory,
        setOrderHistory,
        purchaseHistory,
        setPurchaseHistory,
        productsForSale,
        setProductsForSale,
        deleteProduct,
        updateProduct,
        deleteUser,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
