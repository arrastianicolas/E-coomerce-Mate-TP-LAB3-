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

  // Simulación de llamada a la API
  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:8000/order");
      const data = await response.json();
      setOrderHistory(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const fetchPurchase = async () => {
    try {
      const response = await fetch("http://localhost:8000/purchase");
      const data = await response.json();
      setPurchaseHistory(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Actualizar el producto en la API
  const updateProduct = async (updatedProduct) => {
    try {
      const response = await fetch(
        `http://localhost:8000/products/${updatedProduct.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProduct),
        }
      );
      if (response.ok) {
        // Si la actualización fue exitosa, actualizar el estado local
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === updatedProduct.id ? updatedProduct : product
          )
        );
      } else {
        console.error("Error al actualizar producto:", response.statusText);
      }
    } catch (error) {
      console.error("Error al actualizar producto:", error);
    }
  };

  // Eliminar el producto en la API
  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/products/${productId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        // Si la eliminación fue exitosa, actualizar el estado local
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productId)
        );
      } else {
        console.error("Error al eliminar producto:", response.statusText);
      }
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  const addUser = async (newUser) => {
    try {
      const response = await fetch("http://localhost:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      if (response.ok) {
        const createdUser = await response.json();
        setUsers((prevUsers) => [...prevUsers, createdUser]);
      } else {
        console.error("Error al agregar usuario:", response.statusText);
      }
    } catch (error) {
      console.error("Error al agregar usuario:", error);
    }
  };

  const updateUser = async (updatedUser) => {
    try {
      const response = await fetch(
        `http://localhost:8000/users/${updatedUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );
      if (response.ok) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === updatedUser.id ? updatedUser : user
          )
        );
      } else {
        console.error("Error al actualizar usuario:", response.statusText);
      }
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8000/users/${userId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        // Si la eliminación fue exitosa, actualizar el estado local
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      } else {
        console.error("Error al eliminar usuario:", response.statusText);
      }
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchProducts();
    fetchOrders();
    fetchPurchase();
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
        deleteProduct,
        updateProduct,
        deleteUser,
        addUser,
        updateUser,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
