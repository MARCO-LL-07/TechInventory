import { useProductos } from "../hooks/useProductos";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";

export default function Home() {
  const { productos, loading, removeProducto } = useProductos();
  const navigate = useNavigate();

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">Inventario Tecnológico</h1>

        <button
          className="primaryBtn"
          onClick={() => navigate("/create")}
        >
          + Nuevo Producto
        </button>
      </div>

      {productos.length === 0 ? (
        <p>No hay productos</p>
      ) : (
        <div className="grid">
          {productos.map((p) => (
            <div key={p.id} className="card">
              <h3>{p.nombre}</h3>
              <p className="category">{p.categoria}</p>
              <p className="price">S/ {p.precio}</p>
              <p className="stock">Stock: {p.stock}</p>

              <div className="actions">
                <button
                  className="editBtn"
                  onClick={() => navigate(`/edit/${p.id}`)}
                >
                  Editar
                </button>

                <button
                  className="deleteBtn"
                  onClick={() => removeProducto(p.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
