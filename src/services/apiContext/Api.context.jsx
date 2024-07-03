import { createContext, useState, useEffect } from "react";

// Crear el contexto
export const ApiContext = createContext();

// Proveedor del contexto
export const ApiContextProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("users");
    return savedUsers ? JSON.parse(savedUsers) : [];
  });
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [orderHistory, setOrderHistory] = useState([]);
  const [purchaseHistory, setPurchaseHistory] = useState([]);

  // Guardar usuarios en localStorage cada vez que se actualicen
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // Guardar carrito en localStorage cada vez que se actualice
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Funciones para manejar la API
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8000/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:8000/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
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

  const fetchPurchase = async () => {
    try {
      const response = await fetch("http://localhost:8000/purchase");
      const data = await response.json();
      setPurchaseHistory(data);
    } catch (error) {
      console.error("Error fetching purchase:", error);
    }
  };

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

  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/products/${productId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
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
      const response = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      if (response.ok) {
        const createdUser = await response.json();
        setUsers((prevUsers) => {
          const updatedUsers = [...prevUsers, createdUser];
          localStorage.setItem("users", JSON.stringify(updatedUsers)); // Guardar en localStorage inmediatamente
          return updatedUsers;
        });
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
        setUsers((prevUsers) => {
          const updatedUsers = prevUsers.map((user) =>
            user.id === updatedUser.id ? updatedUser : user
          );
          localStorage.setItem("users", JSON.stringify(updatedUsers)); // Guardar en localStorage inmediatamente
          return updatedUsers;
        });
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
        setUsers((prevUsers) => {
          const updatedUsers = prevUsers.filter((user) => user.id !== userId);
          localStorage.setItem("users", JSON.stringify(updatedUsers)); // Guardar en localStorage inmediatamente
          return updatedUsers;
        });
      } else {
        console.error("Error al eliminar usuario:", response.statusText);
      }
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  useEffect(() => {
    if (users.length === 0) {
      fetchUsers();
    }
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
