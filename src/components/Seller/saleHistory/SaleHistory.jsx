import NavBarLanding from "../../navs/NavBarLanding";

const SaleHistory = () => {
  return (
    <>
      <NavBarLanding />
      <div className="salesHistory-container">
        <h1>Historial de ventas</h1>
        <table className="salesHistory-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Descripción</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Mate Imperial Personalizable</td>
              <td>Miguel</td>
              <td>$40.000</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SaleHistory;
