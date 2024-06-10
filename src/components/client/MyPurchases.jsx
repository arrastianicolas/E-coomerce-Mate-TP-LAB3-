import NavBarLanding from "../navs/NavBarLanding";

const MyPurchases = () => {
  return (
    <>
      <NavBarLanding />
      <div className="my-purchases-container">
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
    </>
  );
};

export default MyPurchases;
