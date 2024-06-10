// import { useState, createContext } from "react";

// export const ApiContext = createContext();

// const userValue = JSON.parse(localStorage.getItem("user"));

// export const ApiContextProvider = ({ children }) => {
//   const [user, setUser] = useState(userValue);

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     setUser(null);
//   };

//   const handleLogin = (email) => {
//     localStorage.setItem("user", JSON.stringify({ email }));
//     setUser({ email });
//   };

//   return (
//     <ApiContext.Provider value={{ user, handleLogin, handleLogout }}>
//       {children}
//     </ApiContext.Provider>
//   );
// };
