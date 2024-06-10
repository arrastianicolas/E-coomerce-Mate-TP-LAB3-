import NavBarLanding from "../../navs/NavBarLanding";

const ProductForSale = () => {
  return (
    <>
      <NavBarLanding />
      <div className="productForSale-container">
        <h1>Productos en venta</h1>
        <table className="productForSale-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th className="actions-column">Opciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Mate Imperial Personalizable</td>
              <td>Miguel</td>
              <td>$40.000</td>
              <td>
                <button type="button" className="btn btn-primary">
                  Editar
                </button>
                <br />
                <button type="button" className="btn btn-danger">
                  Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductForSale;
