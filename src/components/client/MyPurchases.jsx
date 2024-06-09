import React from "react";
import { useNavigate } from "react-router-dom";

const MyPurchases = () => {
  const navigate = useNavigate();
  return (
    <div className="my-purchases-container">
      <button className="btn btn-light buttons-navs" onClick={() => navigate("/client")}>
        Tienda
      </button>

      <h1>Mis Compras</h1>
      <table className="purchases-table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mate Imperial Personalizable</td>
            <td>Miguel</td>
            <td>$40.000</td>
            <td>$40.000</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MyPurchases;
